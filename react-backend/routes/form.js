var express = require('express');
var router = express.Router();
var fs = require("fs");
var bodyParser = require('body-parser');
var multer  = require('multer');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(multer({ dest: './tmp/'}).single('file'));

var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET  listing. */
router.get('/index.html', function (req, res) {
    res.render('form', { title: 'Express' });
 })

 /*GET listing To FORM*/
 router.get('/process_form', function (req, res) {
    response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })

 router.post('/process_form', urlencodedParser, function (req, res) {
    response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })


 router.post('/process_form_upload', function (req, res) {
    debugger;
    console.log(req.file);
    var file = __dirname + "/" + req.file.originalname;
    
    fs.readFile( req.file.path, function (err, data) {
       fs.writeFile(file, data, function (err) {
          if( err ){
             console.log( err );
             }else{
                response = {
                   message:'File uploaded successfully',
                   filename:req.file.originalname
                };
             }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
    });
 })
module.exports = router;