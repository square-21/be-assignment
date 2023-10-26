import request from 'supertest';
import {createServer} from './server';
import { prisma, clearTable } from './prisma';

describe('Book API', () => {
    beforeEach(async () => {
        await clearTable("Book")
        await clearTable("Category")
    })
  it('should create a new book', async () => {
    const fastify = await createServer();
    await fastify.ready()

    const dummyBook = await prisma.book.create({
        data: {
            title: 'test',
            author: 'test',
        },
        include: {
            category: true,
        }
    })

    const response = await request(fastify.server).get('/book')
    expect(response.status).toBe(200);
    expect(response.body[0].title).toEqual(dummyBook.title);
    expect(response.body[0].author).toEqual(dummyBook.author);


  });

  it('should get dummy book', async () => {
    const fastify = await createServer();
    await fastify.ready()

    const dummyBook = {
        title: 'test',
        author: 'test',
    }

    const response = await request(fastify.server).post('/book').send(dummyBook)
    expect(response.status).toBe(201);
    expect(response.body.title).toEqual(dummyBook.title);
    expect(response.body.author).toEqual(dummyBook.author);

  })

  it('should delete dummy book', async () => {
    const fastify = await createServer();
    await fastify.ready()

    const dummyBook = await prisma.book.create({
        data: {
            title: 'test',
            author: 'test', },
        })

    const response = await request(fastify.server).delete(`/book/${dummyBook.id}`)
    const books = await prisma.book.findMany()
    expect(books.length).toEqual(0);
  })

  it('should create a new category', async () => {
    const fastify = await createServer();
    await fastify.ready()

    const dummyCategory = {
        name: 'test',
    }

    const response = await request(fastify.server).post('/category').send(dummyCategory)
    expect(response.status).toBe(201);
    expect(response.body.name).toEqual(dummyCategory.name);
  })

  it('should search the correct story', async () => {
    const fastify = await createServer();
    await fastify.ready()

    await prisma.book.create({
        data: {
            title: 'horvath rozi',
            author: 'test21',
            category: {
                create : {
                    name: 'szakacskonyvek',
                }
            }},
        })


        await prisma.book.create({
            data: {
                title: 'fasza konyv',
                author: 'test21',
                category: {
                    create : {
                        name: 'szakkonyvek',
                    }
                }},
            })

    const response = await request(fastify.server).get(`/search?query=szak`)
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(2);

    const response2 = await request(fastify.server).get(`/search?query=horvath`)
    expect(response2.status).toBe(200);
    expect(response2.body.length).toEqual(1);

    const response3 = await request(fastify.server).get(`/search?query=fasza`)
    expect(response3.status).toBe(200);
    expect(response3.body.length).toEqual(1);

    const response4 = await request(fastify.server).get(`/search?query=barmi`)
    expect(response4.status).toBe(200);
    expect(response4.body.length).toEqual(0);
  })
});
