const express = require("express");

const router = express.Router();

const userController = require("../controller/booksController");


router.get(
    "/allBooks",
    userController.viewAllBooks
);

router.post(
    "/createNewBook",
    userController.createNewBook
);

router.post(
    "/updatebook",
    userController.updateBook
);

router.post(
    "/viewBook",
    userController.viewBookDetails
);

router.post(
    "/deleteBook",
    userController.deleteBook
)

module.exports = router;
