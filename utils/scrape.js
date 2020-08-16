const fetch = require('node-fetch');
const cheerio = require('cheerio');
const axios = require('axios');

async function fetchData() {
  try {
    const html = await fetch(
      'https://www.amazon.com/gp/product/0525576010/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1'
    ).then((x) => x.text());

    console.log(html);
  } catch (err) {
    console.log(err);
  }
}

fetchData();
