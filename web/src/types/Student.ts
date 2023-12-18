interface IStudent {
    id: string
    name: string
    email: string
    ra: string
    cpf: string
    createdAt: Date
    updatedAt: Date
}

interface ICreateStudentForm {
    name: string
    email: string
    ra: string
    cpf: string
}

export type { IStudent, ICreateStudentForm }
