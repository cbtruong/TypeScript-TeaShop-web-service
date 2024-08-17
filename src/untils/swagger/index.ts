import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TEA SHOP API',
      version: '1.0.0',
    },
    tags: [
      {
        name: 'Auth',
        description: 'Authentication related endpoints',
      },
      {
        name: 'User',
        description: 'User related endpoints'
      },
      {
        name: 'Product',
        description: 'User related endpoints'
      }
    ],
  },
  apis: [
    './src/routes/*.ts',
    './src/routes/auth/*.ts'
  ], // files containing annotations as above
}

const openapiSpecification = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))
}

export default swaggerDocs
