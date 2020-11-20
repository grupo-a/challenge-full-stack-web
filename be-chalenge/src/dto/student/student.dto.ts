import { getRepository } from "typeorm";
import { Student } from "../../entities/student.entity";
import { HTTP_STATUS } from "../../enum/http-status.enum";
import { ErrorResponse } from "../../response/error-response";
import { IStudent } from "../../types/student.type";

export function createStudentDTO(body: any) {
    const student: IStudent = new Student();

    if (!body) {
        return student;
    }

    const fields: any[] = [];
    getRepository(Student).metadata.ownColumns.forEach(property => fields.push(property.propertyName));

    let setted = 0;

    for (let prop in body) {

        if (fields.includes(prop)) {
            ++setted;
            student[prop] = body[prop];
            if (typeof body[prop] != typeof student[prop]) {
                throw new ErrorResponse(`Field ${prop} must be type ${typeof student[prop]}`, HTTP_STATUS.BAD_REQUEST);
            }
        }
    }

    if (setted != fields.length) {
        throw new ErrorResponse('Inform all data correctly', HTTP_STATUS.BAD_REQUEST);
    }

    return student;
}

export function updateStudentDTO(body: any) {
    const student: IStudent = new Student();

    if (!body) {
        return student;
    }

    const fields: any[] = [];
    getRepository(Student).metadata.ownColumns.forEach(property => fields.push(property.propertyName));

    let setted = 0;

    for (let prop in body) {

        if (fields.includes(prop) && prop != 'ra' && prop != 'cpf') {
            ++setted;
            student[prop] = body[prop];
            if (typeof body[prop] != typeof student[prop]) {
                throw new ErrorResponse(`Field ${prop} must be type ${typeof student[prop]}`, HTTP_STATUS.BAD_REQUEST);
            }
        }
    }

    // Exclude ra and cpf fields
    if (setted != (fields.length - 2)) {
        throw new ErrorResponse('Inform all data correctly', HTTP_STATUS.BAD_REQUEST);
    }

    return student;
}