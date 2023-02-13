-- CreateTable
CREATE TABLE "knex_migrations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "batch" INTEGER,
    "migration_time" TIMESTAMPTZ(6),

    CONSTRAINT "knex_migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knex_migrations_lock" (
    "index" SERIAL NOT NULL,
    "is_locked" INTEGER,

    CONSTRAINT "knex_migrations_lock_pkey" PRIMARY KEY ("index")
);
