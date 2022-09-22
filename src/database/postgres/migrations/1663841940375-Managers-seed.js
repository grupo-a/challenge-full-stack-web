import { hashValue } from '../../../utils/hashBcrypt.js'

const { FIRST_MANAGER_EMAIL: email, FIRST_MANAGER_PASSWORD: password } =
  process.env

const hashedPassword = await hashValue(password)

export class ManagersSeed1663841940375 {
  async up(queryRunner) {
    if (!email || !password) return
    await queryRunner.manager.insert('managers', {
      id: '3b450ee7-b596-47f1-9636-fdfdf9a1bc86',
      email: email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  async down(queryRunner) {
    await queryRunner.manager.delete('managers', {
      id: '3b450ee7-b596-47f1-9636-fdfdf9a1bc86'
    })
  }
}
