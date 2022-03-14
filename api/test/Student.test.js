const request = require('supertest');
const { test } = require('../config/config');
const app = require('../server')

var newCPF = "356.921.260-28";
var existingCPF = "356.921.260-28";
var newEmail = "testMail@test.com";
var existingEmail = "testMail@test.com";

var testCreateStudent = {
    "name": "test new student",
    "email": newEmail,
    "cpf": newCPF
}

var testCreateStudentWithExistingEmail = {
    "name": "Student with existing e-mail",
    "email": existingEmail,
    "cpf": "624.656.474-74"
}

var testCreateStudentWithExistingCPF = {
    "name": "Student with existing CPF",
    "email": "testsCPF@email.com",
    "cpf": existingCPF
}

var testCreateStudentWithInvalidCPF = {
    "name": "Student with Invalid CPF",
    "email": "invalidCPF@email.com",
    "cpf": "12345678901"
}

describe('Test GET requisitions', () => {
    it('Should get one existing student and status code 200', async () => {
        const res = await request(app)
            .get('/students/1')
        expect(res.body.ra).toEqual(1)
        expect(res.statusCode).toEqual(200)
    })

    it('Should return 404 status code for non existing student and return body message "Student not found"', async() => {
        const res = await request(app)
            .get('/students/0')
        expect(res.statusCode).toEqual(404)
        expect(res.body.message).toEqual('Student not found')
    })
})

describe('Test POST requisitions', () => {
    it('Should return status code 201 for creating valid student', async () => {
        const res = await request(app)
            .post('/students')
            .send(testCreateStudent)
            console.log(testCreateStudent)
            expect(res.statusCode).toEqual(201)
    })

    it('Should return status code 409 for conflicting email', async () => {
        const res = await request(app)
        .post('/students')
        .send(testCreateStudentWithExistingEmail)
        expect(res.statusCode).toEqual(409)
        expect(res.body.message).toEqual('E-mail already registered')
    })

    it('Should return status code 409 for conflicting CPF', async () => {
        const res = await request(app)
        .post('/students')
        .send(testCreateStudentWithExistingCPF)
        expect(res.statusCode).toEqual(409)
        expect(res.body.message).toEqual('CPF already registered')
    })

    it('Should return status code 400 for invalid CPF', async () => {
        const res = await request(app)
        .post('/students')
        .send(testCreateStudentWithInvalidCPF)
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toEqual('CPF not valid')
    })

    it('Should return status code 400 for invalid E-mail', async () => {
        const res = await request(app)
        .post('/students/')
        .send({
            "name":"test",
            "email": "not_email",
            "cpf": "101.255.654-96"
        })
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toEqual('Invalid e-mail')
    })
})

describe('Test PUT requisitions', () => {

    it('Should return status code 409 for existing email', async () => {
        const res = await request(app)
        .put('/students/1')
        .send({
            "email": existingEmail
        })
        expect(res.statusCode).toEqual(409)
        expect(res.body.message).toEqual('E-mail already registered')
    })

    it('Should return status code 400 for invalid E-mail', async () => {
        const res = await request(app)
        .put('/students/1')
        .send({
            "email": "not_email"
        })
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toEqual('Invalid e-mail')
    })

    it('Should return status code 200 for successfully altering a student', async () => {
        const res = await request(app)
        .put('/students/1')
        .send({
            "name": "Changed Student",
            "email":"valid@email.com",
            "cpf": "634.201.845-65"
        })
        expect(res.statusCode).toEqual(200)
    })
})

describe('Test DELETE requisitions', () => {
    it('Should return status code 200 for deleting an existing Student', async () => {
        const res = await request(app)
        .delete('/students/1')
        expect(res.statusCode).toEqual(200)
    })
    
    it('Should return status code 404 for student not found', async () => {
        const res = await request(app)
        .delete('/students/0')
        expect(res.statusCode).toEqual(404)
        expect(res.body.message).toEqual('Student not found')
    })
})