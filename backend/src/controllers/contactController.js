const Contact = require('../models/Contact');

/**
 * @desc    Submit a new contact us message
 * @route   POST /api/contact
 * @access  Public
 */
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, subject, and message.'
      });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. Our atelier team will be in touch soon.',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contact messages (with optional status filter)
 * @route   GET /api/contact or GET /api/admin/contacts
 * @access  Public / Admin
 */
exports.getContacts = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update contact message status
 * @route   PUT /api/contact/:id/status
 * @access  Admin
 */
exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Read', 'Replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value. Must be Pending, Read, or Replied.'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact status updated.',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete contact message
 * @route   DELETE /api/contact/:id
 * @access  Admin
 */
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
