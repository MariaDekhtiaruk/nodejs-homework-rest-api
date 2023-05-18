const path = require('path');
const fs = require('fs/promises');
// const { RequestError } = require('../../helpers');

const updateAvatar = async (req, res) => {
  const { filename } = req.file;
  console.log(req.file);

  const tmpPath = path.resolve(__dirname, '../../tmp', filename);

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
