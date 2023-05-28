const Router = require("express");
const router = new Router();
const callbackController = require("../controllers/callbackController");

router.post("/mail", callbackController.mail);

module.exports = router;
