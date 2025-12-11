CREATE TABLE "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"cpf" varchar(11) NOT NULL,
	"ra" integer GENERATED ALWAYS AS IDENTITY (sequence name "students_ra_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	CONSTRAINT "students_email_unique" UNIQUE("email"),
	CONSTRAINT "students_cpf_unique" UNIQUE("cpf"),
	CONSTRAINT "students_ra_unique" UNIQUE("ra")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'admin' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "name_idx" ON "students" USING btree ("name");--> statement-breakpoint
CREATE INDEX "ra_idx" ON "students" USING btree ("ra");