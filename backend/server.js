import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import taskRouter from './routes/tasks.js'

const app = express()
const port = 5000;

app.use(cors())
app.use(express.json())

app.use('/tasks', taskRouter)

app.get('/health', (req, res) => {
    res.send("Backend is healthy on port " + port)
})

app.listen(port, () => {
    console.log(`Ready on port ${port}`)
})