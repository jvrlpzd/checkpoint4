const express = require("express");

const router = express.Router();

// services d'auth
const {
  hashPassword,
  verifyPassword,
  verifyToken,
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

router.get("/api/transactions/user/:id", transactionControllers.browse);
router.get(
  "/api/transactions/user/:id/countall",
  transactionControllers.countAll
);
router.get("/api/transactions/:id", verifyToken, transactionControllers.read);
router.put("/api/transactions/:id", verifyToken, transactionControllers.edit);
router.post("/api/transactions", verifyToken, transactionControllers.add);
router.delete(
  "/api/transactions/:id",
  verifyToken,
  transactionControllers.destroy
);

router.get("/api/categories", verifyToken, categoryControllers.browse);
router.get("/api/categoriessum", verifyToken, categoryControllers.sum);
router.get("/api/categories/:id", verifyToken, categoryControllers.read);
router.put("/api/categories/:id", verifyToken, categoryControllers.edit);
router.post("/api/categories", verifyToken, categoryControllers.add);
router.delete("/api/categories/:id", verifyToken, categoryControllers.destroy);

router.get("/api/users", verifyToken, userControllers.browse);
router.get("/api/users/:id", verifyToken, userControllers.read);
router.put("/api/users/:id", verifyToken, userControllers.edit);
router.post("/api/users", verifyToken, userControllers.add);
router.delete("/api/users/:id", verifyToken, userControllers.destroy);

router.get("/api/groups", verifyToken, groupControllers.browse);
router.get("/api/groupssum", verifyToken, groupControllers.sum);
router.get("/api/groups/:id", verifyToken, groupControllers.read);
router.put("/api/groups/:id", verifyToken, groupControllers.edit);
router.post("/api/groups", verifyToken, groupControllers.add);
router.delete("/api/groups/:id", verifyToken, groupControllers.destroy);

module.exports = router;
