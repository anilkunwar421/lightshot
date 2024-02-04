// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const cheerio = require('cheerio')
const axios = require('axios')

export default function handler(req, res) {
  lightshotImageExtractor('http://prntscr.com/dki21q').then((url) =>
    res.status(200).json({ url })
  )
  return;
}
export async function lightshotImageExtractor(url) {
  try {
    const { data } = await axios.get(url)
    const imgUrl = parseHTML(data)
    return imgUrl
  } catch (err) {
    console.log(err)
    return null
  }
}

export function parseHTML(html) {
  const $ = cheerio.load(html)
  const rows = $('.screenshot-image')

  if (rows.length > 0 && rows[0].attribs && rows[0].attribs.src) {
    return rows[0].attribs.src
  }

  return null
}