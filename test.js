const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto("https://www.kinopoisk.ru/film/1000/");

  const parentElNames = await page.evaluate(() => {
    let result = [];
    let columns = [];
    //
    let title = Array.from(
      document.querySelectorAll('span[data-tid="75209b22"]'),
      (el) => el.innerText
    );
    title.forEach((item) =>
      columns.push({
        name: title[item],
      })
    );

    return title;
  });
  console.log(parentElNames);
})();
