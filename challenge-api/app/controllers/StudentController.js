const Student = require('../models/Student')
const { Op } = require("sequelize")

//List students
exports.list = async (req, res) => {
    let studentList = await Student.findAll()
    res.json(studentList)
};

//Get student
exports.get = async (req, res) => {
    const id = req.params.id
    let student = await Student.findByPk(id)

    if (!student) {
        res.json({'notfound': 'Registro não encontrado'})
    }

    res.json(student)
};

//Create student
exports.create = async (req, res) => {
    //Find students with same RA and CPF
    const verify = await Student.count({
        where: {
            [Op.or]: [
                { ra: req.body.ra },
                { cpf: req.body.cpf }
            ]
        },
    })

    if (verify) res.json({ 'error': 'Já existe um registro com este mesmo RA/CPF' })

    try {
        let insert = await Student.create({
            'name': req.body.name,
            'email': req.body.email,
            'ra': req.body.ra,
            'cpf': req.body.cpf
        })

        res.json({ 
            'success': { 
                'id': insert.id,
                'message': 'Cadastro realizado com sucesso' 
            }
        })
    } catch (err) {
        res.json({
            'error': { 
                'message': err.message
            }
        })
    }
};

//Edit student
exports.edit = async (req, res) => {
    const id = req.body.id
    let student = await Student.findByPk(id)

    if (!student) {
        res.json({'notfound': 'Registro não encontrado'})
    }

    try {
        await student.update({
            'name': req.body.name,
            'email': req.body.email
        }, 
        { 
            where: {
                'id': id
            }
        })

        res.json({ 
            'success': { 
                'id': student.id,
                'message': 'Cadastro atualizado com sucesso' 
            }
        })
    } catch (err) {
        res.json({
            'error': { 
                'message': err.message
            }
        })
    }
};

//Delete student
exports.delete = async (req, res) => {
    const id = req.body.id
    let student = await Student.findByPk(id)

    if (!student) {
        res.json({'notfound': 'Registro não encontrado'})
    }

    try {
        await student.destroy()
        res.json({ 
            'success': { 
                'message': 'Registro excluído com sucesso' 
            }
        })
    } catch (err) {
        res.json({
            'error': { 
                'message': err.message
            }
        })
    }
};