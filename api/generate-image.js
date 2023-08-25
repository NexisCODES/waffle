const { createCanvas } = require('canvas');
const sharp = require('sharp');
const { parse } = require('querystring');

module.exports = async (req, res) => {
  const { hexColor } = parse(req.url.split('?')[1]);

  if (!hexColor || !/^#([0-9A-F]{3}){1,2}$/i.test(hexColor)) {
    return res.status(400).send('Invalid hex color');
  }

  const canvas = createCanvas(200, 200);
  const context = canvas.getContext('2d');

  context.fillStyle = hexColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const imageBuffer = await canvas.toBuffer();

  // You can resize the image if needed using sharp
  const resizedImageBuffer = await sharp(imageBuffer)
    .resize(400, 400)
    .toBuffer();

  res.setHeader('Content-Type', 'image/png');
  res.send(resizedImageBuffer);
};
