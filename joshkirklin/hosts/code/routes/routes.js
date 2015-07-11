var express = require('express');
var router = express.Router();

router.get('/*', function(req, res) {
	//console.log("(routes) get /*: "+ req.url);
	res.render('document', { tModule: 'main'});
});

module.exports = router;