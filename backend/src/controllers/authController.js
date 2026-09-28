const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'malmalee_default_secret_key', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// Helper to format user response
const formatUserResponse = (user) => {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    phone: user.phone || '',
    birthday: user.birthday || '',
    favoriteCategory: user.favoriteCategory || 'Bespoke Mulberry Silk Scrunchies',
    tier: user.tier || 'Gold Atelier Patron',
    points: user.points ?? 250,
    addresses: user.addresses || [],
    createdAt: user.createdAt
  };
};

/**
 * @desc    Register a new customer (Sign Up)
 * @route   POST /api/auth/signup
 * @access  Public
 */
exports.signUp = async (req, res, next) => {
  try {
    const { fullName, email, password, phone, birthday, favoriteCategory } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and password.'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.'
      });
    }

    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain both letters and numbers.'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    // Create User
    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone ? phone.trim() : '',
      birthday: birthday || '',
      favoriteCategory: favoriteCategory || 'Bespoke Mulberry Silk Scrunchies'
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to Malmalee Creations.',
      token,
      user: formatUserResponse(user)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate customer/admin (Sign In)
 * @route   POST /api/auth/signin
 * @access  Public
 */
exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // Check password match
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: formatUserResponse(user)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Sign out user / clear session
 * @route   POST /api/auth/signout
 * @access  Public / Protected
 */
exports.signOut = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Signed out successfully.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Customer Forget Password - Generates Reset Token
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address.'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address.'
      });
    }

    // Generate reset token
    const rawResetToken = crypto.randomBytes(32).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(rawResetToken)
      .digest('hex');

    // Set expire time (1 hour)
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // Construct reset URL (or send simulated email)
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${rawResetToken}`;

    res.status(200).json({
      success: true,
      message: `Password reset instructions dispatched to ${user.email}.`,
      resetToken: rawResetToken,
      resetUrl
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reset password using reset token
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
exports.resetPassword = async (req, res, next) => {
  try {
    const rawToken = req.params.token || req.body.token;
    const { password } = req.body;

    if (!rawToken) {
      return res.status(400).json({
        success: false,
        message: 'Reset token is required.'
      });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long.'
      });
    }

    // Hash the token from parameter to match stored hash
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Password reset token is invalid or has expired.'
      });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Password reset successfully. You are now logged in.',
      token,
      user: formatUserResponse(user)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current customer profile
 * @route   GET /api/auth/profile
 * @access  Private (JWT Protected)
 */
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.'
      });
    }

    res.status(200).json({
      success: true,
      user: formatUserResponse(user)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update customer profile details (Full Name, Phone, Birthday, Favorite Category, Addresses)
 * @route   PUT /api/auth/profile
 * @access  Private (JWT Protected)
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const { fullName, phone, birthday, favoriteCategory, addresses } = req.body;

    if (fullName) user.fullName = fullName.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (birthday !== undefined) user.birthday = birthday;
    if (favoriteCategory !== undefined) user.favoriteCategory = favoriteCategory;
    if (Array.isArray(addresses)) user.addresses = addresses;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Customer profile updated successfully.',
      user: formatUserResponse(updatedUser)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update customer password while logged in
 * @route   PUT /api/auth/update-password
 * @access  Private (JWT Protected)
 */
exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current password and new password.'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long.'
      });
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect.'
      });
    }

    user.password = newPassword;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Password updated successfully.',
      token
    });
  } catch (error) {
    next(error);
  }
};
