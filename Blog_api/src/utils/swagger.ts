import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { Express, Request, Response, Router } from 'express';


const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "API Documentation for Blog API",
            description: "This is Fullstack Blog Project",
            version: '1',
            // contact: {
            //     name: "Thura Nyi",
            //     email: "thuranyi64@gmail.com"
            // }
        },
        // servers: [
        //     {
        //         url: 'http://localhost:8888'
        //     }
        // ],
        // components: {
        //     securitySchemes: {
        //         bearerAuth: {
        //             type: "http",
        //             scheme: "bearer",
        //             bearerFormat: "JWT"
        //         }
        //     }
        // }
    },
    apis: [
        './src/routes/*.ts', './src/schema/*.ts'
    ]
};

const specs = swaggerJSDoc(options);

export function swagger(app: Express) {
    
   // Serve Swagger UI assets
app.use('/doc', swaggerUi.serve, swaggerUi.setup(specs));

// Serve Swagger UI CSS explicitly
app.get('/doc/swagger-ui.css', (req, res) => {
  res.type('text/css');
  swaggerUi.setup(specs);
});

// Serve Swagger JSON
app.get('/doc.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store'); // Disable caching
  res.send(specs);
});

    console.log(`server is running at http://localhost:8888/doc`);
};