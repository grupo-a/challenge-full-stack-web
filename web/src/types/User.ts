type Role = 'USER' | 'ADMIN'

interface IUser {
    id: string
    email: string
    username: string
    password: string
    role: Role
    createdAt: Date
    updatedAt: Date
}

interface IUserLogin {
    email: string
    password: string
}

interface ICreateUser {
    email: string
    username: string
    password: string
    role?: Role
}

export type { IUser, IUserLogin, ICreateUser }
