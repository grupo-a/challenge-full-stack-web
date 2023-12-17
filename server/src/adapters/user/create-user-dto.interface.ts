type Role = 'USER' | 'ADMIN'

interface ICreateUserDTO {
    email: string
    username: string
    password: string
    role?: Role
}

export type { ICreateUserDTO, Role }
