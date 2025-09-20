import express from 'express';
import userService from '../services/userService.js';
import habitService from '../services/habitService.js';

const router = express.Router();

function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não informado' });
  const user = userService.authenticate(token);
  if (!user) return res.status(401).json({ error: 'Token inválido' });
  req.username = user.username;
  next();
}

router.post('/', authMiddleware, (req, res) => {
  const { habitName } = req.body;
  if (!habitName) return res.status(400).json({ error: 'Informe o nome do hábito' });
  const result = habitService.addHabit(req.username, habitName);
  if (result.error) return res.status(409).json(result);
  res.status(201).json(result);
});

router.delete('/:habitName', authMiddleware, (req, res) => {
  const { habitName } = req.params;
  const result = habitService.deleteHabit(req.username, habitName);
  if (result.error) return res.status(404).json(result);
  res.json(result);
});

router.post('/:habitName/complete', authMiddleware, (req, res) => {
  const { habitName } = req.params;
  const result = habitService.completeHabit(req.username, habitName);
  if (result.error) return res.status(400).json(result);
  res.json(result);
});

router.get('/history', authMiddleware, (req, res) => {
  const habits = habitService.getCompletedHabits(req.username);
  res.json(habits);
});

export default router;
