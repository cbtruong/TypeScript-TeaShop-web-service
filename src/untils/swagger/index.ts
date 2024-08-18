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
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
  },
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
      },
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      cookieAuth: {
        type: 'apikey',
        in: 'cookie',
        name: 'JSESSIONID'
      }
    },
    security: [
      { ApiKeyAuth: [] },
      { BearerAuth: [] },
      { cookieAuth: [] }
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
