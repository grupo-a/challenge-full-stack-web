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

export type { IUser }
