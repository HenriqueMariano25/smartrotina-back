-- CreateTable
CREATE TABLE "residencia" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ehFavorito" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletadoEm" TIMESTAMP(3),
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "residencia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "residencia" ADD CONSTRAINT "residencia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
