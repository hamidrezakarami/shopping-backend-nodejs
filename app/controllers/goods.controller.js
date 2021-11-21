const asyncHandler = require("../middleware/app_async");
const client = require("../config/db.config");


exports.getGoods = asyncHandler(async (req, res, next) => {
  await client.query(
    `SELECT * FROM goods`,
    (err, result) => {
      const { rows } = result;
      if (!err) res.status(200).json(rows);
    }
  );
});

exports.getSingleGood = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await client.query(
    `SELECT * FROM goods g WHERE g.goodid = $1`,
    [id],
    (err, result) => {
      if (result) {
        const { rows } = result;
        if (!err) res.status(200).json(rows);
      }
    }
  );
});

exports.createGood = asyncHandler(async (req, res, next) => {
  const { detail, name, amount, price } = req.body;
  await client.query(
    `INSERT INTO goods (detail, name, amount, price)
    VALUES($1,$2,$3,$4)`,
    [detail, name, amount, price],
    (err, result) => {
      if (!err) res.status(200).json({ Data: [], Success: true, Message: "" });
      else {
        res.status(500).json({ Data: [], Success: false, Message: "" });
      }
    }
  );
});

exports.updateGood = asyncHandler(async (req, res, next) => {
  const { detail, name, amount, price, goodid } =
    req.body;
  await client.query(
    `UPDATE goods
    SET 
    detail= $1,
    name= $2,
    amount= $3,
    price= $4
    WHERE goodid = $5;`,
    [detail, name, amount, price, goodid],
    (err, result) => {
      if (!err) res.status(200).json({ Data: [], Success: true, Message: "" });
      else res.status(500).json({ Data: [], Success: false, Message: "" });
    }
  );
});

exports.deleteGood = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await client.query(`DELETE FROM goods WHERE goodid = $1`, [id], (err, result) => {
    if (!err) res.status(200).json({ Data: [], Success: true, Message: "" });
    else res.status(500).json({ Data: [], Success: false, Message: "" });
  });
});
