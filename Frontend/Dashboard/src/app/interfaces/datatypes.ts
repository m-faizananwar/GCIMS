export interface Car {
    carName?: string,
    brand: string,
    model: string,
    age: number;
    gender?: string;
    country: string;
    city: string;
    dealerLatitude: number;
    dealerLongitude: number;
    color: string;
    newCar: boolean;
    registrationDate: Date;
    price: number;
    speed: number;
}

export interface updatedCar extends Car {
    newBrand: string;
    newModel: string;
}