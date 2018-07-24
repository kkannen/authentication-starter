const User = require("../models/UserModel");
const tokenForUser = require("../services/token").tokenForUser;
const hash = require("../services/hash").hash;

module.exports.create = (request, response, next) => {
  const { firstName, lastName, email, phone, password } = request.body;
  const u = email;
  // If no email address or password was supplied return an error
  if (!firstName || !lastName || !email || !phone || !password ) {
    return response.status(422)
    .json({ error: "Please provide all fields" });
  }
  console.log("Look for a user with the email address");
  User.findOne({email: u}).exec()
  .then((existingUser) => {
      // If the user exist return an error on sign up
    if (existingUser) {
      console.log("This email address is already being used");
      return response.status(422).json({ error: "This email address is already in use" });
    }
    console.log("This email address is free to use");
    saveUser(firstName, lastName, email, phone, password, (token) => {
      response.json(token);
    });
  })
  .catch(err => next(err));
}

function saveUser(firstName, lastName, email, phone, password, done) {
  hash(password, null, (hashedPassword) => {
    // Create a new user with the supplied name, email, phone and hashed password


    const user = new User({ 
      firstName, 
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
    console.log("Saving the user");
    user.save()
      .then(u => {
        console.log("User has been saved to database");
        done({ token: tokenForUser(u), u });
      });
  });
}

module.exports.read = (request, response) => {
  User.findById({"_id": request.params.id}).exec()
  .then(contact => response.json(contact))
};

module.exports.update = ((request, response) => {
  const newSicpProgress = {
    sicpProgress: request.body,
  }
  User.updateOne({"_id": request.params.id},
  newSicpProgress).exec().then(sicpprog => {
    response.json(sicpprog)
  })
})



