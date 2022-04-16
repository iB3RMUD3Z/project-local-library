//The project makes at least one use of an arrow function.
const findAccountById = (accounts, id) => {
  //The project makes at least one use of each of the following native array methods: find()
  return accounts.find(account => account.id === id);
}

const sortAccountsByLastName = (accounts) => {
  return accounts.sort((accA, accB) => {
    const lNameA = accA.name.last;
    const lNameB = accB.name.last;
    //The project uses at least two of the following JavaScript features: the ternary operator
    return lNameA.toLowerCase() < lNameB.toLowerCase() ? -1 : 1;
  });
}

const getTotalNumberOfBorrows = (account, books) => {
  //The project uses at least two of the following JavaScript features: object destructuring  
  const { id } = account;
    let total = 0;
  
    for (let book in books) {
      const { borrows } = books[book];
      borrows.forEach((bBook) => {
        if (bBook.id === id) {
          total++;
        }
      });
    }
  return total;
}

//The project employs at least one helper function, which helps support the tested functions.
const authorById = (authors, id) => {
  return authors.find((author) => author.id === id);
};

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;

  let booksPossessed = [];
  //The project makes at least one use of each of the following native array methods: filter()
  booksPossessed = books.filter((book) => {
    return book.borrows.some((borrow) => borrow.id === accountId && !borrow.returned);
  });
  //The project makes at least one use of each of the following native array methods: map()
  booksPossessed = booksPossessed.map((book) => {
    const author = authorById(authors, book.authorId);
    const nBook = {
      ...book,
      author,
    };
    return nBook;
  });
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
