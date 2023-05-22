const path = require('path');
const Contact = require('../../models/contact');
const fs = require('fs/promises');
const { RequestError } = require('../../helpers');

const uploadImage = async (req, res) => {
  const { filename } = req.file;

  if (!filename) {
    throw RequestError(400, 'File is require!');
  }
  const tmpPath = path.resolve(__dirname, '../../tmp', filename);
  const publicPath = path.resolve(
    __dirname,
    '../../public/images',
    filename
  );

  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
  const contactId = req.params.contactId;
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { image: `images/${filename}` },
    { new: true }
  );

  console.log('req.params', req.params);

  res.json({ image: contact.image });
};

module.exports = uploadImage;
