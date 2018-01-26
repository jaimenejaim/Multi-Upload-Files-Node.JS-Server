var path = require('path')
var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = Express();
const PORT = 2000;
app.use(bodyParser.json());

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {	
	console.log(file);
        callback(null, Date.now().toString() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.stauts(500).json({ error : err.message });
        }
        return res.status(200).json({ message : "File uploaded sucessfully!." });
    });
});

app.listen(PORT, function (a) {
    console.log('Listening to port ' + PORT);
});