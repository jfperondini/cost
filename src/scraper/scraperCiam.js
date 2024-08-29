const puppeteer = require('puppeteer')
const autoScroll = require('./fun/autoScrool')
const interceptionRes = require('./fun/interceptionRes')

const url = 'https://www.ciamdrighiemcasa.com.br/'

const scrapeCiam = async searchFor => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await interceptionRes(page)

  try {
    await page.setViewport({ width: 1235, height: 842 })
    await page.goto(url, { waitUntil: 'networkidle2' })

    if (typeof searchFor !== 'string') {
      throw new Error('searchFor must be a string')
    }

    await page.waitForSelector('#inputBuscaRapida')
    await page.type('#inputBuscaRapida', searchFor)

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('button.btn.btn-search')
    ])

    let hasNextPage = true
    const listProductCiam = []

    while (hasNextPage) {
      await autoScroll(page, 150)

      await page.waitForSelector('.info-price')
      await page.waitForSelector(
        'img.img-container--product.center-block.image-product.ng-lazyloaded.show'
      )

      const { listOfAvailableProduct, foundUnavailable } = await page.$$eval(
        '.product',
        products => {
          const listOfAvailableProduct = []
          let foundUnavailable = false

          products.forEach(product => {
            const isAvailable = product
              .querySelector('.thumbnail')
              .classList.contains('produto-disponivel')

            if (isAvailable) {
              const nameElement = product.querySelector(
                '.text-success.description.center-block.text-center.visible-xs'
              )
              const priceElement = product.querySelector(
                '.info-price.ng-star-inserted'
              )
              const imgElement = product.querySelector(
                'img.img-container--product.center-block.image-product.ng-lazyloaded.show'
              )

              const name = nameElement
                ? nameElement.textContent.trim()
                : 'No name'
              const price = priceElement
                ? priceElement.textContent.trim()
                : 'No price'
              const img = imgElement
                ? imgElement.getAttribute('src')
                : 'No image'

              listOfAvailableProduct.push({
                name,
                price,
                img,
                market: 'Ciamdrighi'
              })
            } else {
              foundUnavailable = true
            }
          })

          return { listOfAvailableProduct, foundUnavailable }
        }
      )

      listProductCiam.push(...listOfAvailableProduct)

      if (foundUnavailable) {
        hasNextPage = false
      } else {
        const nextButton = await page.$('a[aria-label="Next"]')
        if (nextButton) {
          await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
            nextButton.click()
          ])
        } else {
          hasNextPage = false
        }
      }
    }
    const logoCiam = await page.evaluate(url => {
      const logoElement = document.querySelector('a img')
      const src = logoElement ? logoElement.getAttribute('src') : 'No logo'
      return src !== 'No logo' ? new URL(src, url).href : 'No logo'
    }, url)

    return { logoCiam, listProductCiam }
  } catch (err) {
    console.error('Error:', err.message)
    return { logoCiam: 'No logo', listProductCiam: [] }
  } finally {
    await browser.close()
  }
}

module.exports = scrapeCiam
