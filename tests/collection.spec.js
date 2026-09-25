import { test, expect } from '@playwright/test';

test('all supplied items replace the sample data and filters combine', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.item')).toHaveCount(60);
  await expect(page.locator('#inventory-summary')).toHaveText('60 entries · 72 books');
  await expect(page.getByRole('button', {name:'Owned 59', exact:true})).toBeVisible();
  await page.getByRole('button', {name:'Manga 18', exact:true}).click();
  await expect(page.locator('.item')).toHaveCount(18);
  await page.getByRole('searchbox').fill('Nos différences enlacées');
  await expect(page.locator('.item-title')).toHaveText('Assorted Entanglements');
  await page.getByRole('searchbox').fill('not a title');
  await expect(page.getByText('No titles match your search.')).toBeVisible();
  await page.getByRole('button', {name:'Clear filters'}).click();
  await expect(page.locator('.item')).toHaveCount(60);
  await page.getByRole('button', {name:'Wishlist 1', exact:true}).click();
  await expect(page.locator('.item')).toHaveCount(1);
  await expect(page.locator('.item-title')).toHaveText('Fate/stay night Heaven’s Feel: Special Gift Plush Saber');
  await page.getByRole('button',{name:'Owned 59',exact:true}).click();
  await expect(page.locator('.item')).toHaveCount(59);
});

test('edition flags and owned ranges stay separate from English titles', async ({ page }) => {
  await page.goto('/');
  const yotsuba=page.getByRole('button',{name:'View Yotsuba&!'});
  await expect(yotsuba.getByRole('img',{name:'Japanese edition'})).toBeVisible();
  await yotsuba.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByText('Vol. 1–3',{exact:true})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(yotsuba).toBeFocused();
  await page.keyboard.press('/');
  await expect(page.getByRole('searchbox')).toBeFocused();
  await page.getByRole('searchbox').fill('The Moon on a Rainy Night');
  await expect(page.locator('.item').getByRole('img',{name:'French edition'})).toBeVisible();
});

test('dark default, stored preference, list view and title sorting work', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.getByRole('button',{name:'Switch to light theme'}).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await page.getByRole('button',{name:'List view',exact:true}).click();
  await expect(page.locator('#items')).toHaveClass('items list');
  await page.getByRole('combobox',{name:'Sort collection'}).selectOption('title');
  await expect(page.locator('.item-title').first()).toHaveText('An Easy Introduction to Love Triangles (To Pass the Exam!)');
});

test('the complete inventory loads without browser errors or horizontal overflow', async ({ page }) => {
  await page.setViewportSize({width:375,height:812});
  const errors=[];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('.item')).toHaveCount(60);
  await page.evaluate(()=>document.querySelectorAll('img').forEach(img=>img.loading='eager'));
  await expect.poll(()=>page.evaluate(()=>[...document.querySelectorAll('img[src]')].every(img=>img.complete && img.naturalWidth>0))).toBe(true);
  for (const width of [320,375,768,1440]) {
    await page.setViewportSize({width,height:900});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('novels, mixed box set, figures and sealed items retain their details', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button',{name:'Light novels 3',exact:true}).click();
  await expect(page.locator('.item')).toHaveCount(3);
  const sayaka=page.getByRole('button',{name:'View Bloom Into You: Regarding Saeki Sayaka'});
  await expect(sayaka.getByRole('img',{name:'English edition'})).toBeVisible();
  await page.getByRole('button',{name:'View The Garden of Words'}).click();
  await expect(page.getByRole('dialog').getByText('1 manga + 1 novel',{exact:true})).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Figurines 4',exact:true}).click();
  await page.getByRole('button',{name:'View Artoria Pendragon: Last Episode'}).click();
  await expect(page.getByRole('dialog').getByText('1/8',{exact:true})).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Misc 3',exact:true}).click();
  await page.getByRole('button',{name:'View Fate/stay night + Fate/hollow ataraxia'}).click();
  await expect(page.getByText('Sealed',{exact:true})).toBeVisible();
  await expect(page.locator('footer')).toHaveCount(0);
});


test('VTuber merch lists individual set pieces, correct variants and identified owner cards', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', {name:'VTuber merch 33', exact:true}).click();
  await expect(page.locator('.item')).toHaveCount(33);
  await page.getByRole('button', {name:'View Nakiri Ayame: Birthday 2024 Autographed Card', exact:true}).click();
  await expect(page.getByRole('dialog').getByText('Handwritten autograph', {exact:true})).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button', {name:'View Nakiri Ayame: hololive Connect Pixel Art', exact:true}).click();
  await expect(page.getByRole('dialog').getByText('L', {exact:true})).toBeVisible();
  await expect(page.getByRole('dialog').getByRole('link')).toHaveAttribute('href', /variant=47682306375926/);
  await page.keyboard.press('Escape');
  await page.getByRole('searchbox').fill('2nd Anniversary Letter');
  await expect(page.locator('.item')).toHaveCount(1);
  await page.locator('.item').first().click();
  await expect(page.getByRole('dialog').getByText('Printed reproduction of a handwritten message', {exact:true})).toBeVisible();
});

test('artwork enlargement closes back to details and returns keyboard focus', async ({ page }) => {
  await page.goto('/');
  const item=page.getByRole('button',{name:'View Nakiri Ayame: Birthday 2024 Autographed Card',exact:true});
  await item.click();
  const details=page.getByRole('dialog',{name:'Nakiri Ayame: Birthday 2024 Autographed Card',exact:true});
  await expect(details.getByText('Owned',{exact:true})).toHaveCount(0);
  const enlarge=details.getByRole('button',{name:'Enlarge image'});
  await enlarge.click();
  const viewer=page.getByRole('dialog',{name:'Enlarged artwork'});
  await expect(viewer).toBeVisible();
  await expect(viewer.getByRole('img')).toHaveAttribute('alt','Nakiri Ayame: Birthday 2024 Autographed Card');
  await page.keyboard.press('Escape');
  await expect(viewer).not.toBeVisible();
  await expect(details).toBeVisible();
  await expect(enlarge).toBeFocused();
  await expect.poll(()=>page.evaluate(()=>document.body.style.overflow)).toBe('hidden');
  await page.keyboard.press('Escape');
  await expect(item).toBeFocused();
  await expect.poll(()=>page.evaluate(()=>document.body.style.overflow)).toBe('');
});

test('detail layouts fit phones with owner photographs', async ({ page }) => {
  await page.setViewportSize({width:320,height:640});
  await page.goto('/');
  await page.getByRole('button',{name:'View Nakiri Ayame: 3rd Anniversary Postcard',exact:true}).click();
  const details=page.locator('#detail');
  await expect(details.getByRole('button',{name:'Enlarge image'})).toBeVisible();
  await expect(details.locator('img')).toHaveAttribute('src', /ayame-anniversary-3-card-owned/);
  expect(await details.evaluate(e=>e.scrollWidth<=e.clientWidth)).toBe(true);
  await details.evaluate(e=>e.scrollTop=e.scrollHeight);
  await expect(details.getByRole('button',{name:'Close details'})).toBeInViewport();
  await details.getByRole('button',{name:'Close details'}).click();
  await page.getByRole('button',{name:'View An Easy Introduction to Love Triangles (To Pass the Exam!)',exact:true}).click();
  expect(await details.evaluate(e=>e.scrollWidth<=e.clientWidth)).toBe(true);
});


test('phone categories are all visible and can be selected without horizontal scrolling', async ({ page }) => {
  await page.setViewportSize({width:320,height:740});
  await page.goto('/');
  const filters=page.getByRole('group',{name:'Collection category'});
  for (const button of await filters.getByRole('button').all()) await expect(button).toBeInViewport({ratio:1});
  expect(await filters.evaluate(e=>e.scrollWidth<=e.clientWidth)).toBe(true);
  await filters.getByRole('button',{name:'VTuber merch 33',exact:true}).click();
  await expect(page.locator('.item')).toHaveCount(33);
  await filters.getByRole('button',{name:'Misc 3',exact:true}).click();
  await expect(page.locator('.item')).toHaveCount(3);
});


test('compact phone controls filter ownership and preserve state on desktop', async ({ page }) => {
  await page.setViewportSize({width:375,height:812});
  await page.goto('/');
  const status=page.getByRole('combobox',{name:'Ownership status'});
  await status.selectOption('wishlist');
  await expect(page.locator('.item')).toHaveCount(1);
  await expect(page.locator('.item-title')).toHaveText('Fate/stay night Heaven’s Feel: Special Gift Plush Saber');
  await page.getByRole('combobox',{name:'Sort collection'}).selectOption('title');
  expect(await page.locator('.item').first().evaluate(e=>e.getBoundingClientRect().top)).toBeLessThan(270);
  await page.setViewportSize({width:1440,height:1000});
  await expect(page.getByRole('button',{name:'Wishlist 1',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Owned 59',exact:true}).click();
  await page.setViewportSize({width:320,height:740});
  await expect(status).toHaveValue('owned');
  await expect(page.locator('.item')).toHaveCount(59);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
