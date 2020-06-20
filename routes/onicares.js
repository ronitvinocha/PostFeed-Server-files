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
	console.log(req.body);
	var sql='SELECT * from User where name=? AND password=?';
	res.locals.connection.query(sql,[req.body.name,req.body.password], function (error, results, fields) {
		if (error)
		{
			console.log(error)
		}
		else if(results.length>0)
		{
			res.send(JSON.stringify({"response": "success"}));
		}
		else 
		{
			console.log(req.body);
			var sql='INSERT INTO User(name,password)values(?,?)'
					res.locals.connection.query(sql,[req.body.name,req.body.password],function (error, results, fields) {
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


module.exports = router;
