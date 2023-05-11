const Router = require("express");
const router = new Router();
const applicationController = require("../controllers/applicationController");

router.post("/apply", applicationController.apply);
router.post("/updateApply", applicationController.updateApply);
router.get("/checkApply", applicationController.checkApply);
router.get("/getApply", applicationController.getApply);

module.exports = router;
