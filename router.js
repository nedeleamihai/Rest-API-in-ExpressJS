const express = require('express');
const DB = require('./database.js');
const router = express.Router();
 
router.post('/', (req, res) => {
	try {

	const book = {
		id: req.query.id,
		title: req.query.title,
		author: req.query.author
	};
	DB.insertIntoDb(book);
	console.log(DB.getAllFromDb());
	res.status(201).send(book);

	}catch(err) {
		res.status(404).send(`Error in Insert`);
	}
});

router.get(`/:id`, (req, res) => {	
	try {
		let book = DB.getFromDbById(req.params.id);
		res.status(201).send(book);
	}catch(err) {
		res.status(404).send(`Error in Get by id`);
	}
});

router.get(`/`, (req, res) => {
	let author = req.query.author;
	try {		
		let book = DB.getFromDbByAuthor(author);
		if (book.length > 0) {
			res.status(201).send(book);
		}else{
			res.status(201).send(DB.getAllFromDb());
		}
	}catch(err) {
		res.status(404).send(`Error in Get by author`);
	}
});

/*router.get(`/`, (req, res) => {
	console.log(`ALL`);
	try {
		let books = DB.getAllFromDb();
		res.status(201).send(books);
	}catch(err) {
		res.status(404).send(`Error in Get All`);
	}
});*/

router.put(`/:id`, (req, res) => {

	let id = req.params.id;

	try {
		DB.updateById(id, `Blablabla`);
		res.status(201).send(`Update Succes`);
	}catch(err) {
		res.status(404).send(`Error in Update by id`);
	}
});

router.delete(`/:id`, (req, res) => {

	let id = req.params.id;

	try {
		DB.removeFromDbById(id);
		res.status(201).send(`Delete Succes ID`);
	}catch(err) {
		res.status(404).send(`Error in Delete by id`);
	}
});

router.delete(`/`, (req, res) => {

	let author = req.query.author;

	try {
		if (typeof author !== 'undefined'){
			DB.removeFromDbByAuthor(author);
			res.status(201).send(`Delete Succes Author`);
		}else{
			DB.purgeDb();
			res.status(201).send(`Delete Succes All`);
		}
	}catch(err) {
		res.status(404).send(`Error in Delete by Author`);
	}
});

/*router.delete(`/`, (req, res) => {

	try {
		DB.purgeDb();
		res.status(201).send(`Delete Succes all`);
	}catch(err) {
		res.status(404).send(`Error in Delete all`);
	}
});*/

 
module.exports = router;