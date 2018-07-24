const express = require("express");
const router = express.Router();
let {read, create} = require("../controllers/SICPLessonController");

router.get("/sicplessons", read);
router.post("/sicplessons", create);
module.exports = router;