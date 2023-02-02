const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category_detail" });
  }

  sumAll() {
    return this.connection.query(`SELECT category_detail.id AS id, 
    category_detail.category_name AS category_name, 
    SUM(transaction.amount) AS total_amount, category_detail.group_id
    FROM transaction 
    JOIN category_detail ON transaction.category_id = category_detail.id
    GROUP BY category_detail.id, category_detail.category_name
    ORDER BY category_id;`);
  }

  insert(category) {
    return this.connection.query(
      `insert into ${this.table} (category_name, group_id, user_id, image) values (?, ?, ?, ?)`,
      [
        category.category_name,
        category.group_id,
        category.user_id,
        category.image,
      ]
    );
  }

  update(category) {
    return this.connection.query(
      `update ${this.table} set category_name = ?, group_id = ?, user_id = ?, image = ? where id = ?`,
      [
        category.category_name,
        category.group_id,
        category.user_id,
        category.image,
        category.id,
      ]
    );
  }
}

module.exports = CategoryManager;
