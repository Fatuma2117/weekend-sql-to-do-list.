CREATE TABLE "weekend-to-do-app" (
	"id" SERIAL PRIMARY KEY,
    "task" VARCHAR(200),
	"priority" VARCHAR(200),
	"notes" VARCHAR(200),
	"complete_by_date" VARCHAR(200)
);

ALTER TABLE "weekend-to-do-app"
ADD "Done"  BOOLEAN DEFAULT FALSE;