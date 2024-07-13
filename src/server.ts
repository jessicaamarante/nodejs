import { validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod';
import fastify from "fastify";
import { createTrip } from "./routes/create-trip";

const app = fastify()

app.setValidatorCompiler(validatorCompilerlerrCompiler);
app.setSerializerCompiler(serializerCompilererCompiler);

app.register(createTrip)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!')
})