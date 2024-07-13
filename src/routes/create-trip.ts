import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'

export async function createTrip(app: FastifyInstance) {
    // async é usado quando envolve operações que podem levar um tempo para serem concluidas por ex: vou precisar acessar o bd ou fazer uma chamada http.
    app.withTypeProvider<ZodTypeProvidererider>().post('/trips', async () => {
        return 'hellou';
    })
}