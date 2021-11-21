const express = require("express");
const router = express.Router();
const {
    getUserCards,
    createCard,
    deleteCard,
    getSingleCard,
    updateCard,
    getCards,
} = require("../controllers/card.controller");

router.get("/", getCards).post("/", createCard).put("/", updateCard);
router.get("/:id", getSingleCard).delete("/:id", deleteCard);
router.get("/usercards/:id", getUserCards);
module.exports = router;