import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        title: 'A+ Educação - Challenge Fullstack',
        description: 'Application for student registration',
    },
    host: `localhost:${process.env.PORT ?? 3333}`,
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.ts']

swaggerAutogen()(outputFile, endpointsFiles, doc)
