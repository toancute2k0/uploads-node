const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require('multer');

app.use(express.static('uploads'));
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
      callBack(null, 'uploads');
    }
    else {
      callBack(new Error("not image"), false);
    }
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + '.jpg');
  }
})

const upload = multer({ storage: storage })

//let upload = multer({ dest: 'uploads/' })

app.get("/", (req, res) => {
  res.send(
    `<h1 style='text-align: center'>
            Wellcome to FunOfHeuristic
            <br><br>
            <b style="font-size: 182px;">😃👻</b>
        </h1>`
  );
});

app.post('/file', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file);
})

app.post('/multipleFiles', upload.array('files'), (req, res, next) => {
  const files = req.files;
  console.log(files);
  if (!files) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send({ sttus: 'ok' });
})

