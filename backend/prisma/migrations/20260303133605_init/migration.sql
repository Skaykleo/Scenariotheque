-- CreateTable
CREATE TABLE "Scenario" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "datePublication" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Scenario_pkey" PRIMARY KEY ("id")
);
