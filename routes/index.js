const Router = require("express")
const router = new Router()
const path = require("path")

const userRouter = require("./userRouter")
const applicationRouter = require("./applicationRouter")

router.use("/user", userRouter)
router.use("/application", applicationRouter)

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

module.exports = router