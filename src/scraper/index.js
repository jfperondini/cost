const scrapeCiam = require('../scraper/scraperCiam')
const scrapeCol = require('../scraper/scraperCol')

const runScrapers = async () => {
  try {
    console.time('timerLabel')
    const searchFor = 'leite'

    const { logoCiam, listProductCiam } = await scrapeCiam(searchFor)
    const { logoCol, listProductCol } = await scrapeCol(searchFor)

    const listProduct = [...listProductCiam, ...listProductCol]

    listProduct.forEach(product => {
      product.price = product.price.replace(/\s*un\.\s*$/, '')
      if (product.market === 'Ciamdrighi') {
        product.logo = logoCiam
      } else if (product.market === 'Colorado') {
        product.logo = logoCol
      }
    })

    //console.log('listProduct', listProduct)
    console.timeEnd('timerLabel')
  } catch (err) {
    console.error('Erro', err)
  }
}

runScrapers()
