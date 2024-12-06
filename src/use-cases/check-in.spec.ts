import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: inMemoryCheckInsRepository
let gymsRepository: inMemoryGymsRepository
let sut: CheckInUseCase


describe('Check-in Use Case', () => {
    beforeEach(async () => {
         checkInsRepository = new inMemoryCheckInsRepository()
         gymsRepository = new inMemoryGymsRepository
         sut = new CheckInUseCase(checkInsRepository, gymsRepository)
        
        await gymsRepository.create({
            id: 'gym-01',
            title: 'Acad massa',
            description: '',
            phone: '',
            latitude: -3.702784,
            longitude: -38.6433024,
        })

         vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check-in', async () => {
        

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -3.702784,
            userLongitude: -38.6433024,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

         await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -3.702784,
            userLongitude: -38.6433024,
        })

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -3.702784,
            userLongitude: -38.6433024,
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })
    
    it('should be able to check in twice but in diferent days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

         await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -3.702784,
            userLongitude: -38.6433024,
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
        
        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -3.702784,
            userLongitude: -38.6433024,
        })

        expect(checkIn.id).toEqual(expect.any(String))
       
    })

    it('should not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Acad massa',
            description: '',
            phone: '',
            latitude: new Decimal(-3.7816031),
            longitude: new Decimal(-38.9012673),
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
        
       
        expect(() => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })).rejects.toBeInstanceOf(MaxDistanceError)
       
    })
    
})