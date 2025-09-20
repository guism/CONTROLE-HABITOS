const request = require('supertest');
const { PassThrough } = require('supertest/lib/test');


(async () => {
    const chai = await import('chai');
    expect = chai.expect;
})();


describe('User Endpoints', () => {

    describe('POST /users/register', () => {
        it('registrar usuario com sucesso', async () => {
            let usernameRandom = Math.random().toString(36).substring(7);
            let passwordRandom = Math.random().toString(36).substring(7);
            const res = await request('http://localhost:3000')
                .post('/users/register')
                .send({ username: usernameRandom, password: passwordRandom });
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

        it('realizar login com sucesso', async () => {
            const res = await request('http://localhost:3000')
                .post('/users/login')
                .send({ username: 'testusuariocadastrado', password: '12345' });
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('token');
        });
        it('falha ao realizar login com credenciais inválidas', async () => {
            const res = await request('http://localhost:3000')
                .post('/users/login')
                .send({ username: 'testusuariocadastrado', password: 'wrongpassword' });
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('error', 'Credenciais inválidas');
        });
    });

});

