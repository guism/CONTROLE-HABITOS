import { expect } from 'chai';
import request from 'supertest';


describe('Habit Endpoints', () => {
    let token;

    beforeEach(async () => {
        const res = await request('http://localhost:3000')
            .post('/users/login')
            .send({ username: 'testusuariocadastrado', password: '12345' });
        token = res.body.token;
    });

    afterEach(async () => {
        await request('http://localhost:3000')
            .delete('/habits/Novo Hábito')
            .set('Authorization', `Bearer ${token}`);
    });

    describe('POST /habits', () => {
        it('criar hábito com sucesso', async () => {
            const res = await request('http://localhost:3000')
                .post('/habits')
                .set('Authorization', `Bearer ${token}`)
                .send({ habitName: 'Novo Hábito' });
            expect(res.status).to.equal(201);
            expect(res.body.success).to.equal(true);
        });
        it('Criar hábito já existente', async () => {
            await request('http://localhost:3000')
                .post('/habits')
                .set('Authorization', `Bearer ${token}`)
                .send({ habitName: 'Novo Hábito' });
            const res = await request('http://localhost:3000')
                .post('/habits')
                .set('Authorization', `Bearer ${token}`)
                .send({ habitName: 'Novo Hábito' });
            expect(res.status).to.equal(409);
            expect(res.body).to.have.property('error', 'Hábito já cadastrado');
        });
    });
    describe('POST /habits/{habitsName}/complete', () => {
        it('Completar hábito com sucesso', async () => {
            let randomHabitName = Math.random().toString(36).substring(7);
            await request('http://localhost:3000')
                .post('/habits')
                .set('Authorization', `Bearer ${token}`)
                .send({ habitName: randomHabitName });
             const res = await request('http://localhost:3000')
                .post('/habits/' + randomHabitName + '/complete')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal(true);
        });
        it('Falha ao completar hábito não existente', async () => {
            const res = await request('http://localhost:3000')
                .post('/habits/Hábito Inexistente/complete')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error', 'Hábito não encontrado');
        });
    
    describe('GET /habits/history', () => {
        it('Obter histórico de hábitos concluídos', async () => {
            const uniqueHabitName = `Novo Hábito ${Date.now()}`; // Use a unique habit name

            // Clear all habits before the test
            await request('http://localhost:3000')
                .delete('/habits')
                .set('Authorization', `Bearer ${token}`);

            // Create the habit
            await request('http://localhost:3000')
                .post('/habits')
                .set('Authorization', `Bearer ${token}`)
                .send({ habitName: uniqueHabitName });

            // Complete the habit
            await request('http://localhost:3000')
                .post(`/habits/${uniqueHabitName}/complete`)
                .set('Authorization', `Bearer ${token}`);

            // Fetch the history
            const res = await request('http://localhost:3000')
                .get('/habits/history')
                .set('Authorization', `Bearer ${token}`);

            // Validate the response
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            const habit = res.body.find(h => h.habitName === uniqueHabitName);
            expect(habit).to.exist;
            expect(habit).to.have.property('habitName', uniqueHabitName);
            expect(habit).to.have.property('username', 'testusuariocadastrado');
        });
        

        });
    });
});