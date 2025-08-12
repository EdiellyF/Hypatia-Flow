-- CreateTable
CREATE TABLE "conquistas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "criterio" TEXT NOT NULL,

    CONSTRAINT "conquistas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_conquistas" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "conquistaId" TEXT NOT NULL,
    "dataDesbloqueio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_conquistas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_conquistas_userId_conquistaId_key" ON "user_conquistas"("userId", "conquistaId");

-- AddForeignKey
ALTER TABLE "user_conquistas" ADD CONSTRAINT "user_conquistas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_conquistas" ADD CONSTRAINT "user_conquistas_conquistaId_fkey" FOREIGN KEY ("conquistaId") REFERENCES "conquistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
