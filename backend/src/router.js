const express = require("express");

const router = express.Router();

// services d'auth
const {
  hashPassword,
  verifyPassword,
  // verifyToken,
} = require("./services/auth");

const authControllers = require("./controllers/authControllers");
const transactionControllers = require("./controllers/transactionControllers");
const categoryControllers = require("./controllers/categoryControllers");
const userControllers = require("./controllers/userControllers");
const groupControllers = require("./controllers/groupControllers");

router.post("/api/register", hashPassword, userControllers.add);
router.post(
  "/api/login",
  authControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

router.get("/api/transactions", transactionControllers.browse);
router.get("/api/transactions/:id", transactionControllers.read);
router.put("/api/transactions/:id", transactionControllers.edit);
router.post("/api/transactions", transactionControllers.add);
router.delete("/api/transactions/:id", transactionControllers.destroy);

router.get("/api/categories", categoryControllers.browse);
router.get("/api/categories/:id", categoryControllers.read);
router.put("/api/categories/:id", categoryControllers.edit);
router.post("/api/categories", categoryControllers.add);
router.delete("/api/categories/:id", categoryControllers.destroy);

router.get("/api/users", userControllers.browse);
router.get("/api/users/:id", userControllers.read);
router.put("/api/users/:id", userControllers.edit);
router.post("/api/users", userControllers.add);
router.delete("/api/users/:id", userControllers.destroy);

router.get("/api/groups", groupControllers.browse);
router.get("/api/groups/:id", groupControllers.read);
router.put("/api/groups/:id", groupControllers.edit);
router.post("/api/groups", groupControllers.add);
router.delete("/api/groups/:id", groupControllers.destroy);

module.exports = router;
