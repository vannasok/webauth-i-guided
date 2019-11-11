const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
   let userAcc = req.body;
   const hash = bcrypt.hashSync(userAcc.password, 12);
   userAcc.password = hash;

   Users.add(userAcc)
      .then(saved => {
         res.status(201).json(saved);
      })
      .catch(error => {
         res.status(500).json(error);
      });
});

router.post('/login', (req, res) => {
   let { username, password } = req.body;

   Users.findBy({ username })
      .first()
      .then(user => {
         if (user) {
            res.status(200).json({ message: `Welcome ${user.username}!` });
         } else {
            res.status(401).json({ message: 'Invalid Credentials' });
         }
      })
      .catch(error => {
         res.status(500).json(error);
      });
});

module.exports = router;
