'use strict'

const options = require('../../options/category')
const response = require('../../json/response')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// define category routes

module.exports = async function (fastify, opts) {

  // get list all categories
  fastify.get('/', async function (request, reply) {

    const categories = await prisma.category.findMany({
      include: { childs: true, parent: true },
      orderBy: { id: 'asc' }
    })
    reply.send(response(1, 200, null, "Categories Sent", categories))
  })

  // get category by id
  fastify.get('/:id', async function (request, reply) {

    const { id } = request.params

    const categories = await prisma.category.findUnique({
      where: { id: Number(id) },
      include: { childs: true, parent: true }
    })
    reply.send(response(1, 200, null, "Category Sent", categories))
  })

  // add new category
  fastify.post('/', options.addOptions, async function (request, reply) {

    const {name, parent} = request.body

    const data = {
      title: name,
      parentId: parent
    }

    await prisma.category.create({data: data})

    const categories = await prisma.category.findMany({
      include: { childs: true, parent: true },
      orderBy: { id: 'asc' }
    })
    reply.send(response(1, 200, null, "Categoriy Created", categories))
  })

  // update category by id
  fastify.put('/:id', options.updateOptions, async function (request, reply) {
    
    const {id} = request.params
    const {name, parent} = request.body

    const data = {
      parentId: parent
    }

    if( name ) data.title = name
    if( parent === undefined) data.parent = { disconnect: true }

    await prisma.category.update({
      where: { id: Number(id) },
      data: data,
    })

    const categories = await prisma.category.findMany({
      include: { childs: true, parent: true },
      orderBy: { id: 'asc' }
    })
    reply.send(response(1, 200, null, "Categoriy Updated", categories))
  })

  // deelete category by id
  fastify.delete('/:id', async function (request, reply) {
    
    const {id} = request.params

    await prisma.category.delete({
      where: { id: Number(id) }
    })

    const categories = await prisma.category.findMany({
      include: { childs: true, parent: true },
      orderBy: { id: 'asc' }
    })
    reply.send(response(1, 200, null, "Categoriy Removed", categories))
  })
}