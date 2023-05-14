const updateSubscription = (req, res) => {
  const { user, body } = req;

  user.subscription = body.subscription;
  user.save();

  res.json(user);
};

module.exports = updateSubscription;
