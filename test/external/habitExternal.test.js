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
    });
});