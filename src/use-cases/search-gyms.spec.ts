import { expect, describe, it, beforeEach, } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'


let gymsRepository: inMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(async () => {
         gymsRepository = new inMemoryGymsRepository()
         sut = new SearchGymUseCase(gymsRepository)
    })

    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -3.702784,
            longitude: -38.6433024,
            })

        await gymsRepository.create({
            title: 'TypeScript Gym',
            description: null,
            phone: null,
            latitude: -3.702784,
            longitude: -38.6433024,
            })

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 1,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
    })

    it('should be able to fetch  paginated gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `JavaScript Gym ${i}`,
                description: null,
                phone: null,
                latitude: -3.702784,
                longitude: -38.6433024,
            })
        }
  

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym 21' }),
            expect.objectContaining({ title: 'JavaScript Gym 22' })
        ])
    })   
})
        
        

       
