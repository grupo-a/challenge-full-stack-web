import { Request } from "express";
import { FindOperator, Repository } from "typeorm";
import { createStudentDTO, updateStudentDTO } from "../../dto/student/student.dto";
import { Student } from "../../entities/student.entity";
import { HTTP_STATUS } from "../../enum/http-status.enum";
import { ErrorResponse } from "../../response/error-response";
import { SuccessResponse } from "../../response/success-response";
import { IStudent } from "../../types/student.type";

export class StudentService {

    constructor(private repo: Repository<Student>) { }

    async findAll(query?: any): Promise<SuccessResponse<Student[]>> {

        let where = {};

        if (query.search) {
            where = {
                where: [
                    { name: new FindOperator('ilike', `%${query.search}%`) },
                    { email: new FindOperator('ilike', `%${query.search}%`) },
                ]
            }
        }
        const students = await this.repo.find(where);
        return new SuccessResponse(students, HTTP_STATUS.OK);
    }

    async findOne(req: Request): Promise<SuccessResponse<Student>> {
        const student: Student = await this.verifyStudentExistsById(req);
        return new SuccessResponse(student, HTTP_STATUS.OK);
    }

    async create(req: Request): Promise<SuccessResponse<Student>> {
        const student: IStudent = createStudentDTO(req.body);

        const alreadyRegistered = await this.repo.findOne({
            where: [
                { cpf: student.cpf },
                { ra: student.ra },
            ]
        });

        if (alreadyRegistered) {
            throw new ErrorResponse('Student already registered', HTTP_STATUS.BAD_REQUEST);
        }

        const savedStudent = await this.repo.save(student);

        return new SuccessResponse(savedStudent, HTTP_STATUS.OK);
    }

    async update(req: Request): Promise<SuccessResponse<Student | undefined>> {

        const student = await this.verifyStudentExistsById(req);

        const dto = updateStudentDTO(req.body);

        const studentToEdit = this.repo.create(dto);

        await this.repo.update(student.ra, studentToEdit);

        const editedStudent = await this.repo.findOne(student.ra);

        return new SuccessResponse(editedStudent, HTTP_STATUS.OK);
    }

    async delete(req: Request): Promise<SuccessResponse<undefined>> {

        const student = await this.verifyStudentExistsById(req);

        await this.repo.delete(student.ra);

        return new SuccessResponse(undefined, HTTP_STATUS.NO_CONTENT);
    }

    async verifyStudentExistsById(req: Request): Promise<Student> {

        const { id } = req.params;

        const student = await this.repo.findOne(id);

        if (!student) {
            throw new ErrorResponse('Not found', HTTP_STATUS.NOT_FOUND);
        }

        return student;
    }
}
