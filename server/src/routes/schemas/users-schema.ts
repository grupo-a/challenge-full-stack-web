import { ObjectSchema, object, string } from 'yup'

import { ICreateUserDTO, Role } from '../../adapters/user/create-user-dto.interface'
import { IUserLoginDTO } from '../../adapters/user/user-login-dto.interface'

const createUserBodySchema: ObjectSchema<ICreateUserDTO> = object()
    .shape({
        username: string().required(),
        email: string().email().required(),
        password: string().min(6).required(),
        role: string<Role>(),
    })
    .noUnknown()

const createUserSchema = object({
    body: createUserBodySchema,
})

const userLoginBodySchema: ObjectSchema<IUserLoginDTO> = object()
    .shape({
        email: string().email().required(),
        password: string().min(6).required(),
    })
    .noUnknown()

const userLoginSchema = object().shape({
    body: userLoginBodySchema,
})

export { createUserSchema, userLoginSchema }
