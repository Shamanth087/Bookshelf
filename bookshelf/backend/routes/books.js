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

router.route('/:id').get((req,res)=>{
    Book.findById(req.params.id)
    .then(book =>res.json(book))
    .catch(err =>res.status(400).json('Error:'+err));
});

router.route('/:id').delete((req,res)=>{
    Book.findByIdAndDelete(req.params.id)
    .then(() =>res.json("book deleted"))
    .catch(err =>res.status(400).json('Error:'+err));
});

router.route('/update/:id').post((req,res)=>{
    Book.findById(req.params.id)
    .then(book => {
        book.title=req.body.title;
        book.isbn=req.body.isbn;
        book.author=req.body.author;
        book.annotation=req.body.annotation;
        
        book.save()
        .then(() =>res.json("book updated"))
        .catch(err =>res.status(400).json('Error:'+err));

    })
    .catch(err =>res.status(400).json('Error:'+err));
});

module.exports=router;