const AuditLog = require("../models/AuditLog");
const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get("/records", auth, role("doctor"), async (req, res) => {

  await AuditLog.create({
    userId: req.user.id,
    role: req.user.role,
    action: "Viewed patient records"
  });

  res.json({
    message: "Doctor accessed patient records",
    data: "Sensitive patient data here"
  });
});
router.post("/emergency", auth, async (req, res) => {

  await AuditLog.create({
    userId: req.user.id,
    role: req.user.role,
    action: "EMERGENCY ACCESS TRIGGERED"
  });

  res.json({
    message: "Emergency access logged"
  });
});

module.exports = router;