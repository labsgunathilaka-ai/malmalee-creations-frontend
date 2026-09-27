const Admin = require('../models/Admin');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findByEmail(email);

    if (!admin || admin.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      admin: { id: admin.id, name: admin.name, email: admin.email }
    });
  } catch (error) {
    next(error);
  }
};