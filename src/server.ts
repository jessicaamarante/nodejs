import fastify from "fastify";
import cors from '@fastify/cors'
import { 
  serializerCompiler, 
  validatorCompiler 
} from 'fastify-type-provider-zod';
import { createTrip } from "./routes/create-trip";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipant } from "./routes/confirm-participant";


const app = fastify()

// cors eh usado para definir qual endereço frontend pode acessar o endpoint do app se deixar origin como true ou * - podera ser acessado de qualquer frontend
app.register(cors, {
  origin: '*'
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipant)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!')
})