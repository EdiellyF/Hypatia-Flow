-- DropForeignKey
ALTER TABLE "sessoes_estudo" DROP CONSTRAINT "sessoes_estudo_idDisciplina_fkey";

-- AddForeignKey
ALTER TABLE "sessoes_estudo" ADD CONSTRAINT "sessoes_estudo_idDisciplina_fkey" FOREIGN KEY ("idDisciplina") REFERENCES "disciplinas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
