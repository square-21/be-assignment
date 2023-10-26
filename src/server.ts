import Fastify from 'fastify'
import { getBooks, createBooks,    getBookById,
    deleteBook,
    createCategory,
    searchBook
} from './book/service'

export const createServer = async () => {
    const fastify = Fastify({
      logger: true
    })

    fastify.get('/book', getBooks)
    fastify.post('/book', createBooks)
    fastify.get('/book/:bookId', getBookById)
    fastify.delete('/book/:id', deleteBook)
    fastify.post('/category', createCategory)
    fastify.get('/search', searchBook)

    return fastify
}