const express = require("express");
const {create, read, update} = require( "../controllers/UserController");
const router = express.Router();

router.post("/users", create);
router.get("/users/:id", read);
router.put("/users/:id", update)

module.exports = router;
