import { OrmConfig } from "../config/config.orm";
import { StudentService } from "../modules/student/student.service";
import { config } from 'dotenv';
import { Student } from "../entities/student.entity";
import { DeepPartial, Repository } from "typeorm";
import { SuccessResponse } from "../response/success-response";
import { HTTP_STATUS } from "../enum/http-status.enum";
import { Request } from "express";
import { ErrorResponse } from "../response/error-response";
import * as dtos from "../dto/student/student.dto";

config();

describe('Student service tests', () => {

    let repo: Repository<Student> = new Repository();

    it('StudentService must be instantiated', async () => {

        const service = new StudentService(repo);

        expect(service).toBeInstanceOf(StudentService);
    });

    it('findAll must return an array', async () => {

        const studentMock = new Student();
        studentMock.name = 'Victor Assis';
        studentMock.ra = 12345;
        studentMock.cpf = 11427845689;
        studentMock.email = 'victorar@unipam.edu.br';

        let reqMock = {
            query: {}
        } as unknown as Request;

        jest.spyOn(repo, 'find').mockResolvedValueOnce([studentMock]);

        const service = new StudentService(repo);

        const response = new SuccessResponse([studentMock], HTTP_STATUS.OK);

        expect((service.findAll(reqMock.query))).resolves.toEqual(response);
    });

    it('findOne must return one student', async () => {

        const studentMock = new Student();
        studentMock.name = 'Victor Assis';
        studentMock.ra = 12345;
        studentMock.cpf = 11427845689;
        studentMock.email = 'victorar@unipam.edu.br';

        let reqMock = {
            params: {
                id: 1,
            }
        } as unknown as Request;

        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(studentMock);

        const service = new StudentService(repo);

        const response = new SuccessResponse(studentMock, HTTP_STATUS.OK);

        expect((service.findOne(reqMock))).resolves.toEqual(response);
    });

    it('findOne must return an error response with status 404 if register doesnt exists', async () => {

        let reqMock = {
            params: {
                id: 1,
            }
        } as unknown as Request;

        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);

        const service = new StudentService(repo);

        expect((service.findOne(reqMock))).rejects.toBeInstanceOf(ErrorResponse);
    });

    it('create must create one student', async () => {

        const studentMock: Student = new Student();
        studentMock.name = 'Victor Assis';
        studentMock.ra = 12345;
        studentMock.cpf = 11427845689;
        studentMock.email = 'victorar@unipam.edu.br';

        let reqMock = {
            body: {
                ra: 12345,
                email: 'victorar@unipam.edu.br',
                cpf: 12345678911,
                name: 'Victor Assis'
            }
        } as unknown as Request;

        jest.spyOn(repo, 'create').mockResolvedValueOnce(studentMock as never);

        const service = new StudentService(repo);

        jest.spyOn(dtos, 'createStudentDTO' as never).mockResolvedValueOnce(studentMock as never);

        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined as never);

        jest.spyOn(repo, 'save').mockResolvedValueOnce(studentMock);

        expect((service.create(reqMock))).resolves.toBeInstanceOf(SuccessResponse);
    });

    it('update must update one student', async () => {

        const studentMock: Student = new Student();
        studentMock.name = 'Victor Assis';
        studentMock.ra = 12345;
        studentMock.cpf = 11427845689;
        studentMock.email = 'victorreis@unipam.edu.br';

        let reqMock = {
            params: {
                id: 1,
            },
            body: {
                email: 'victorreis@unipam.edu.br',
            }
        } as unknown as Request;

        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(studentMock as never);
        jest.spyOn(dtos, 'updateStudentDTO' as never).mockResolvedValueOnce(studentMock as never);
        jest.spyOn(repo, 'update').mockResolvedValueOnce(studentMock as never);
        jest.spyOn(repo, 'create').mockResolvedValueOnce(reqMock.body as never);

        const service = new StudentService(repo);

        jest.spyOn(service, 'verifyStudentExistsById').mockResolvedValueOnce(studentMock as never);


        expect((service.update(reqMock))).resolves.toBeInstanceOf(SuccessResponse);
    });

    it('delete must delete one student', async () => {

        const studentMock: Student = new Student();
        studentMock.name = 'Victor Assis';
        studentMock.ra = 12345;
        studentMock.cpf = 11427845689;
        studentMock.email = 'victorreis@unipam.edu.br';

        let reqMock = {
            params: {
                id: 1
            }
        } as unknown as Request;

        jest.spyOn(repo, 'delete').mockResolvedValueOnce(undefined as never);

        const service = new StudentService(repo);

        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(studentMock);

        expect((service.delete(reqMock))).resolves.toBeInstanceOf(SuccessResponse);
    });

})