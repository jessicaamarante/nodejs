import fastify from "fastify";
import { prisma } from "./lib/prisma";
const app = fastify()

// await eh usado pois precisa aguardar a função create finalizar para executar o proximo codigo, e async eh obg quando usamos await 
app.get('/cadastrar', async () => {
  await prisma.trip.create({
    data: {
      destination: "São Paulo",
      starts_at: new Date(),
      ends_at: new Date(),
    },
  })

  return "Registro cadastrado com sucesso!"
})

app.get('/listar', async () => {
  const trips = await prisma.trip.findMany()

  return trips
})

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!')
})