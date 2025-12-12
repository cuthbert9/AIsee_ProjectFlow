ALTER TABLE "projects" ALTER COLUMN "keywords" SET DATA TYPE text[]         USING ARRAY["keywords"]::text[];--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "usecases" SET DATA TYPE text[]         USING ARRAY["usecases"]::text[];--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "datasources" SET DATA TYPE text []     USING ARRAY["datasources"]::text[];--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "socials" SET DATA TYPE text[]          USING ARRAY["socials"]::text[];--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "dashboardMetrics" SET DATA TYPE text[]  USING ARRAY["dashboardMetrics"]::text[];--> statement-breakpoint



