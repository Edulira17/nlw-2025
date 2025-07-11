import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from 'fastify-type-provider-zod'

// biome-ignore lint/correctness/noUnusedImports: only used in dev
import { sql } from "./db/connection.ts";

import fastifyCors from "@fastify/cors";
import { env } from "./env.ts";
import { getRoomsRoute } from "./http/get-rooms.ts";

// permite que o Fastify “entenda” os esquemas do Zod e use esses tipos para validar auto, fornecer tipagem auto no typescript
const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173"
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return "OK"
})

app.register(getRoomsRoute)

app.listen({ port: env.PORT }).then(() => {
  // biome-ignore lint/suspicious/noConsole: only used in dev
  console.log("HTTP server is running")
})