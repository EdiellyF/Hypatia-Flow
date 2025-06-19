-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplinas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "idUsuarioCriador" TEXT NOT NULL,

    CONSTRAINT "disciplinas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assunto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Assunto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessoes_estudo" (
    "id" TEXT NOT NULL,
    "dataHoraInicio" TIMESTAMP(3) NOT NULL,
    "dataHoraFim" TIMESTAMP(3) NOT NULL,
    "observacoes" TEXT,
    "idUsuario" TEXT NOT NULL,
    "idDisciplina" TEXT NOT NULL,

    CONSTRAINT "sessoes_estudo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessao_assunto" (
    "idSessaoEstudo" TEXT NOT NULL,
    "idAssunto" TEXT NOT NULL,

    CONSTRAINT "sessao_assunto_pkey" PRIMARY KEY ("idSessaoEstudo","idAssunto")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "disciplinas" ADD CONSTRAINT "disciplinas_idUsuarioCriador_fkey" FOREIGN KEY ("idUsuarioCriador") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessoes_estudo" ADD CONSTRAINT "sessoes_estudo_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessoes_estudo" ADD CONSTRAINT "sessoes_estudo_idDisciplina_fkey" FOREIGN KEY ("idDisciplina") REFERENCES "disciplinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessao_assunto" ADD CONSTRAINT "sessao_assunto_idSessaoEstudo_fkey" FOREIGN KEY ("idSessaoEstudo") REFERENCES "sessoes_estudo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessao_assunto" ADD CONSTRAINT "sessao_assunto_idAssunto_fkey" FOREIGN KEY ("idAssunto") REFERENCES "Assunto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
