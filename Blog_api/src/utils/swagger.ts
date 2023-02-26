import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express, Request, Response } from 'express';


const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "API Documentation for Blog API",
            description: "This is Fullstack Blog Project",
            version: '1',
            contact: {
                name: "Thura Nyi",
                email: "thuranyi64@gmail.com"
            }
        },
        servers: [
            {
                url: 'http://localhost:3004'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: [
        './src/routes/*.ts', './src/schema/*.ts'
    ]
};

const specs = swaggerJSDoc(options);

export function swagger(app: Express) {
    
    //swagger server
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(specs));


    //swagger json
    app.get('/doc.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    })

    console.log(`server is running at http://localhost:3004/doc`)
}