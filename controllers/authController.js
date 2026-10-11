const crypto = require('crypto');
const User = require('../models/User');
const {
  sendVerificationEmail,
  sendPasswordResetEmail
} = require('../config/mailer');

// Show signup page
exports.showSignup = (req, res) => {
  res.render('signup', {
    title: 'Sign Up',
    error: null
  });
};

// Register a new user
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.render('signup', {
      title: 'Sign Up',
      error: 'All fields are required.'
    });
  }

  // Accept valid email addresses from different domains
  const normalizedEmail = email.trim().toLowerCase();
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return res.render('signup', {
      title: 'Sign Up',
      error: 'Please enter a valid email address.'
    });
  }

  // Check whether the email is already registered
  const existing = await User.findByEmail(normalizedEmail);

  if (existing) {
    return res.render('signup', {
      title: 'Sign Up',
      error: 'That email is already registered.'
    });
  }

  // Generate an email verification token
  const verificationToken = crypto.randomBytes(20).toString('hex');

  // Create the user account
  await User.createUser({
    name: name.trim(),
    email: normalizedEmail,
    password,
    verificationToken
  });

  // Send verification email
  await sendVerificationEmail(normalizedEmail, verificationToken);

  // Show signup success page
  res.render('signup-success', {
    title: 'Check Your Email',
    email: normalizedEmail
  });
};

// Verify email address
exports.verifyEmail = async (req, res) => {
  const user = await User.markVerified(req.params.token);

  if (!user) {
    return res.status(400).send(
      'Invalid or expired verification link.'
    );
  }

  res.render('verify-success', {
    title: 'Verified',
    user
  });
};

// Show login page
exports.showLogin = (req, res) => {
  res.render('login', {
    title: 'Log In',
    error: null
  });
};

// Log in an existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = (email || '').trim().toLowerCase();

  const user = await User.findByEmail(normalizedEmail);

  if (
    !user ||
    !(await User.verifyPassword(password, user.password_hash))
  ) {
    return res.render('login', {
      title: 'Log In',
      error: 'Incorrect email or password.'
    });
  }

  if (!user.is_verified) {
    return res.render('login', {
      title: 'Log In',
      error: 'Please verify your email before logging in.'
    });
  }

  // Store user information in the session
  req.session.user = {
    id: user.id,
    name: user.name,
    role: user.role
  };

  // Redirect according to user role
  if (user.role === 'superadmin') {
    return res.redirect('/superadmin/dashboard');
  }

  if (user.role === 'admin') {
    return res.redirect('/admin/dashboard');
  }

  return res.redirect('/');
};

// Log out
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

// Show forgot-password page
exports.showForgotPassword = (req, res) => {
  res.render('forgot-password', {
    title: 'Forgot Password',
    message: null
  });
};

// Request password reset
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = (email || '').trim().toLowerCase();

  const user = await User.findByEmail(normalizedEmail);

  if (user) {
    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    await User.setResetToken(normalizedEmail, token, expires);
    await sendPasswordResetEmail(normalizedEmail, token);
  }

  // Use the same message whether the account exists or not
  res.render('forgot-password', {
    title: 'Forgot Password',
    message: 'If an account exists with that email, a reset link has been sent.'
  });
};

// Show reset-password page
exports.showResetPassword = async (req, res) => {
  const user = await User.findByResetToken(req.params.token);

  if (!user) {
    return res.status(400).send(
      'This reset link is invalid or has expired.'
    );
  }

  res.render('reset-password', {
    title: 'Reset Password',
    token: req.params.token,
    error: null
  });
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const user = await User.findByResetToken(req.params.token);

  if (!user) {
    return res.status(400).send(
      'This reset link is invalid or has expired.'
    );
  }

  if (
    !password ||
    password.length < 6 ||
    password !== confirmPassword
  ) {
    return res.render('reset-password', {
      title: 'Reset Password',
      token: req.params.token,
      error: 'Passwords must match and be at least 6 characters.'
    });
  }

  await User.resetPassword(user.id, password);

  res.redirect('/login');
};