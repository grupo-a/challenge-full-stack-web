interface IUserLoginDTO {
    email: string
    password: string
}

interface ITokenPayload {
    id: string
    email: string
    role: string
}

export { IUserLoginDTO, ITokenPayload }
