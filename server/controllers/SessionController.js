const User = require("../models/UserModel");
const tokenForUser = require("../services/token").tokenForUser;
const compare = require("../services/hash").compare;

module.exports.create = (request, response) => {
  const { email, password } = request.body;
  console.log("Looking for a user with the email ", email);

  if(!email || !password) {
    return response.status(422).json({error: "You must provide an email and password"})
  }

  User.findOne({ email }).exec()
  .then(user => {
    // If there is no user found call done with a `null` argument, signifying no error
    // and `false` signifying that the signin failed
    if (!user) {
      console.log("No user found with this email", email);
      return response.status(422).json({error: "No user found with this email"});
    }
    compare(password, user.password, (err, isMatch) => {
      // If there is an error call done with our error
      if (err) {
        return response.send("Error occured");
      }
      // If the passwords do not match call done with a `null` argument, signifying no error
      // and `false` signifying that the signin failed
      if (!isMatch) {
        return response.status(422).json({error: "Invalid password, please try again."});
      }
      console.log("The email was found and the passwords matched", email);
      // If we have no errors and the passwords match
      // call done with a `null` argument, signifying no error
      // and with the now signed in user
      const token = tokenForUser(user);
      response.json({token, user});
    });
  }).catch(() => {
    return response.send("Error occured");
  });
}
