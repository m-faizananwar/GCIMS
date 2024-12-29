import { Car } from "../interfaces/datatypes"

export const parseCar = (input: any) => {
    return {
        carName: input.carName,
        brand: input.brand,
        model: input.model,
        price: input.price,
        speed: input.speed,
        country: input.country,
        city: input.city,
        newCar: input.new_car,
        age: input.buyer_age,
        gender: input.gender,
        dealerLatitude: input.dealer_latitude,
        dealerLongitude: input.dealer_longitude,
        color: input.color,
        registrationDate: input.registration_date || ""
    } as Car
}