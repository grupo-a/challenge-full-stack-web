import { ObjectSchema, object, string } from 'yup'

import { ICreateStudentDTO } from '../../adapters/student/create-student-dto.interface'
import { IUpdateStudentDTO } from '../../adapters/student/update-student-dto.interface'
import { ITypedRequest } from '../../utils/typed-request.interface'

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

const createStudentBodySchema: ObjectSchema<ICreateStudentDTO> = object()
    .shape({
        name: string().required(),
        email: string().email().required(),
        ra: string().required(),
        cpf: string().matches(cpfRegex, 'The CPF must be valid in the following format: XXX.XXX.XXX-XX').required(),
    })
    .noUnknown()

const createStudentSchema: ObjectSchema<ITypedRequest> = object({
    body: createStudentBodySchema,
    params: object(),
    query: object(),
})

const deleteStudentSchema: ObjectSchema<ITypedRequest> = object({
    body: object(),
    params: object().shape({
        id: string().required(),
    }),
    query: object(),
})

const getStudentSchema: ObjectSchema<ITypedRequest> = object({
    body: object(),
    params: object().shape({
        id: string().required(),
    }),
    query: object(),
})

const listStudentsSchema: ObjectSchema<ITypedRequest> = object({
    body: object(),
    params: object(),
    query: object(),
})

const updateStudentBodySchema: ObjectSchema<Omit<IUpdateStudentDTO, 'id'>> = object()
    .shape({
        name: string().required(),
        email: string().email().required(),
    })
    .noUnknown()

const updateStudentSchema: ObjectSchema<ITypedRequest> = object({
    body: updateStudentBodySchema,
    params: object().shape({
        id: string().required(),
    }),
    query: object(),
})

export { createStudentSchema, deleteStudentSchema, getStudentSchema, listStudentsSchema, updateStudentSchema }
