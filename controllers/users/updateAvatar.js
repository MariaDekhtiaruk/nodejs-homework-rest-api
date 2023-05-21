const path = require('path');
const fs = require('fs/promises');
// const { RequestError } = require('../../helpers');
const Jimp = require('jimp');

const resizeImage = async (imgPath) => {
  return Jimp.read(imgPath)
    .then((img) => {
      return img
        .resize(250, 250) // resize
        .write(imgPath); // save
    })
    .catch((err) => {
      console.error(err);
    });
};

const updateAvatar = async (req, res) => {
  const { filename } = req.file;
  console.log(req.file);

  const tmpPath = path.resolve(__dirname, '../../tmp', filename);

  await resizeImage(tmpPath);

  const publicPath = path.resolve(
    __dirname,
    '../../public/avatars',
    filename
  );

  try {
    await fs.rename(tmpPath, publicPath);
    req.user.avatarURL = `avatars/${filename}`;
    const updatedUser = await req.user.save();

    res.json({ image: updatedUser.avatarURL });
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
};

module.exports = updateAvatar;
