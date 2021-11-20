const asyncHandler = require("../middleware/app_async");
const client = require("../config/db.config");


exports.getGoods = asyncHandler(async (req, res, next) => {
  await client.query(
    `SELECT * FROM goods`,
    (err, result) => {
      console.log('bala');
      console.log(result);
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
      if(result){
        console.log('paiin');
        console.log(result);
        const { rows } = result;
        if (!err) res.status(200).json(rows);
      }
    }
  );
});

exports.createGood = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, dateOfBirth, phoneNumber, classID } = req.body;
  await client.query(
    `CALL public.insert_student($1,$2,$3,$4,$5)`,
    [firstName, lastName, dateOfBirth, phoneNumber, classID],
    (err, result) => {
      if (!err) res.status(200).json({ Data: [], Success: true, Message: "" });
      else res.status(500).json({ Data: [], Success: false, Message: "" });
    }
  );
});

// @desc        Update student information
// @route       PUT /api/student
// @access      Public
exports.updateGood = asyncHandler(async (req, res, next) => {
  const { sid, firstName, lastName, dateOfBirth, phoneNumber, classID } =
    req.body;
  await client.query(
    `CALL public.update_student($1,$2,$3,$4,$5,$6)`,
    [sid, firstName, lastName, dateOfBirth, phoneNumber, classID],
    (err, result) => {
      if (!err) res.status(200).json({ Data: [], Success: true, Message: "" });
      else res.status(500).json({ Data: [], Success: false, Message: "" });
    }
  );
});

// @desc        Delete a student
// @route       Delete /api/student/:id
// @access      Public
exports.deleteGood = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await client.query(`CALL public.delete_student($1);`, [id], (err, result) => {
    if (!err) res.status(200).json({ Data: [], Success: true, Message: "" });
    else res.status(500).json({ Data: [], Success: false, Message: "" });
  });
});
