const Router = require("express")
const router = new Router()
const path = require("path")

const userRouter = require("./userRouter")
const applicationRouter = require("./applicationRouter")
const callbackRouter = require("./callbackRouter")
const evaluationRouter = require("./evaluationRouter")

router.use("/user", userRouter)
router.use("/application", applicationRouter)
router.use("/callback", callbackRouter)
router.use("/evaluation", evaluationRouter)

router.get('/static/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "..", "static/", fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('File not found');
    }
  });
});

router.get('/static/docs/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "..", "static/docs/", fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('File not found');
    }
  });
});

router.get('/static/defaultDocs/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "..", "static/defaultDocs/", fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('File not found');
    }
  });
});

router.get('/static/applicationDocs/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "..", "static/applicationDocs/", fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('File not found');
    }
  });
});

module.exports = router