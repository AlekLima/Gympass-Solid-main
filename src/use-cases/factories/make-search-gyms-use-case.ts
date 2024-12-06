import { SearchGymUseCase } from "../search-gyms"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeSearchGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const UseCase = new SearchGymUseCase(gymsRepository)

    return UseCase
}