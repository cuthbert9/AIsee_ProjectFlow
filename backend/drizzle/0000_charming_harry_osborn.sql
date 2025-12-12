CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"keywords" text NOT NULL,
	"priority" text NOT NULL,
	"usecases" text NOT NULL,
	"role" text NOT NULL,
	"datasources" text NOT NULL,
	"socials" text NOT NULL,
	"dashboardMetrics" text NOT NULL
);
