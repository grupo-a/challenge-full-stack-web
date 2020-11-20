import { ErrorService } from '../error/error.service';
import { StudentService } from "./student.service";
import { Request, Response } from 'express';
import { Student } from '../../entities/student.entity';
import { getRepository } from 'typeorm';
import { Controller } from '../../decorators/router/controller.decorator';
import { Delete, Get, Patch, Post } from '../../decorators/router/route.decorator';

@Controller('/students')
export class StudentController {

    private service: StudentService;

    constructor() {
        this.service = new StudentService(getRepository(Student));
    }

    @Get('/')
    async findAll(req: Request, res: Response) {
        try {
            const response = await this.service.findAll(req.query);
            return res.status(response.status).send(response.data);
        } catch (error) {
            return ErrorService.handle(res, error);
        }
    }

    @Get('/:id')
    async findOne(req: Request, res: Response) {
        try {
            const response = await this.service.findOne(req);
            return res.status(response.status).send(response.data);
        } catch (error) {
            return ErrorService.handle(res, error);
        }
    }

    @Post('/')
    async create(req: Request, res: Response) {
        try {
            const response = await this.service.create(req);
            return res.status(response.status).send(response.data);
        } catch (error) {
            return ErrorService.handle(res, error);
        }
    }

    @Patch('/:id')
    async update(req: Request, res: Response) {
        try {
            const response = await this.service.update(req);
            return res.status(response.status).send(response.data);
        } catch (error) {
            return ErrorService.handle(res, error);
        }
    }

    @Delete('/:id')
    async delete(req: Request, res: Response) {
        try {
            const response = await this.service.delete(req);
            return res.status(response.status).send(response.data);
        } catch (error) {
            return ErrorService.handle(res, error);
        }
    }
}