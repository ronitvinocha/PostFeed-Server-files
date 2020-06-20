var express = require('express');
var qs = require('querystring');
var router = express.Router();

/* GET users listing. */
router.post('/posts', function(req, res, next) {
	res.locals.connection.query('SELECT * from Posts', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"response": results}));
	});
});

router.post('/users', function(req, res, next) {
	res.locals.connection.query('SELECT * from User', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"response": results}));
	});
});
router.post('/addpost', function(request, res, next) {
	if (request.method == 'POST') {
		console.log(request.body);
		var sql='INSERT INTO Posts(userid,contenttext,contentimageurl)values(?,?,?)'
        res.locals.connection.query(sql,[request.body.userid,request.body.contenttext,request.body.contentimageurl],function (error, results, fields) {
		if (error)
		{
			res.send(JSON.stringify({"response": error}));
		}
		else
		{
			res.send(JSON.stringify({"response": "success"}));
		}
		
	});
    }
	
});
router.post('/adduser', function(request, res, next) {
	if (request.method == 'POST') {
		console.log(request.body);
		var sql='INSERT INTO User(name,password)values(?,?)'
        res.locals.connection.query(sql,[request.body.name,request.body.password],function (error, results, fields) {
		if (error)
		{
			res.send(JSON.stringify({"response": error}));
		}
		else
		{
			res.send(JSON.stringify({"response": "success"}));
		}
		
	});
    }
	
});

module.exports = router;
