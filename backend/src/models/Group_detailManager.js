const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "group_detail" });
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
