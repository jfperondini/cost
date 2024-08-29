import { NextResponse } from 'next/server'
import scrapeCiam from '../../scraper/scraperCiam'
import scrapeCol from '../../scraper/scraperCol'

export async function GET (request) {
  const url = new URL(request.url)
  const searchFor = url.searchParams.get('searchFor')

  if (!searchFor) {
    return NextResponse.json(
      { error: 'Missing searchFor parameter' },
      { status: 400 }
    )
  }

  try {
    const { logoCiam, listProductCiam } = await scrapeCiam(searchFor)
    const { logoCol, listProductCol } = await scrapeCol(searchFor)

    // console.log('logoCiam', logoCiam)
    // console.log('logoCol', logoCol)

    const listProduct = [...listProductCiam, ...listProductCol]

    const filteredListProduct = listProduct
      .filter(product => product.price)
      .map(product => {
        if (product.price) {
          product.price = parseFloat(
            product.price
              .replace(/\s*un\.\s*$/, '')
              .replace('R$', '')
              .replace(',', '.')
              .trim()
          )
        }
        if (product.market === 'Ciamdrighi') {
          product.logo = logoCiam
        } else if (product.market === 'Colorado') {
          product.logo = logoCol
        }
        return product
      })
      //TODO precisa ver como iremos fazer a busca tipo Deterg // Detergente
      // .filter(product =>
      //   product.name.toLowerCase().startsWith(searchFor.toLowerCase())
      // )
      .sort((a, b) => a.name.localeCompare(b.name) || a.price - b.price)

    //console.log('filteredListProduct', filteredListProduct)

    return NextResponse.json(filteredListProduct)
  } catch (err) {
    console.error('Error fetching products:', err)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
