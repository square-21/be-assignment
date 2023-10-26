import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "../prisma"

export const getBooks = async  (request: FastifyRequest, reply: FastifyReply) => {
    const books = await prisma.book.findMany({
        include: {
            category: true,
        }
    })

    return reply.status(200).send(books)
}

export const createBooks = async (request: FastifyRequest, reply: FastifyReply) => {
    const { title, author } = request.body as { title: string, author: string }
}

export const getBookById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { bookId } = request.params as { bookId: string }
}

export const deleteBook = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string }
}

export const createCategory = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name } = request.body as { name: string }
}

export const getCategories = async (request: FastifyRequest, reply: FastifyReply) => {
}

export const searchBook = async (request: FastifyRequest, reply: FastifyReply) => {
    const { query } = request.query as { query: string }
}