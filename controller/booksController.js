const Book = require("../model/books");
const mongoose = require("mongoose");

const ObjectId = require("mongodb").ObjectID;

let httpStatus = require("http-status");

const userController = {
    async viewAllBooks(req, res) {
        try {
            var Books = await Book.find({}).exec();

            res.status(httpStatus.OK).json({
                status: true,
                data: Books,
                message: "Book saved successfully"
            })


        } catch (err) {
            console.error('Error while saving the book:', err);
            res.status(httpStatus.OK).json({
                status: false,
                message: "Error while saving the book"
            })
        }

    },
    async createNewBook(req, res) {
        try {
            const getData = req.body;
            const book = await Book.findOne({ isbn: getData.isbn }).exec();

            if (book) {
                res.status(httpStatus.OK).json({
                    status: false,
                    message: "Book Already created"
                });
            } else {
                const newBook = new Book({
                    title: getData.title,
                    author: getData.author,
                    description: getData.description,
                    publicationYear: getData.publicationYear,
                    isbn: getData.isbn
                });

                const savedBook = await newBook.save();
                console.log('Book saved successfully:', savedBook);
                res.status(httpStatus.OK).json({
                    status: true,
                    message: "Book saved successfully"
                });
            }
        } catch (err) {
            console.error('Error while saving the book:', err);
            res.status(httpStatus.OK).json({
                status: false,
                message: "Error while saving the book"
            });
        }
    },
    async updateBook(req, res) {
        try {
            var getData = req.body;
    
            const isbnToUpdate = getData.isbn; // ISBN of the book to update
            const updatedData = {
                title: getData.title,
                author: getData.author,
                description: getData.description,
                publicationYear: getData.publicationYear,
            };
    
            const filter = { isbn: isbnToUpdate }; // Create a filter object based on ISBN
    
            const updatedBook = await Book.findOneAndUpdate(filter, updatedData);
            console.log('Book updated successfully:', updatedBook);
            res.status(httpStatus.OK).json({
                status: true,
                message: "Book updated successfully"
            });
        } catch (err) {
            console.error('Error while updating the book:', err);
            res.status(httpStatus.OK).json({
                status: false,
                message: "Error while updating the book"
            });
        }
    },    
    async viewBookDetails (req,res){
        try{
            var getData = req.body;

            var viewBooks = await Book.findById(getData.Id).exec();

            res.status(httpStatus.OK).json({
                status: true,
                data: viewBooks,
                message: "Book saved successfully"
            })

        }catch(err){
            console.error('Error while updating the book:', err);
            res.status(httpStatus.OK).json({
                status: false,
                message: "Error while saving the book"
            });
        }
    },
    async deleteBook(req, res) {
        try {
            const getData = req.body;
            const bookIdToDelete = getData.Id;
    
            // Assuming you have a "Book" model defined
            // Change this line according to your actual model
            const deletedBook = await Book.findByIdAndDelete(bookIdToDelete);
    
            if (deletedBook) {
                console.log('Book deleted successfully:', deletedBook);
                res.status(httpStatus.OK).json({
                    status: true,
                    message: "Book deleted successfully"
                });
            } else {
                res.status(httpStatus.NOT_FOUND).json({
                    status: false,
                    message: "Book not found"
                });
            }
        } catch (err) {
            console.error('Error while deleting the book:', err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error while deleting the book"
            });
        }
    }
    
    

}
module.exports = userController;