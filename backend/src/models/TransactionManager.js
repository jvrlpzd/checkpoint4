const AbstractManager = require("./AbstractManager");

class TransactionManager extends AbstractManager {
  constructor() {
    super({ table: "transaction" });
  }

  findAll(id) {
    return this.connection.query(
      `select * from  ${this.table} where user_id = ? order by date DESC`,
      [id]
    );
  }

  findAmounts(id) {
    return this.connection.query(
      `SELECT SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS negative,
      SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS positive,
      SUM(amount) AS total FROM transaction WHERE user_id = ?`,
      [id]
    );
  }

  insert(transaction) {
    return this.connection.query(
      `insert into ${this.table} (amount, date, comment, user_id, category_id) values (?, IFNULL(?, NOW()), ?, ?, ?)`,
      [
        transaction.amount,
        transaction.date,
        transaction.comment,
        transaction.user_id,
        transaction.category_id,
      ]
    );
  }

  update(transaction) {
    return this.connection.query(
      `update ${this.table} set amount = ?, date = ?, comment = ?, user_id = ?, category_id = ? where id = ?`,
      [
        transaction.amount,
        transaction.date,
        transaction.comment,
        transaction.user_id,
        transaction.category_id,
        transaction.id,
      ]
    );
  }
}

module.exports = TransactionManager;
