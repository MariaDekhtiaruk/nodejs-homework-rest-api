const getCurrent = (req, res) => {
  const { user } = req;
  const { email, subscription } = user;
  res.json({ email, subscription });
};

module.exports = getCurrent;
