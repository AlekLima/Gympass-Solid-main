import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll,afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'


describe('Create Check-in (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                latitude: -3.702784,
                longitude: -38.6433024,
            },
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -3.702784,
                longitude: -38.6433024,
            })
        
        expect(response.statusCode).toEqual(201)
    })
}) 