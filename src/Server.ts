import dotenv from 'dotenv'
import app from './presentation/App'

dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})