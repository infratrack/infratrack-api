/*
  Warnings:

  - The `location` column on the `InfraProblem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "InfraProblem" DROP COLUMN "location",
ADD COLUMN     "location" DOUBLE PRECISION[];
