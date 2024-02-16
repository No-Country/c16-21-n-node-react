import { __mainDirname } from './utils.js';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Huellap',
      description: 'App de búsqueda de mascotas perdidas',
    },
  },
  apis: [`${__mainDirname}/docs/*.yaml`],
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);
