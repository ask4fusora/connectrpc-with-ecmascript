import { cors as connectCors } from "@connectrpc/connect"
import { NestFactory } from "@nestjs/core"
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify"
import { AppModule } from "./app.module.js"

const DEFAULT_PORT = 4000
const FRONTEND_ORIGIN = "http://localhost:3000"

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter()

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter, {
    logger: ["log", "error", "warn", "debug", "verbose"],
    bodyParser: false, // Disables NestJS's native body parser to prevent content-type collision with Connect-Fastify
  })

  app.enableCors({
    origin: FRONTEND_ORIGIN,
    methods: connectCors.allowedMethods as string[],
    allowedHeaders: connectCors.allowedHeaders as string[],
    exposedHeaders: connectCors.exposedHeaders as string[],
    maxAge: 7200,
  })

  const portString = process.env.PORT
  const port = portString ? parseInt(portString, 10) : DEFAULT_PORT

  await app.listen(port, "0.0.0.0")

  const url = await app.getUrl()
  console.log(`\`counter-service\` with NestJS/Fastify initialized. Listening on ${url}`)
}

bootstrap().catch((err) => {
  console.error("Fatal exception during server bootstrap:", err)
  process.exit(1)
})
