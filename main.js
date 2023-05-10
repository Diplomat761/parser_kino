const puppeter = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeter.use(StealthPlugin());

const parser = async () => {
  const browser = await puppeter.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    slowMo: 0,
    args: [
      "--window-size=1400,900",
      "--remote-debugging-port=9222",
      "--remote-debugging-address=0.0.0.0",
      "--disable-gpu",
      "--disable-features=IsolateOrigins,site-per-process",
      "--blink-settings=imagesEnabled=true",
    ],
  });

  // =; _ym_d=1670760161; =GA1.2.1966433650.1670760162; _gid=; _ym_visorc=w; _

  const cookies = [
    "yandex_login=zyf1232; L=BThGQUNRSXZPfGhOUA5GWVVQVm11aHV0Pi8eZgMCVA==.1670703521.15187.319169.6e70928be59e9e68ae95355e92732af4; gdpr=0; _ym_uid=1678022506811626580; mda_exp_enabled=1; _yasc=ws5/cn87TXwQiE0E98Z6pyIAI5mtpW/LqN5GcPfCUx4hEmRMg4rq12IGJO8m; yandexuid=6368727731681304332; yuidss=6368727731681304332; location=1; crookie=s4Mawg4NxWRS/yECxV6JkTTywNwaAwdcMsJ6MugeQkMOCVu8o5v7jY7ZVNR0xXmBxpe0crlG9PTFWq3AhjTKd28oPTg=; cmtchd=MTY4MTkxNDk3OTg0Ng==; coockoos=4; ys=udn.cDp6eWYxMjMy#c_chck.4262959451; mda2_beacon=1681996552692; sso_status=sso.passport.yandex.ru:synchronized; _ym_isad=1; kdetect=1; yandex_gid=44; uid=111080422; yp=1682083254.yu.6368727731681304332; ymex=1684588854.oyu.6368727731681304332; _ym_d=1682001053",
  ];

  const page = await browser.newPage(...cookies);

  // Films
  // avatar, name, year, duration, country, genre, director, actors

  const bd = [];
  const k = async (page, bd, i) => {
    await page.goto(`https://www.kinopoisk.ru/lists/movies/?page=${i}`);
    const parentElNames = await page.evaluate(() => {
      let columns = [];
      let yearsAndDuration = Array.from(
        document.querySelectorAll(
          "span.desktop-list-main-info_secondaryText__M_aus"
        ),
        (el) => el.innerText
      );
      const durations = [];
      const years = [];
      yearsAndDuration.forEach((item, index) => {
        let splitStr = item.split(",").filter((item) => item);
        let year = splitStr[0].replace(/^\s+|\s+$/g, "");

        let duration = splitStr[1]
          .substring(1, splitStr[1].length - 1)
          .replace(/^\s+|\s+$/g, "");

        durations.push(duration);
        years.push(year);
      });

      const avatars = [];

      let avatarsArray = Array.from(
        document.querySelectorAll("img.styles_root__DZigd"),
        (el) => el.getAttribute("src")
      );

      avatarsArray.forEach((item) => avatars.push(item));

      let parentElements = document.querySelectorAll(
        "div.desktop-list-main-info_additionalInfo__Hqzof"
      );

      let obj = {};

      const genre = [];
      const director = [];
      const country = [];
      const roles = [];

      parentElements.forEach((parentElement, index) => {
        let elements = parentElement.querySelectorAll(
          "span.desktop-list-main-info_truncatedText__IMQRP"
        );

        for (let i = 0; i < elements.length; i++) {
          if (index % 2 == 0) {
            obj.country = elements[i].innerText
              .split("•")[0]
              .substring(0, elements[i].innerText.split("•")[0].length - 1);

            const regex = /Режиссёр:\s*[^\n\r]*/;
            const result = elements[i].innerText.replace(regex, "");
            obj.genre = result
              .split("•")[1]
              .split(" ")[1]
              .replace(/^\s+|\s+$/g, "");
            obj.director = elements[i].innerText
              .split(":")[1]
              .substring(1, elements[i].innerText.split(":")[1].length);

            country.push(obj.country);
            genre.push(obj.genre);
            director.push(obj.director);
          } else {
            obj.roles = elements[i].innerText
              .split(":")[1]
              .substring(1, elements[i].innerText.split(":")[1].length);
            roles.push(obj.roles);
            obj = {};
          }
        }
      });

      const ratings = [];
      let rating = Array.from(
        document.querySelectorAll("span.styles_kinopoiskValue__9qXjg"),
        (el) => el.innerText
      );
      rating.forEach((item) => {
        ratings.push(item);
      });

      let parentElements2 = document.querySelectorAll(
        ".base-movie-main-info_link__YwtP1"
      );
      let result = [];
      parentElements2.forEach((parentElement, index) => {
        let name = parentElement.querySelector('span[data-tid="4502216a"]');
        let originalName = parentElement.querySelector(
          "span.desktop-list-main-info_secondaryTitle__ighTt"
        );
        result.push({
          avatars: avatars[index],
          name: name ? name.innerText : "",
          originalName: originalName ? originalName.innerText : name.innerText,
          rating: ratings[index],
          years: years[index],
          durations: durations[index],
          country: country[index],
          genre: genre[index],
          director: director[index],
          roles: roles[index],
        });
      });
      return result;
    });

    console.log(parentElNames);
  };

  await page.goto("https://www.kinopoisk.ru/lists/movies");

  let wonderfulFunction = async function (i) {
    i = i || 0;
    if (i < 40) {
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
