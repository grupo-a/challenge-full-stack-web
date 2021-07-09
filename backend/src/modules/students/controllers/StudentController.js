const BaseController = require("../../../shared/controllers/BaseController");
const IndexStudentsService = require("../services/IndexStudentsServices");
const ShowStudentsService = require("../services/ShowStudentsServices");
const StoreStudentsService = require("../services/StoreStudentsServices");
const UpdateStudentsService = require("../services/UpdateStudentsServices");
const studentValidationSchema = require('../routes/validations/StudentValidations');
const { celebrate } = require("celebrate");
const DestroyStudentsService = require("../services/DestroyStudentsServices");

class StudentController extends BaseController {

    async index(req, res) {

        try {

            const indexStudentService = new IndexStudentsService()

            let rs = await indexStudentService.execute()

            return super.getResponse(
                req,
                res.status(200).json(rs)
            )

        } catch (error) {
            return super.getResponseError(req, res, error)
        }

    }

    async show(req, res) {

        try {

            const { id_estudante } = req.params

            if (Number.isNaN(Number(id_estudante)))
                throw new Error('ID do estudante é inválido!')

            const showStudentService = new ShowStudentsService()

            let rs = await showStudentService.execute(id_estudante)

            return super.getResponse(
                req,
                res.status(200).json(rs)
            )

        } catch (error) {
            return super.getResponseError(req, res, error)
        }

    }

    async store(req, res) {

        try {

            const { error } = studentValidationSchema.store.validate(req.body)
            if (error)
                throw new Error(error)

            const { nome, email, cpf } = req.body
            const storeStudentService = new StoreStudentsService()

            let rs = await storeStudentService.execute(nome, email, cpf)

            return super.getResponse(
                req,
                res.status(200).json(rs)
            )

        } catch (error) {
            return super.getResponseError(req, res, error)
        }

    }

    async update(req, res) {

        try {

            const showStudentService = new ShowStudentsService()
            const updateStudentsService = new UpdateStudentsService()

            const { id_estudante } = req.params

            if (id_estudante == undefined)
                throw new Error('O ID estudante não foi informado!')

            let rs = await showStudentService.execute(id_estudante)
            if (rs.length == 0)
                throw new Error('Estudante não localizado!')

            rs = await updateStudentsService.execute({
                ...req.body, id_estudante,
            })

            return super.getResponse(
                req,
                res.status(200).json(rs)
            )

        } catch (error) {
            return super.getResponseError(req, res, error)
        }

    }

    async destroy(req, res) {

        try {

            const showStudentService = new ShowStudentsService()
            const destroyStudentsService = new DestroyStudentsService()

            const { id_estudante } = req.params

            if (id_estudante == undefined)
                throw new Error('O ID estudante não foi informado!')

            let rs = await showStudentService.execute(id_estudante)
            if (rs.length == 0)
                throw new Error('Estudante não localizado!')

            rs = await destroyStudentsService.execute(id_estudante)

            return super.getResponse(
                req,
                res.status(200).json(rs)
            )

        } catch (error) {
            return super.getResponseError(req, res, error)
        }

    }

}

module.exports = StudentController