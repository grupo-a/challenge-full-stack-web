import { EntitySchema } from 'typeorm'

const Students = new EntitySchema({
  name: 'Students',
  tableName: 'students',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid'
    },
    email: {
      type: String,
      nullable: false
    },
    ra: {
      type: String,
      nullable: false,
      unique: true
    },
    cpf: {
      type: String,
      nullable: false
    },
    createdAt: {
      type: Date,
      nullable: false,
      name: 'created_at'
    },
    updatedAt: {
      type: Date,
      nullable: false,
      name: 'updated_at'
    }
  }
})

export default Students
