const puppeter = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeter.use(StealthPlugin());

const parser = async () => {
  const browser = await puppeter.launch({
    headless: false,
  });

  // =; _ym_d=1670760161; =GA1.2.1966433650.1670760162; _gid=; _ym_visorc=w; _

  const cookies = [
    "yandex_login=zyf1232; L=BThGQUNRSXZPfGhOUA5GWVVQVm11aHV0Pi8eZgMCVA==.1670703521.15187.319169.6e70928be59e9e68ae95355e92732af4; gdpr=0; _ym_uid=1678022506811626580; mda_exp_enabled=1; _yasc=ws5/cn87TXwQiE0E98Z6pyIAI5mtpW/LqN5GcPfCUx4hEmRMg4rq12IGJO8m; yandexuid=6368727731681304332; yuidss=6368727731681304332; location=1; crookie=s4Mawg4NxWRS/yECxV6JkTTywNwaAwdcMsJ6MugeQkMOCVu8o5v7jY7ZVNR0xXmBxpe0crlG9PTFWq3AhjTKd28oPTg=; cmtchd=MTY4MTkxNDk3OTg0Ng==; coockoos=4; ys=udn.cDp6eWYxMjMy#c_chck.4262959451; mda2_beacon=1681996552692; sso_status=sso.passport.yandex.ru:synchronized; _ym_isad=1; kdetect=1; yandex_gid=44; uid=111080422; yp=1682083254.yu.6368727731681304332; ymex=1684588854.oyu.6368727731681304332; _ym_d=1682001053",
  ];

  const page = await browser.newPage();

  // Films
  // avatar, name, year, duration, country, genre, director, actors

  const bd = [];
  const k = async (page, bd, i) => {
    await page.goto(`https://www.kinopoisk.ru/film/500${i}`);
    const parentElNames = await page.evaluate(() => {
      let columns = [];

      const ratings = [];
      let rating = document.querySelector(
        "span[data-tid='939058a8']" //939058a8 939058a8
      ).innerText;

      return rating;
    });

    console.log(parentElNames);
  };

  await page.goto("https://www.kinopoisk.ru/film/5001/");

  let wonderfulFunction = async function (i) {
    i = i || 0;
    if (i < 9) {
      await k(page, bd, i).then((response) => response);
      i++;
      setTimeout(function () {
        wonderfulFunction(i);
      }, 3000);
    }
  };
  wonderfulFunction();
};

// browser.close();

parser();
