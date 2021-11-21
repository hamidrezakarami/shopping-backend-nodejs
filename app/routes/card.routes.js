const express = require("express");
const router = express.Router();
const {
    getUserCards,
    createCard,
    deleteCard,
    getSingleCard,
    updateCard,
} = require("../controllers/card.controller");

router.get("/", getUserCards).post("/", createCard).put("/", updateCard);
router.get("/:id", getSingleCard).delete("/:id", deleteCard);
module.exports = router;