const test = require('tape')
const Leite = require('leite')
const bcrypt = require('bcrypt')
const studentModel = require('../app/models/Student')
const userModel = require('../app/models/User')


//Inserts 2000 students in database
test('Insert students', async (t) => {
    const leite = new Leite()

    let results = []
    for (var i = 0; i < 200; i++) {
        let ra = Math.floor(Math.random() * 10000000000)
        let insert = await studentModel.create({
            'name': leite.pessoa.nome(),
            'email': leite.pessoa.email(),
            'ra': ra,
            'cpf': leite.pessoa.cpf()
        })
        if (insert) {
            results.push(ra)
        }
    }

    t.assert(results.length, "Inseridos com sucesso")
    t.end()  
})

//Inserts admin user
test('Insert admin user', async (t) => {
    let pass = await bcrypt.hash('12345678', 10)
    let insert = await userModel.create({
        'name': 'Admin',
        'email': 'api@challenge.com',
        'password': pass,
        'username': 'admin'
    })

    t.assert(insert, "Inseridos com sucesso")
    t.end()  
})