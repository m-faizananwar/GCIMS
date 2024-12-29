'use client'
import { ClickableMap } from '@/app/components/general/map'
import TextInput from '@/app/components/general/text_input'
import { Car } from '@/app/interfaces/datatypes'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface EditCarProps {
    car?: Car;
}

// Brand, Model, *GENDER*, *REG DATE*, etc.
const EditCar : React.FC<EditCarProps> = ({ car }) => {

    const searchParams = useSearchParams()

    const [brand, setBrand] = useState(car?.brand || "")
    const [model, setModel] = useState(car?.model || "")
    const [age, setAge] = useState(car?.age || 0)
    const [country, setCountry] = useState(car?.country || "")
    const [city, setCity] = useState(car?.city || "")
    const [latitude, setLatitude] = useState(car?.dealerLatitude || 0)
    const [longitude, setLongitude] = useState(car?.dealerLongitude || 0)
    const [color, setColor] = useState(car?.color || "")
    const [newCar, setNewCar] = useState(car?.newCar || true)
    const [regDate, setRegDate] = useState(car?.registrationDate)
    const [price, setPrice] = useState(car?.price || 0)
    const [speed, setSpeed] = useState(car?.speed || 0)

    const [currLocation, setCurrLocation] = useState<[number, number]>()

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrLocation([position.coords.latitude, position.coords.longitude])
                    fetchLocationData(position.coords.latitude, position.coords.longitude)
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                }
            )
        }
    }, [])

    const fetchLocationData = async (lat: number, lng: number) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Could not get location")
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                const address = data.address
                setCity(address.city || address.town || address.county || address.state)
                setCountry(address.country)
            })
    }

    const MapOnClick = (e: L.LeafletMouseEvent) => {
        setLatitude(e.latlng.lat)
        setLongitude(e.latlng.lng)
        fetchLocationData(e.latlng.lat, e.latlng.lng)
    }

    return (
        <div className="flex flex-col gap-3 overflow-y-auto w-full p-7">
            <div className="text-4xl font-bold">{'Add Car'}</div>
            <div className="flex gap-3 justify-between align-middle">
                <div className="bg-white basis-1/2 w-full flex flex-col gap-3">
                    <TextInput
                        type='text'
                        placeholder='Enter Brand/Make'
                        value={brand || ""}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                    <TextInput
                        type='text'
                        placeholder='City: Click on Map'
                        value={city || ""}
                        disabled={true}
                    />
                </div>
                <div className="bg-white basis-1/2 w-full flex flex-col gap-3">
                    <TextInput
                        type='text'
                        placeholder='Enter Model'
                        value={model || ""}
                        onChange={(e) => setModel(e.target.value)}
                    />
                    <TextInput
                        type='text'
                        placeholder='Country: Click on Map'
                        value={country || ""}
                        disabled={true}
                    />
                </div>
            </div>

            <div className="w-full h-[400px]">
                <ClickableMap
                    onClick={MapOnClick} 
                    center={(latitude && longitude) ? [latitude, longitude] : currLocation}
                    position={(latitude && longitude) ? [latitude, longitude] : currLocation}
                />
            </div>
        </div>
    )
}

export default EditCar
