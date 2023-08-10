/*
  Warnings:

  - You are about to drop the column `idType` on the `InfraProblem` table. All the data in the column will be lost.
  - The `location` column on the `InfraProblem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ProblemType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `problemTitle` to the `InfraProblem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `InfraProblem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InfraProblem" DROP CONSTRAINT "InfraProblem_idType_fkey";

-- AlterTable
ALTER TABLE "InfraProblem" DROP COLUMN "idType",
ADD COLUMN     "problemTitle" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "location",
ADD COLUMN     "location" TEXT[];

-- DropTable
DROP TABLE "ProblemType";
