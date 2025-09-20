const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha' });
  const result = userService.register(username, password);
  if (result.error) return res.status(409).json(result);
  res.status(201).json(result);
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha' });
  const result = userService.login(username, password);
  if (result.error) return res.status(401).json(result);
  res.json(result);
});

module.exports = router;
