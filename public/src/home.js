function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => !book.borrows[0].returned).length
}

function _sortObj(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getMostCommonGenres(books) {
  let genres = [];
  books.forEach((book) => {
    let genreIndex = genres.findIndex((genre) => {
      return genre.name === book.genre;
    });
    if (genreIndex !== -1) {
      genres[genreIndex].count++;
    } else {
      genres.push({ name: book.genre, count: 1 });
    }
  });
  genres.sort((a, b) => b.count - a.count);
  return genres.slice(0, 5);
}

function getMostPopularBooks(books) {
  let popularityBooks = books.reduce((acc, { id, borrows }) => {
    acc[id] = borrows.length;
    return acc;
    }, {});
  // popularityBooks.sort((a, b) => b.count - a.count);
  let sorted = _sortObj(popularityBooks)
  return sorted.map((id) => {
    const { title: name } = books.find(({ id: bookId }) => bookId === id);
    return { name, count: popularityBooks[id]}
  }).slice(0, 5);    
}

function getMostPopularAuthors(books, authors) {
  let authorCounts = books.reduce((acc, book) => {
if (!acc[book.authorId]) {
  acc[book.authorId] = book.borrows.length
} else {
  acc[book.authorId] += book.borrows.length
}
return acc;
  } ,{});
  return Object.keys(authorCounts)
    .sort((id1, id2) => authorCounts[id2] - authorCounts[id1])
    .slice(0, 5)
    .map((key) => {
    let author = authors.find((author) => {
      return author.id === parseInt(key);
    })
    let name = `${author.name.first} ${author.name.last}`
    return {name, count: authorCounts[key]}
  })
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
