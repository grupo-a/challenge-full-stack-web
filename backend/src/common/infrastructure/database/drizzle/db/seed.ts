import "dotenv/config";
import { db } from "./client";
import { studentsTable, usersTable } from "./schema";
import * as bcrypt from "bcryptjs";

const studentsData = [
  {
    name: "Ana Carolina Silva",
    email: "ana.silva@email.com",
    cpf: "12345678901",
  },
  {
    name: "Bruno Oliveira Santos",
    email: "bruno.santos@email.com",
    cpf: "23456789012",
  },
  {
    name: "Carla Fernanda Costa",
    email: "carla.costa@email.com",
    cpf: "34567890123",
  },
  {
    name: "Daniel Pereira Lima",
    email: "daniel.lima@email.com",
    cpf: "45678901234",
  },
  {
    name: "Eduardo Henrique Souza",
    email: "eduardo.souza@email.com",
    cpf: "56789012345",
  },
  {
    name: "Fernanda Rodrigues Alves",
    email: "fernanda.alves@email.com",
    cpf: "67890123456",
  },
  {
    name: "Gabriel Martins Ferreira",
    email: "gabriel.ferreira@email.com",
    cpf: "78901234567",
  },
  {
    name: "Helena Cardoso Ribeiro",
    email: "helena.ribeiro@email.com",
    cpf: "89012345678",
  },
  {
    name: "Igor Nascimento Gomes",
    email: "igor.gomes@email.com",
    cpf: "90123456789",
  },
  {
    name: "Julia Barbosa Mendes",
    email: "julia.mendes@email.com",
    cpf: "01234567890",
  },
  {
    name: "Kelvin Araújo Dias",
    email: "kelvin.dias@email.com",
    cpf: "11234567890",
  },
  {
    name: "Larissa Campos Rocha",
    email: "larissa.rocha@email.com",
    cpf: "21234567890",
  },
  {
    name: "Marcos Vinícius Teixeira",
    email: "marcos.teixeira@email.com",
    cpf: "31234567890",
  },
  {
    name: "Natália Freitas Azevedo",
    email: "natalia.azevedo@email.com",
    cpf: "41234567890",
  },
  {
    name: "Otávio Lopes Carvalho",
    email: "otavio.carvalho@email.com",
    cpf: "51234567890",
  },
  {
    name: "Patrícia Moura Pinto",
    email: "patricia.pinto@email.com",
    cpf: "61234567890",
  },
  {
    name: "Rafael Correia Machado",
    email: "rafael.machado@email.com",
    cpf: "71234567890",
  },
  {
    name: "Sabrina Duarte Nunes",
    email: "sabrina.nunes@email.com",
    cpf: "81234567890",
  },
  {
    name: "Thiago Ramos Castro",
    email: "thiago.castro@email.com",
    cpf: "91234567890",
  },
  {
    name: "Vanessa Pires Monteiro",
    email: "vanessa.monteiro@email.com",
    cpf: "10234567890",
  },
];

async function seed() {
  console.log("🌱 Starting seed...");

  try {
    // Create admin user
    console.log("👤 Creating admin user...");
    await db.delete(usersTable);

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await db
      .insert(usersTable)
      .values({
        email: "admin@admin.com",
        password: hashedPassword,
        role: "ADMIN",
      })
      .returning();

    console.log(`✅ Admin user created: ${adminUser[0]?.email}`);

    console.log("🗑️  Clearing existing students...");
    await db.delete(studentsTable);

    console.log("📝 Inserting students...");
    const insertedStudents = await db
      .insert(studentsTable)
      .values(studentsData)
      .returning();

    console.log(
      `✅ Successfully inserted ${insertedStudents.length} students:`
    );
    insertedStudents.forEach((student) => {
      console.log(
        `   - RA: ${student.ra} | ${student.name} | ${student.email}`
      );
    });

    console.log("\n🎉 Seed completed successfully!");
    console.log("📧 Admin credentials:");
    console.log("   Email: admin@admin.com");
    console.log("   Password: admin123");
  } catch (error) {
    console.error("❌ Error during seed:", error);
    process.exit(1);
  }

  process.exit(0);
}

seed();
