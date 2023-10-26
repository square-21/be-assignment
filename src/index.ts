import { PrismaClient } from '@prisma/client'
import { createServer } from './server'

const main = async () => {
    const fastify = await createServer()
    try {
        return await fastify.listen({ port: 3000, })
      } catch (err) {
        fastify.log.error(err)
        process.exit(1)
      }
}


main()