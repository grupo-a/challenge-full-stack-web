import { StudentController } from '@/presentation/controllers/student/student-controller'
import { IStudentModel, IAddStudentModel, IAddStudent } from '@/presentation/controllers/student/student-controller-protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helpers'
import { IValidation } from '@/presentation/protocols'

const makeAddStudent = (): IAddStudent => {
  class AddStudentStub implements IAddStudent {
    async add (studentData: IAddStudentModel): Promise<IStudentModel> {
      const fakeStudent = {
        ...studentData,
        id: 'valid_id'
      }

      return await new Promise(resolve => resolve(fakeStudent))
    }
  }
  return new AddStudentStub()
}

const makeFakeStudent = (): IAddStudentModel => ({
  name: 'any_mame',
  email: 'any_email@mail.com',
  ra: 'any_ra',
  cpf: 'any_cpf'
})

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface ISutTypes {
  sut: StudentController
  addStudentStub: IAddStudent
  validationStub: IValidation
}

const makeSut = (): ISutTypes => {
  const addStudentStub = makeAddStudent()
  const validationStub = makeValidation()
  const sut = new StudentController(addStudentStub, validationStub)
  return {
    sut,
    addStudentStub,
    validationStub
  }
}

describe('Signup Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = {
      body: makeFakeStudent()
    }

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should returns 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()

    jest.spyOn(validationStub, 'validate').mockReturnValue(new MissingParamError('any_field'))

    const httpRequest = {
      body: makeFakeStudent()
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
