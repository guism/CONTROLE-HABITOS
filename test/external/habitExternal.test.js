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
        // Adicione seus testes aqui ou remova este bloco se não for necessário
        it('Obter histórico de hábitos concluídos', async () => {
            await request('http://localhost:3000')
                .post('/habits')
                .set('Authorization', `Bearer ${token}`)
                .send({ habitName: 'Novo Hábito' });
            await request('http://localhost:3000')
                .post('/habits/Novo Hábito/complete')
                .set('Authorization', `Bearer ${token}`);
            const res = await request('http://localhost:3000')
                .get('/habits/history')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.greaterThan(0);
            expect(res.body[0]).to.have.property('habitName', 'Novo Hábito');
            expect(res.body[0]).to.have.property('username', 'testusuariocadastrado');
        });

        });
    });
});