const { findAccountById } = require("./accounts");

const findAuthorById = (authors, id) => {
  return authors.find(author => author.id === id);
}

const findBookById = (books, id) => {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let booksOut = [];
  let booksIn = [];
  const booksPartitioned = [];
  
  booksOut = books.filter(book => {
    return book.borrows.some((borrow) => !borrow.returned);
  });
  
  booksIn = books.filter(book => {
    return book.borrows.every((borrow) => borrow.returned);
  });

  booksPartitioned.push(booksOut);
  booksPartitioned.push(booksIn);
  
  return booksPartitioned;
}

function getBorrowersForBook(book, accounts) {
  const checkedOutAccs = book.borrows;

  const borrowersList = checkedOutAccs.map((checkedOutAcc) => {
    const account = findAccountById(accounts, checkedOutAcc.id);
    const borrower = { 
      ...checkedOutAcc,
      ...account,
    };
    return borrower;
  });
  borrowersList.splice(10);
  return borrowersList;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
