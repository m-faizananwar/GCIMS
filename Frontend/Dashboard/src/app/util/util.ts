import { Car } from "../interfaces/datatypes"

export const parseCar = (input: any) => {
    return {
        carName: input.carName,
        brand: input.brand,
        model: input.model,
        price: input.price,
        topSpeed: input.speed,
        country: input.location,
        gender: input.gender,
        city: input.city,
        new: input.new_car,
        buyerAge: input.buyer_age,
        dealerLatitude: input.dealer_latitude,
        dealerLongitude: input.dealer_longitude,
        colour: input.color
    } as Car
}