const models = require("../models");

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;
  models.user_detail
    .findByEmailWithPassword(email)
    .then(([users]) => {
      if (users[0]) {
        [req.user] = users;
        next();
      } else res.sendStatus(401);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  getUserByEmailWithPasswordAndPassToNext,
};
