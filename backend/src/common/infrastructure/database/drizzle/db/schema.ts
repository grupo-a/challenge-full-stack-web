import { integer, pgTable, varchar, uuid, index } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    cpf: varchar({ length: 11 }).notNull().unique(),
    ra: integer().generatedAlwaysAsIdentity().unique().notNull(),
  },
  (table) => [index("name_idx").on(table.name), index("ra_idx").on(table.ra)]
);
