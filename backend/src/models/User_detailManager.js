const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user_detail" });
  }

  findByEmailWithPassword(email) {
    return this.connection.query(
      `select * from  ${this.table} where email = ?`,
      [email]
    );
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (username, email, hashedPassword) values (?, ?, ?)`,
      [user.username, user.email, user.hashedPassword]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${this.table} set username = ?, email = ?, hashedPassword = ? where id = ?`,
      [user.username, user.email, user.password, user.id]
    );
  }
}

module.exports = UserManager;
