-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InfraProblem" (
    "id" SERIAL NOT NULL,
    "problemPic" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "idRelator" TEXT NOT NULL,
    "idType" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ProblemType" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProblemUps" (
    "idUser" TEXT NOT NULL,
    "idProblem" INTEGER NOT NULL,

    CONSTRAINT "ProblemUps_pkey" PRIMARY KEY ("idUser","idProblem")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InfraProblem_id_key" ON "InfraProblem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemType_id_key" ON "ProblemType"("id");

-- AddForeignKey
ALTER TABLE "InfraProblem" ADD CONSTRAINT "InfraProblem_idRelator_fkey" FOREIGN KEY ("idRelator") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfraProblem" ADD CONSTRAINT "InfraProblem_idType_fkey" FOREIGN KEY ("idType") REFERENCES "ProblemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemUps" ADD CONSTRAINT "ProblemUps_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemUps" ADD CONSTRAINT "ProblemUps_idProblem_fkey" FOREIGN KEY ("idProblem") REFERENCES "InfraProblem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
