import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod' // use to schema validate
import { prisma } from "../lib/prisma"
import { dayjs } from "../lib/dayjs"
import { getMailClient } from "../lib/mail"
import nodemailer from 'nodemailer'

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/confirm', {
		schema: {
			params: z.object({
				tripId: z.string().uuid(),
			})
		},
	}, async (request, reply) => {
      const { tripId } = request.params // recebo por parametro o trip id

      const trip = await prisma.trip.findUnique({ // consulta se existe alguma viagem para esse tripId
        where: {
          id: tripId,
        },
        include: {
          participants: {
            where: {
              is_owner: false,
            }
          }
        }
      })

      if (!trip) {
        throw new Error('Trip not found.')
      }
      // quando usuario ja confirmou a viagem fazemos um redirecionamento quando ele clicar no link de confirmacao, para fazer esse redirecionamento como to usando o fastfy 
      // eh preciso pegar o segundo parametro da funcao  async (request, reply) que eh o reply
      if (trip.is_confirmed) {
        return reply.redirect(`http://localhost:3000/trips/${tripId}`)
      }
      //se a viagem ainda n foi confirmada...
      await prisma.trip.update({
        where: { id: tripId },
        data: { is_confirmed: true },
      })

      const formattedStartDate = dayjs(trip.starts_at).format('LL')

		  const formattedEndDate = dayjs(trip.ends_at).format('LL')

		  const confirmationLink = `http://localhost:3333/trips/${trip.id}/confirm/ID_DO_PARTICIPANTE`

		  const mail = await getMailClient()

      return { tripId: request.params.tripId }
    }
  )
}