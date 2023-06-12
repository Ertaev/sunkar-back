const Router = require("express");
const router = new Router();
const callbackController = require("../controllers/callbackController");

router.post("/mail", callbackController.mail);
router.get("/getMail", callbackController.getMail);
router.post("/deleteMail", callbackController.deleteMail);

module.exports = router;
