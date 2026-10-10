const sharp = require('sharp');

async function inspect() {
  const meta = await sharp('public/images/aditya-sharma.jpg').metadata();
  console.log('Metadata:', meta.width, 'x', meta.height, 'channels:', meta.channels);

  const { data, info } = await sharp('public/images/aditya-sharma.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log('Raw info:', info);
  
  // Sample corners: (0,0), (width-1, 0), (10, 10), (width-10, 10), (0, 300), (width-1, 300)
  const getPixel = (x, y) => {
    const idx = (y * info.width + x) * info.channels;
    return [data[idx], data[idx+1], data[idx+2]];
  };

  console.log('Top Left (10,10):', getPixel(10, 10));
  console.log('Top Right (width-10, 10):', getPixel(info.width - 10, 10));
  console.log('Mid Left (10, 300):', getPixel(10, 300));
  console.log('Mid Right (width-10, 300):', getPixel(info.width - 10, 300));
}

inspect();
