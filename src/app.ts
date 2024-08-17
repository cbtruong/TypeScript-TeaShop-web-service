// config 
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import compression from 'compression'
import helmet from 'helmet'
import session from 'express-session'
import indexRouter from './routes/index_route'
import passport from 'passport'

const app = express()


// init middleware
app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false, }));
app.use(passport.authenticate('session'));

// init database
import './dbs/init_mongodb'
import swaggerDocs from './untils/swagger'

// init swager
swaggerDocs(app)

// init routes
app.use('/', indexRouter)

// init handler error
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not found') as { status?: number, message: string };
  error.status = 404;
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Server Error',
  });
});

export default app
