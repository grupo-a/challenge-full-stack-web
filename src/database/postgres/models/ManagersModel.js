import { EntitySchema } from 'typeorm'

const Managers = new EntitySchema({
  name: 'Managers',
  tableName: 'managers',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid'
    },
    email: {
      type: String,
      nullable: false,
      unique: true
    },
    password: {
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

export default Managers
