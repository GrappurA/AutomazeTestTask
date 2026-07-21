import express from 'express'
import prisma from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const { status, group } = req.query;

        //possible: sort by front filters here
        const queryOptions = {}

        if (status === 'done') queryOptions.where = { is_done: true }
        if (status === 'undone') queryOptions.where = { is_done: false }

        const tasks = await prisma.todoItem.findMany(queryOptions);
        res.json(tasks)
    }
    catch (error) {
        res.status(500).json(`Error fetching tasks ${error}`)
        console.log(`Error fetching tasks`)
    }
})

router.get('/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const tasks = await prisma.todoItem.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
        res.status(200).json(tasks)
    } catch (error) {
        console.log(error)
    }

})

router.post('/', async (req, res) => {
    const { title, isDone, priority, position, listId, userId } = req.body;
    const newTask = await prisma.todoItem.create({
        data: {
            title, isDone, priority, position, listId, userId
        }
    })
    res.status(201).json(newTask)
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params
    const { isDone, priority, position } = req.body

    const updatedTask = await prisma.todoItem.update({
        where: { id },
        data: {
            ...(isDone !== undefined && { isDone }),
            ...(priority !== undefined && { priority: parseInt(priority) }),
            ...(position !== undefined && { position: parseInt(position) }),
        }
    })

    res.status(200).json(updatedTask)
})

router.delete('/:id', async (req, res) => {
    const idToDelete = req.params;

    const taskToDelete = await prism.todoItem.delete({
        where: { idToDelete }
    })

    res.status(200).json({ message: 'Task deleted successfully' })
})

export default router;