import mysql, { Pool, RowDataPacket } from "mysql2";
import { LoggerService } from "../../services/LoggerService";
import StudentRepository from "../../domain/interfaces/StudentRepository";
import { Student } from "../../domain/models/Student";
import { AdminUserRepository } from "../../domain/interfaces/AdminUserRepository";
import { AdminUser } from "../../domain/models/AdminUser";

export default class MySQLConnection
  implements StudentRepository, AdminUserRepository
{
  protected client: Pool;
  private loggerService: LoggerService;

  constructor(loggerService: LoggerService) {
    this.loggerService = loggerService;
    this.client = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "",
      connectionLimit: 10,
    });

    this.client.getConnection((err, connection) => {
      if (err) {
        this.loggerService.logError("Error: " + err);
      } else {
        this.loggerService.logInfo("MySQl connected successfully!");
        connection.release();
      }
    });
  }

  async createAdminUser(adminUser: AdminUser): Promise<object | AdminUser> {
    try {
      const insertQuery = `
        INSERT INTO user (name, email, isAdmin) VALUES (?, ?, ?);
      `;

      const selectQuery = `
      SELECT id, name, email, isAdmin FROM user WHERE id = LAST_INSERT_ID();
    `;

      const { name, email, isAdmin } = adminUser;
      const [insertResult] = await this.client
        .promise()
        .execute(insertQuery, [name, email, isAdmin]);
      if (
        insertResult &&
        "affectedRows" in insertResult &&
        insertResult.affectedRows > 0
      ) {
        const [selectRows] = await this.client.promise().query(selectQuery);
        const newUser = selectRows[0];

        this.loggerService.logInfo(
          `User ${newUser.name} created successfully.`
        );
        return newUser;
      }
    } catch (error) {
      this.loggerService.logError("Error creating user admin. " + error);
      throw new Error("Error creating user admin.");
    }
  }

  async listAdminUser(): Promise<object | AdminUser[]> {
    try {
      const query = `
        SELECT  user.name, user.email, user.isAdmin, user.id
        FROM user
        WHERE user.isAdmin = true
      `;

      const [rows] = await this.client.promise().query<RowDataPacket[]>(query);
      this.loggerService.logInfo("Running query to search for admin users");

      if (rows.length === 0) {
        this.loggerService.logInfo("User admin not found");
        return { message: "Users admin not found" };
      }

      const userAdmin: AdminUser[] = rows.map((row: RowDataPacket) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        isAdmin: row.isAdmin,
      }));

      this.loggerService.logInfo("Retrieved user admin.");
      return userAdmin;
    } catch (error) {
      this.loggerService.logError("Error getting user admin. " + error);
      throw new Error("Error getting user admin.");
    }
  }

  async getStudentById(id: string): Promise<Student | object> {
    try {
      const query = `
        SELECT student.ra, student.cpf, user.name, user.email, user.id
        from user
        JOIN student on user_id = user.id
        WHERE user.id = ?
        LIMIT 1;
      `;

      const [rows] = await this.client
        .promise()
        .query<RowDataPacket[]>(query, [id]);

      if (rows.length === 0) {
        return { message: "Student not found" };
      }

      const student: Student = {
        id: rows[0].id,
        name: rows[0].name,
        email: rows[0].email,
        ra: rows[0].ra,
        cpf: rows[0].cpf,
      };

      this.loggerService.logInfo("Retrieved student by ID.");
      return student;
    } catch (error) {
      this.loggerService.logError("Error getting student by ID: " + error);
      throw new Error("Error getting student by ID");
    }
  }

  async getAllStudents(): Promise<Student[]> {
    try {
      const query = `
        SELECT student.ra, student.cpf, user.name, user.email, user.isAdmin, user.id
        from user
        JOIN student on user_id = user.id;
      `;
      const [rows] = await this.client.promise().query<RowDataPacket[]>(query);

      const students: Student[] = rows.map((row: RowDataPacket) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        ra: row.ra,
        cpf: row.cpf,
      }));

      this.loggerService.logInfo("Retrieved all students.");
      return students;
    } catch (error) {
      this.loggerService.logError("Error getting all students: " + error);
      throw new Error("Error getting all students.");
    }
  }

  async createStudent(student: Student): Promise<Student | object> {
    try {
      const { name, email, ra, cpf } = student;
      const query = "SELECT check_cpf_email_exists(?, ?) AS result";
      const [resultRows] = await this.client
        .promise()
        .query(query, [cpf, email]);

      if (resultRows[0].result === 1) {
        this.loggerService.logInfo("ERROR: CPF or email already registered.");
        return { message: "ERROR: CPF or email already registered." };
      }

      const create_student = await this.executeProcedure(
        "create_student_procedure",
        [name, email, ra, cpf],
        "result"
      );

      const selectQuery = `
          SELECT student.ra, student.cpf, user.name, user.email, user.id, user.isAdmin
          from user
          JOIN student on user_id = user.id
          WHERE user.id = LAST_INSERT_ID();
        `;

      if (create_student === "OK") {
        const [selectRows] = await this.client.promise().query(selectQuery);
        const newUser = selectRows[0];
        this.loggerService.logInfo(
          `User student ${newUser.name} created successfully.`
        );
        return newUser;
      }
    } catch (error) {
      this.loggerService.logError("Error creating student: " + error);
      throw new Error("Error creating student.");
    }
  }

  private _getValueOrSQLNull(value: any): any {
    return value !== undefined ? value : null;
  }

  async updateStudent(
    userId: string,
    student: Partial<Student>
  ): Promise<object> {
    try {
      const { name, email } = student;
      const params = [
        this._getValueOrSQLNull(name),
        this._getValueOrSQLNull(email),
        userId,
      ];
      const query = `
          UPDATE user
          SET
              name = COALESCE(?, name),
              email = COALESCE(?, email)
          WHERE
              id = ?;      
      `;
      const [result] = await this.client.promise().execute(query, params);

      const selectQuery = `
          SELECT student.ra, student.cpf, user.name, user.email, user.id
          from user
          JOIN student on user_id = user.id
          WHERE user.id = ?;
        `;

      if (result && "affectedRows" in result && result.affectedRows > 0) {
        this.loggerService.logInfo(
          `User with ID ${userId} updated successfully.`
        );

        const [selectRows] = await this.client.promise().query(selectQuery, [userId]);
        const newUser = selectRows[0];
        this.loggerService.logInfo(
          `User student ${newUser.name} created successfully.`
        );
        return newUser;
      } else {
        this.loggerService.logError(`No user found with ID ${userId}.`);
        return { message: "No user found with this ID." };
      }
    } catch (error) {
      this.loggerService.logError("Error updating user: " + error);
      throw new Error("Error updating user.");
    }
  }

  async deleteStudent(userId: string): Promise<object> {
    try {
      const query = `
        DELETE FROM user
        WHERE
          id = ?;
      `;

      const [result] = await this.client.promise().execute(query, [userId]);

      if (result && "affectedRows" in result && result.affectedRows > 0) {
        this.loggerService.logInfo(
          `User with ID ${userId} deleted successfully.`
        );
        return { message: "User deleted successfully." };
      } else {
        this.loggerService.logError(`No user found with ID ${userId}.`);
        return { message: "No user found with this ID." };
      }
    } catch (error) {
      this.loggerService.logError("Error deleting user: " + error);
      throw new Error("Error deleting user.");
    }
  }

  private async executeProcedure(
    procedureName: string,
    values: any[],
    nameResult: string
  ) {
    try {
      const query = `CALL ${procedureName}(${values
        .map(() => "?")
        .join(", ")}, @${nameResult})`;
      const [result] = await this.client.promise().execute(query, values);
      const [resultRows] = await this.client
        .promise()
        .query(`SELECT @${nameResult} as result`);
      return resultRows[0].result;
    } catch (error) {
      this.loggerService.logError("Error executing procedure: " + error);
      throw new Error("Error executing procedure.");
    }
  }
}
