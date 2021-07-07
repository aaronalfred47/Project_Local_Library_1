function findAuthorById(authors, id) {
   let found = authors.find((author) => author.id === id)
   return (!found) ? null : found;
  }      

function findBookById(books, id) {
  let found = books.find((book) => book.id === id)
   return (!found) ? null : found;
}

  function partitionBooksByBorrowedStatus(books) {
  const result = [];
  const resultReturned = [];
  const resultNotReturned = [];
  books.forEach(book => {
    if(book.borrows.some(borrow => borrow.returned === false)){
      resultNotReturned.push(book);
    } else resultReturned.push(book);
})
result.push(resultNotReturned, resultReturned);
return result;
}

function getBorrowersForBook(book, accounts) {
  return book.borrows.map((borrow) => {
    let account = accounts.find((a) => a.id === borrow.id)
    return {...borrow, ...account}
  }).slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
