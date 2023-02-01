const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category_detail" });
  }

  insert(category) {
    return this.connection.query(
      `insert into ${this.table} (category_name, group_id, image) values (?, ?, ?)`,
      [category.category_name, category.group_id, category.image]
    );
  }

  update(category) {
    return this.connection.query(
      `update ${this.table} set category_name = ?, group_id = ?, image = ? where id = ?`,
      [category.category_name, category.group_id, category.image, category.id]
    );
  }
}

module.exports = CategoryManager;
