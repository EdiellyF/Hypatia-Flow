/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `disciplinas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "disciplinas_nome_key" ON "disciplinas"("nome");
