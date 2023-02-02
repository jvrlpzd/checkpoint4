const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "group_detail" });
  }

  sumAll() {
    return this.connection.query(`SELECT group_detail.id AS id, 
    group_detail.group_name, 
    SUM(amount) AS total_amount FROM transaction
    JOIN category_detail ON transaction.category_id = category_detail.id 
    JOIN group_detail AS group_detail ON category_detail.group_id = group_detail.id 
    GROUP BY group_id, group_name;`);
  }

  insert(group) {
    return this.connection.query(
      `insert into ${this.table} (group_name, image) values (?, ?)`,
      [group.group_name, group.image]
    );
  }

  update(group) {
    return this.connection.query(
      `update ${this.table} set group_name = ?, image = ? where id = ?`,
      [group.group_name, group.image, group.id]
    );
  }
}

module.exports = CategoryManager;
