const puppeteer = require('puppeteer')
const autoScroll = require('./fun/autoScrool')
const interceptionRes = require('./fun/interceptionRes')

const url =
  'https://www.sitemercado.com.br/supermercadoscolorado/serra-negra-loja-shopping-centro-rua-pedro-vieira-e-silva'

const scrapeCol = async searchFor => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await interceptionRes(page, true)

  try {
    await page.setViewport({ width: 1235, height: 842 })
    await page.goto(url, { waitUntil: 'networkidle2' })
    await page.waitForSelector('.form-control.badge-pill.fs-14')
    await page.type('.form-control.badge-pill.fs-14', searchFor)

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('div.icon-search-ifood.d-none.d-xl-block')
    ])

    await autoScroll(page, 1)
    await page.waitForSelector('app-list-product-item')

    const listProductCol = await page.$$eval(
      'app-list-product-item',
      products =>
        products.map(product => {
          const nameElement = product.querySelector(
            'h3.txt-desc-product-item a'
          )
          const priceElement = product.querySelector(
            'div.area-preco .area-bloco-preco'
          )
          const imgElement = product.querySelector('img.img-fluid')

          const name = nameElement ? nameElement.textContent.trim() : 'No name'
          const price = priceElement
            ? priceElement.textContent.trim()
            : 'No price'
          const img = imgElement
            ? 'https:' + imgElement.getAttribute('src')
            : 'No image'

          return { name, price, img, market: 'Colorado' }
        })
    )

    const logoCol = await page.evaluate(() => {
      const img = document.querySelector(
        'img[src="//img.sitemercado.com.br/redes/b46e3c421fd9d6a2dd73953f1dadf27c.png"]'
      )
      return img ? img.src : null
    })

    return { logoCol, listProductCol }
  } catch (error) {
    console.error('Error:', error.message, error.stack)
    return { logoCol: 'No logo', listProductCol: [] }
  } finally {
    await browser.close()
  }
}

module.exports = scrapeCol
