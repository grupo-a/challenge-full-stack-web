import express from 'express'

const app = express()

app.get('/', (req, res) => {
    return res.status(200).send('OK')
})

export default app