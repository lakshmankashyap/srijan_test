var express = require('express');
var router = express.Router();
var validator = require('express-validator')
var createStudent = require('../controllers/srijan/createStudent')
var updateStudent = require('../controllers/srijan/updateStudent')
var getStudentDetail = require('../controllers/srijan/getStudentDetail')
var deleteStudent = require('../controllers/srijan/deleteStudent')
var getAllStudentsDetails = require('../controllers/srijan/getAllStudentsDetails')
var search = require('../controllers/srijan/search')


router.use(validator());
const JWTSECRET = 'THIS_IS_A_TEST_JWT_SECRET_KEY';

const verifyTokenAPI = function(req,res){
  // console.log('11111111111111111111111111111111111',req.headers.authorization);
  if(req.headers.authorization){
    const token = req.headers.authorization;
    // console.log('', token);
      // tokenStatus	=req.cookies.jwtToken[1];
      jwt.verify(token,JWTSECRET, function(err, decoded) {
        // console.log('wwwwww',decoded);
        if (err)return res.redirect('/');
        // console.log('wwwwww',decoded);s

          User.findOne({_id: decoded._id}).then(function(res){
            if(res==null || res == '') return res.redirect('/');
            if(res){
              // console.log('ooooooooooooooo9999999999999999999', res)
              req.currentUser = res;
              // console.log('current', req.currentUser.accountType);
              return next();
            }
          }).catch(function(err){
            return res.redirect('/');
          });
      });
    
  }else {
    return res.redirect('/');
  }
};
 /* STUDENT ROUTES */

 // POST method to create student
router.post('/createStudent', createStudent.createStudent);

// PUT method to update student details
router.put('/updateStudent/:email', updateStudent.updateStudent);

// GET method to get the details of student provided by id
router.get('/getStudentDetail/:email', getStudentDetail.getStudentDetail);

// DELETE method to delete a student from the database
router.get('/deleteStudent/:email', deleteStudent.deleteStudent);

// GET method to fetch all student details
router.get('/getAllStudentsDetails', getAllStudentsDetails.getAllStudentsDetails);

// POST method for searching student
router.get('/search', search.search);

module.exports = router;

