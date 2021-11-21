const express = require("express");
const router = express.Router();
const {
  getGoods,
  createGood,
  deleteGood,
  getSingleGood,
  updateGood,
  getCardsGoods
} = require("../controllers/goods.controller");

router.get("/", getGoods).post("/", createGood).put("/", updateGood);
router.get("/:id", getSingleGood).delete("/:id", deleteGood);
router.get("/cardsgoods/:id", getCardsGoods);
module.exports = router;