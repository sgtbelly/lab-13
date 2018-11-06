'use strict';

import User from './model.js';

export default (req, res, next) => {

  try {

    let auth = {};
    let authHeader = req.headers.authorization;

    // BASIC Auth
    if(authHeader.match(/basic/i)) {

      // Create a {user:password} object to send into the model to authenticate the user

      // Start the authentication train
      User.authenticateBasic(auth)
        .then(user=>_authenticate(user))
        .catch(_authError);
    }
    // BEARER Auth
    else if(authHeader.match(/bearer/i)) {

      // Send the bearer token to the model to authenticate the user
      User.authenticateToken(token)
        .then(user=>_authenticate(user))
        .catch(_authError);
    }
    else { _authError(); }

  } catch(e) {
    _authError();
  }

  function _authenticate(user) {
    if(!user) { _authError(); }
    else {
      // Send the user and token back to the request
      next();
    }
  }

  // In all cases, force a server error ...
  function _authError() {
    next({status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password'});
  }

};

