function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let tBorrowed = 0;

  books.forEach((book) => {
    if (!book.borrows[0].returned) {
      tBorrowed++;
    }
  });
  return tBorrowed;
}

function getMostCommonGenres(books) {
  const mComGen = books.reduce((count, book) => {
    const genre = book.genre;
    const genreInfo = count.find(genreName => genreName.name === genre);

    if (!genreInfo) {
      const addGenreInfo = {
        name: genre,
        count: 1,
      };
      count.push(addGenreInfo);
    } else {
      genreInfo.count++;
    }
    return count;
  }, []);

  mComGen.sort((genreA, genreB) => genreB.count - genreA.count);
  mComGen.splice(5);
  return mComGen;
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => {
    const addBook = {
      name: book.title,
      count: book.borrows.length,
    };
    return addBook;
  });

  popularBooks.sort((titleA, titleB) => titleB.count - titleA.count);
  popularBooks.splice(5);
  return popularBooks;
}

const getBooksByAuthorId = (books, authorId) => {
  return books.filter((book) => book.authorId === authorId);
};

function getMostPopularAuthors(books, authors) {
  const popularAuthors = authors.map((author) => {
    const combinedName = `${author.name.first} ${author.name.last}`;
    const booksByAuthor = getBooksByAuthorId(books, author.id);
    const borrowedCount = booksByAuthor.reduce((count, book) => count + book.borrows.length, 0);
    const addAuthorInfo = {
      name: combinedName,
      count: borrowedCount,
    };
    return addAuthorInfo;
  });

  popularAuthors.sort((authorA, authorB) => authorB.count - authorA.count);
  popularAuthors.splice(5);
  return popularAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
