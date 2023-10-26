import { PrismaClient } from "@prisma/client";


export const prisma = new PrismaClient()

export const truncateTable = async (tablename: string) => {
    if (tablename === undefined || tablename === '_prisma_migrations') {
        return
    }
    try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`)
    } catch (error) {
        console.error({ error })
    }
}

export const truncate = async () => {
    const records: Record<'tablename', string>[] = await prisma.$queryRawUnsafe(
        `SELECT tablename FROM pg_tables WHERE schemaname = 'public'`,
    )
    for await (const record of records) {
        await truncateTable(record.tablename)
    }
}
export const clearTable = async (tablename: string) => {
    if (tablename === undefined) {
        return
    }
    try {
        // Use DELETE instead of TRUNCATE for SQLite
        await prisma.$executeRawUnsafe(`DELETE FROM "${tablename}";`)
    } catch (error) {
        console.error({ error })
    }
}

