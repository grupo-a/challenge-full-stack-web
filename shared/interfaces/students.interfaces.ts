export interface StudentInterface {
  id: number;
  name: string;
  email: string;
  ra: string;
  cpf: string;
}

export interface CreateStudentDtoInterface
  extends Omit<StudentInterface, "id"> {}

export interface UpdateStudentDtoInterface {
  name?: string;
  email?: string;
}
