import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerRegisterModules = [];

export const createSwaggerDoc = async (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(<string>process.env.npm_package_name)
    .setDescription(
      'Sistema de gestão de grupos, cliente e processos de advogados.',
    )
    .setVersion(<string>process.env.npm_package_version)
    .addServer('http://localhost:{port}', 'Desenvolvimento', {
      port: { default: 8080 },
    })
    .addServer('http://localhost:8080', 'Homologação')
    .addSecurity('Basic', {
      type: 'apiKey',
      name: 'authorization',
      in: 'header',
    })
    .addBearerAuth(
      {
        type: 'http',
        name: 'authorization',
        in: 'header',
      },
      'Bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: swaggerRegisterModules,
  });

  return SwaggerModule.setup('/docs', app, document);
};
