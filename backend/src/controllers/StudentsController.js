const service = require('../services')

const getAll = async (req, res) => {
    const data = await service.students.findAll();

    return res.status(200).send(data)
}

const getById = async (req, res) => {
    const { id } = req.params;

    const data = await service.students.findById(id);

    return res.status(200).send(data)
}

const create = async (req, res) => {
    const {
        name,
        email,
        tax
    } = req.body;

    const student = {
        name,
        email,
        tax
    };

    try {
        const studentCreated = await service.students.create(student);

        return res.status(201).send(studentCreated);
    }
    catch(err)
    {
        return res.status(400).send({
            error: true,
            message: "Não foi possivel cadastrar o estudante"
        });
    }
}

const update = async (req, res) => {
    const { id } = req.params;

    const {
        name,
        email,
        tax
    } = req.body;

    const student = {
        id,
        name,
        email,
        tax
    }

    try {
        const studentUpdated = await service.students.update(student);

        return res.status(200).send(studentUpdated);
    }
    catch(err)
    {
        return res.status(400).send({
            error: true,
            message: "Não foi possivel atualizar o estudante"
        });
    }
}

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        await service.students.remove(id);

        return res.status(204);
    }
    catch(err)
    {
        return res.status(400).send({
            error: true,
            message: "Não foi possivel deletar o estudante"
        });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
