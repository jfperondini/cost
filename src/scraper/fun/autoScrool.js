const autoScroll = async (page, delay) => {
  await page.evaluate(async delay => {
    await new Promise(resolve => {
      const distance = 100
      let totalHeight = 0
      const scrollTimer = setInterval(() => {
        window.scrollBy(0, distance)
        totalHeight += distance
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(scrollTimer)
          resolve()
        }
      }, delay)
    })
  }, delay)
}

module.exports = autoScroll
