CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"cpf" varchar(11) NOT NULL,
	"ra" integer GENERATED ALWAYS AS IDENTITY (sequence name "users_ra_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	CONSTRAINT "users_cpf_unique" UNIQUE("cpf"),
	CONSTRAINT "users_ra_unique" UNIQUE("ra")
);
--> statement-breakpoint
CREATE INDEX "name_idx" ON "users" USING btree ("name");--> statement-breakpoint
CREATE INDEX "ra_idx" ON "users" USING btree ("ra");