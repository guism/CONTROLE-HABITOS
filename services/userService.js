import users from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const SECRET = 'supersecret';

export function register(username, password) {
  if (users.find(u => u.username === username)) {
    return { error: 'Usuário já existe' };
  }
  users.push({ username, password });
  return { success: true };
}

export function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return { error: 'Credenciais inválidas' };
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  return { token };
}

export function authenticate(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
