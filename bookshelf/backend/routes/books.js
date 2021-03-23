const router=require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req,res) =>{
    Book.find()
    .then(books =>res.json(books))
    .catch(err => res.status(400).json('Error:'+err));
});

router.route('/add').post((req,res) =>{
    const title = req.body.title;
    const isbn = req.body.isbn;
    const author = req.body.author;
    const annotation = req.body.annotation;

    const newBook = new Book({
        title,
        isbn,
        author,
        annotation,
    });

    newBook.save()
    .then(() =>res.json('Book added!'))
    .catch(err =>res.status(400).json('Error:'+err));

});

module.exports=router;