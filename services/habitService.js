import habits from '../models/habitModel.js';
import completedHabits from '../models/completedHabitsModel.js';

function addHabit(username, habitName) {
  if (habits.find(h => h.username === username && h.habitName === habitName)) {
    return { error: 'Hábito já cadastrado' };
  }
  habits.push({ username, habitName });
  return { success: true };
}

function deleteHabit(username, habitName) {
  const index = habits.findIndex(h => h.username === username && h.habitName === habitName);
  if (index === -1) return { error: 'Hábito não encontrado' };
  habits.splice(index, 1);
  return { success: true };
}

function completeHabit(username, habitName) {
  if (!habits.find(h => h.username === username && h.habitName === habitName)) {
    return { error: 'Hábito não encontrado' };
  }
  if (completedHabits.find(h => h.username === username && h.habitName === habitName)) {
    return { error: 'Hábito já concluído' };
  }
  completedHabits.push({ username, habitName, date: new Date() });
  return { success: true };
}

function getCompletedHabits(username) {
  return completedHabits.filter(h => h.username === username);
}

export default { addHabit, deleteHabit, completeHabit, getCompletedHabits };
