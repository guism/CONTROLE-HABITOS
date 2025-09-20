import { expect } from 'chai';
import request from 'supertest';

describe('Habit Endpoints', () => {
    let token;

    beforeEach(async () => {
        // REALIZAR LOGIN E OBTER TOKEN
        const res = await request('http://localhost:3000')
            .post('/users/login')
            .send({ username: 'testusuariocadastrado', password: '12345' });
        // Armazenar o token para uso nos testes
        token = res.body.token;
    });
    afterEach(async () => {
        // LIMPAR DADOS DE HÁBITOS APÓS CADA TESTE, SE NECESSÁRIO
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