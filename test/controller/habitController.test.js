import request from 'supertest';
import sinon from 'sinon';
import { expect } from 'chai';
import app from '../../app.js';
import habitService from '../../services/habitService.js';

describe('Habit Controller Tests', () => {
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
        it('Criar hábito já existente Mocked', async () => {
  
            // Configurando o stub
            const addHabitMock = sinon.stub(habitService, 'addHabit').returns({ error: 'Hábito já cadastrado' });

            const resposta = await request(app)
                .post('/habits')
                .set('Authorization', `Bearer ${token}`)
                .send({ habitName: 'Novo Hábito' });
            expect(resposta.status).to.equal(409);
            expect(resposta.body).to.have.property('error', 'Hábito já cadastrado');
            expect(addHabitMock.calledOnce).to.be.true;


            addHabitMock.restore();
        });
    });
});