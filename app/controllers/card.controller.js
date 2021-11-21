const asyncHandler = require("../middleware/app_async");
const client = require("../config/db.config");


exports.getUserCards = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    await client.query(
        `SELECT * FROM cards WHERE useremail= $1`,
        [id],
        (err, result) => {
            const { rows } = result;
            if (!err) res.status(200).json(rows);
        }
    );
});

exports.getCards = asyncHandler(async (req, res, next) => {
    await client.query(
        `SELECT * FROM cards`,
        (err, result) => {
            const { rows } = result;
            if (!err) res.status(200).json(rows);
        }
    );
});

exports.getSingleCard = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await client.query(
        `SELECT * FROM cards WHERE cardid = $1`,
        [id],
        (err, result) => {
            if (result) {
                const { rows } = result;
                if (!err) res.status(200).json(rows);
            }
        }
    );
});

exports.createCard = asyncHandler(async (req, res, next) => {
    const { userEmail, generateCardDate, statusID } = req.body;
    await client.query(
        `INSERT INTO cards (useremail, generate-card-date, statusid)
    VALUES($1,$2,$3)`,
        [userEmail, generateCardDate, statusID],
        (err, result) => {
            if (!err) res.status(200).json({ Data: [], Success: true, Message: "" });
            else {
                res.status(500).json({ Data: [], Success: false, Message: "" });
            }
        }
    );
});

exports.updateCard = asyncHandler(async (req, res, next) => {
    const { userEmail, generateCardDate, statusID, cardID } =
        req.body;
    await client.query(
        `UPDATE goods
    SET
    useremail= $1,
    generate-card-date= $2,
    statusid= $3,
    WHERE cardid= $4;`,
        [userEmail, generateCardDate, statusID, cardID],
        (err, result) => {
            if (!err) res.status(200).json({ Data: [], Success: true, Message: "" });
            else res.status(500).json({ Data: [], Success: false, Message: "" });
        }
    );
});

exports.deleteCard = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await client.query(`DELETE FROM cards WHERE cardid = $1`, [id], (err, result) => {
        if (!err) res.status(200).json({ Data: [], Success: true, Message: "" });
        else res.status(500).json({ Data: [], Success: false, Message: "" });
    });
});
