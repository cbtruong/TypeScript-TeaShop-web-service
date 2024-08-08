// config 
import 'dotenv/config'

import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import helmet from 'helmet'

import indexRouter from './routes/index_route'

const app = express()

// init middleware
app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// init database
import './dbs/init_mongodb'

// init routes
app.use('/', indexRouter)

// init handler error

export default app
