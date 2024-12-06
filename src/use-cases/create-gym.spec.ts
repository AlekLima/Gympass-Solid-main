import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'


let gymsRepository: inMemoryGymsRepository
let sut: CreateGymUseCase


describe('Create Gym Use Case', () => {
    beforeEach(() => {
        gymsRepository = new inMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)

    })

    it('should be able to create gym', async () => {
        
        const { gym } = await sut.execute({
           title: 'acad show',
           description: null,
           phone: null,
           latitude: -3.702784,
           longitude: -38.6433024,
        })

       

        expect(gym.id).toEqual(expect.any(String))
    })


})