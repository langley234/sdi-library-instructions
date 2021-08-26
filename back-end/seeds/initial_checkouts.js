exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('library_checkouts').del()
    .then(function () {
      // Inserts seed entries
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      const dateObj = new Date();
      let returnDate = new Date();
      returnDate.setUTCDate(returnDate.getUTCDate() + 14);

      const month = monthNames[dateObj.getMonth()];
      const returnMonth = monthNames[returnDate.getMonth()];

      const day = String(dateObj.getDate()).padStart(2, '0');
      const returnDay = String(returnDate.getDate()).padStart(2, '0');

      const year = dateObj.getFullYear();
      const returnYear = returnDate.getFullYear();

      const dateOutput = `${day}/${month}/${year}`;
      const returnDateOutput = `${returnDay}/${returnMonth}/${returnYear}`;

      return knex('library_checkouts').insert([
        { user_id: 1, book_id: 1, check_out_date: dateOutput, check_in_date: returnDateOutput },
        { user_id: 2, book_id: 3, check_out_date: dateOutput, check_in_date: returnDateOutput }
      ]);
    });
};
