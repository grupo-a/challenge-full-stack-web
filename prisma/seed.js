/* eslint-disable no-console */
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const userData = [
	{
		name: "Renata",
		email: "renata@donnes.com.br",
		password: "$2a$10$i6E0rCu9b0s2aZy2zYBwrOqcQT2oGAcUb3ja0Pd0uAjDE8m5Ax4L",
		isAdmin: true,
	},
	{
		name: "Jesse Kalil",
		email: "jessekalilms@outlook.com",
		password: "$2a$10$i6E0rCu9b0s2aZy2zYBwrOqcQT2oGAcUb3ja0Pd0uAjDE8m5Ax4L",
		isAdmin: true,
	},
]

async function main() {
	console.log(`Start seeding ...`)
	for (const u of userData) {
		const user = await prisma.user.create({
			data: u,
		})
		console.log(`Created user with id: ${user.id}`)
	}
	console.log(`Seeding finished.`)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
