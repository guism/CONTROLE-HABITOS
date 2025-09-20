const request = require('supertest');
const { PassThrough } = require('supertest/lib/test');


(async () => {
    const chai = await import('chai');
    expect = chai.expect;
})();


describe('User Endpoints', () => {

    describe('POST /users/register', () => {
        it('registrar usuario com sucesso', async () => {
            const res = await request('http://localhost:3000')
                .post('/users/register')
                .send({ username: 'testusuario', password: 'testsenha' });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('success', true);
            
            
        });
        it('falha ao registrar usuario existente', async () => {
            const res = await request('http://localhost:3000')
                .post('/users/register')
                .send({ username: 'testusuariocadastrado', password: '12345' });
            expect(res.status).to.equal(409);
            expect(res.body).to.have.property('error', 'Usuário já existe');
        });
    });

});