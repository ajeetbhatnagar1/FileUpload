// Load modules 
var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');

// user express module
var app = Express();
app.use(bodyParser.json());


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Files");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("fileUpload", 10); //Field name and max count

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

// Set Port
app.set('port', (process.env.PORT || 3000));
// Node Server 
app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
});
