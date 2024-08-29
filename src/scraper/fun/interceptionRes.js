const interceptionRes = async (page, interceptImages = false) => {
  await page.setRequestInterception(true);
  page.on('request', request => {
    const resourceType = request.resourceType();
    if (
      ['font', 'media', 'websocket'].includes(resourceType) || 
      (resourceType === 'image' && interceptImages)
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });
};

module.exports = interceptionRes;
