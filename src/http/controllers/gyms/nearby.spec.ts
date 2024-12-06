import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll,afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'


describe('List Nearby Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should be able to list nearby gyms', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Gym',
                description: 'Some description.',
                phone: '119234234234',
                latitude: -3.702784,
                longitude: -38.6433024,
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'TypeScript Gym',
                description: 'Some description.',
                phone: '119234234234',
                latitude: -3.4958054,
                longitude: -39.1482525,
            })

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude:  -3.702784,
                longitude: -38.6433024,
            })
            .set('Authorization', `Bearer ${token}`)
            .send()
        
        expect(response.statusCode).toEqual(201)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title:'JavaScript Gym',
            })
        ])
    })
}) 