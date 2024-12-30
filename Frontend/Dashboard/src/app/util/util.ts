import { LatLngExpression } from "leaflet"
import { Car } from "../interfaces/datatypes"

export const parseCar = (input: any) => {
    return {
        id: input.id,
        carName: input.carName,
        brand: input.brand,
        model: input.model,
        price: input.price,
        speed: input.speed,
        country: input.country || input.location,
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

export const parseDate = (input: string, type: number): Date => {
    const date = input.split('-').map(Number)
    const val = type === 2 ? new Date(date[2], date[1] - 1, date[0])
        : new Date(date[0], date[1] - 1, date[2])
    return val
}

export const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const fetchLocationData = async (lat: number, lng: number): Promise<any> => {
    var val
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Could not get location")
            }
            return res.json()
        })
        .then(data => {
            val = data
        })
    return val
}

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}
