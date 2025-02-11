const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// introduce and use the router module
//mount it to this directory

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

//Server frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get('*', (req, res) => res.sendFile(
    path.resolve(__dirname, '../frontend/dist', 'index.html')))
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port${port}`))

