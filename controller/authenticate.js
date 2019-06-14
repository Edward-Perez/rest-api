const { User } = require('../models');
const auth = require('basic-auth');
const bcrypt = require('bcryptjs');

module.exports = {

  // Authenticate User //
  authUser: (req, res, next) => {
    const credentials = auth(req);
    if (credentials) {
      User.findOne({
        where: {
          emailAddress: credentials.name,
        }
      })
      .then( async user => {
        const authenticated = await bcrypt.compareSync(credentials.pass, user.password);
        if (authenticated) {
          req.user = user;
          next();
        } else {
          throw new Error();
        }
      })
      .catch( err => {
        req.method === 'PUT' ||  req.method === 'DELETE' 
        ? err.status = 403 
        : err.status = 401;
        err.message = 'Access Denied';
        next(err); 
      });
    } else { 
      const err = new Error('Access Denied');
      req.method === 'PUT' ||  req.method === 'DELETE' 
      ? err.status = 403 
      : err.status = 401;
      next(err);
    }
  }
}