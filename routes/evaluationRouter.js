const Router = require("express");
const router = new Router();
const evaluationController = require("../controllers/evaluationController");

router.post("/evaluation", evaluationController.evaluation);
router.get("/getEvaluation", evaluationController.getEvaluation);
router.post("/deleteEvaluation", evaluationController.deleteEvaluation);

module.exports = router;
