var Book = require('../models/book');
var express = require('express');

//configure routes

var router = express.Router();

router
    .route('/books')
    .get(function(req, res) {
        Book.find(function(err, books) {
            if (err)
                res.send(err);
            res.json(books);
        });
    })

    .post(function(req, res) {
        var book = new Book(req.body);
        console.log(req.body);
        book.save(function(err) {
            if (err)
                res.send(err);
            res.send({
                message: 'Book Added'
            });
        });
    });

router.route('/books/:id')
    .put(function(req, res) {
        Book.findOne({
            _id: req.params.id
        }, function(err, book) {

            if (err)
                res.send(err);

            for (prop in req.body) {
                book[prop] = req.body[prop];
            }

            // save the mook
            book.save(function(err) {
                if (err)
                    res.send(err);

                res.json({
                    message: 'Book updated!'
                });
            });

        });
    })

    .get(function(req, res) {
        Book.findOne({
            _id: req.params.id
        }, function(err, book) {
            if (err)
                res.send(err);

            res.json(book);
        });
    })

    .delete(function(req, res) {
        Book.remove({
            _id: req.params.id
        }, function(err, book) {
            if (err)
                res.send(err);

            res.json({
                message: 'Successfully deleted'
            });
        });
    });

module.exports = router;