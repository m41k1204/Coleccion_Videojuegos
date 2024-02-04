// authController.js

const passport = require('passport');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;

exports.login = passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
  successRedirect: '/principal',
  forcedLogin:true
});

exports.callback = passport.authenticate(WebAppStrategy.STRATEGY_NAME);

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
