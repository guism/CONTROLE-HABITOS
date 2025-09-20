const users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const SECRET = 'supersecret';

function register(username, password) {
  if (users.find(u => u.username === username)) {
    return { error: 'Usuário já existe' };
  }
  users.push({ username, password });
  return { success: true };
}

function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return { error: 'Credenciais inválidas' };
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  return { token };
}

function authenticate(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

module.exports = { register, login, authenticate };
