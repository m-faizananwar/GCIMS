'use client'
import CustomButton from '@/app/components/general/custom_button'
import { ClickableMap } from '@/app/components/general/map/map'
import TextInput from '@/app/components/general/text_input'
import { Car } from '@/app/interfaces/datatypes'
import { fetchLocationData, formatDateForInput, parseDate, parseJson } from '@/app/util/util'
import Form from 'next/form'
import { redirect, RedirectType, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaSave, FaTrash } from 'react-icons/fa'
import { HashLoader } from 'react-spinners'

// Brand, Model, *GENDER*, *REG DATE*, etc.
const EditCar = () => {

    const searchParams = useSearchParams()
    const router = useRouter()

    const car = searchParams.get('car') ? (JSON.parse(decodeURIComponent(searchParams.get('car') as string))) : undefined

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const [brand, setBrand] = useState(car?.brand || "")
    const [model, setModel] = useState(car?.model || "")
    const [age, setAge] = useState(car?.age || 0)
    const [country, setCountry] = useState(car?.country || "")
    const [city, setCity] = useState(car?.city || "")
    const [latitude, setLatitude] = useState(car?.dealerLatitude || 0)
    const [longitude, setLongitude] = useState(car?.dealerLongitude || 0)
    const [color, setColor] = useState(car?.color || "")
    const [newCar, setNewCar] = useState<boolean>(car ? car.newCar : true)
    const [regDate, setRegDate] = useState<Date>(car ? parseDate(car?.registrationDate, 2) : new Date())
    const [price, setPrice] = useState(car?.price || 0)
    const [speed, setSpeed] = useState(car?.speed || 0)

    const [currLocation, setCurrLocation] = useState<[number, number]>()

    useEffect(() => {
        if (!latitude && !longitude && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrLocation([position.coords.latitude, position.coords.longitude])
                    getLocationData(position.coords.latitude, position.coords.longitude)
                    !latitude && setLatitude(position.coords.latitude)
                    !longitude && setLongitude(position.coords.longitude)
                }
            )
        }
    }, [])

    const getLocationData = (lat: number, lng: number) => {
        fetchLocationData(lat, lng)
            .then(data => {
                console.log(data)
                if (data && data.address) {
                    const address = data.address
                    setCity(address.city || address.town || address.county || address.state)
                    setCountry(address.country)
                }
            })
    }

    const MapOnClick = (e: L.LeafletMouseEvent) => {
        setLatitude(e.latlng.lat)
        setLongitude(e.latlng.lng)
        getLocationData(e.latlng.lat, e.latlng.lng)
    }

    const onFormSubmit = () => {
        var carData = {
            ...(car && { id: car.id }),
            brand: car ? car.brand : brand.toString().capitalizeFirstLetter(),
            model: car ? car.model : model.toString().capitalizeFirstLetter(),
            gender: "Male",
            buyer_age: age,
            country: country.toString().capitalizeFirstLetter(),
            city: city.toString().capitalizeFirstLetter(),
            dealer_latitude: latitude,
            dealer_longitude: longitude,
            color: color.toString().capitalizeFirstLetter(),
            new_car: newCar,
            registration_date: `${regDate?.getDate().toString().padStart(2, '0')}-${(regDate?.getMonth() + 1).toString().padStart(2, '0')}-${regDate?.getFullYear().toString().padStart(4, '0')}`,
            price: Number(price),
            speed: Number(speed),
            new_make: brand.toString().capitalizeFirstLetter(),
            new_model: model.toString().capitalizeFirstLetter(),
        }

        if (car) {
            setLoading(true)
            fetch(
                '/api/cars',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(carData)
                }
            ).then(res => {
                if (!res.ok) {
                    throw new Error("Could not update data!")
                }
                return res.json()
            }).then(data => {
                setLoading(false);
                router.replace('/dashboard')
            }).catch(e => {
                setLoading(false)
                console.error(e)
                setError(`Error: ${e.message}`)
            })
        } else {
            setLoading(true)
            fetch(
                "/api/cars",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(carData),
                }
            )
                .then(res => {
                    if (!res.ok)
                        res.json().then((error) => { throw new Error(error.error) })
                    else return res.json()
                })
                .then(data => {
                    if (data) {
                        setLoading(false)
                        router.replace('/dashboard')
                    }
                })
                .catch(e => {
                    setLoading(false)
                    console.error(e)
                    setError(`Error: ${e.message}`)
                })
        }
    }

    const handleOnDeleteClick = () => {
        if (car) {
            var carData = parseJson(car)
            setLoading(true)
            fetch(
                "/api/cars",
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: carData,
                }
            )
                .then(res => {
                    if (!res.ok)
                        res.json().then((error) => { throw new Error(error.error) })
                    else return res.json()
                })
                .then(data => {
                    if (data) {
                        setLoading(false)
                        router.replace('/dashboard')
                    }
                })
                .catch(e => {
                    setLoading(false)
                    console.error(e)
                    setError(`Error: ${e.message}`)
                })
        }
    }

    if (loading) return (
        <div className="w-full flex h-screen justify-center text-center align-middle items-center">
            <HashLoader color='#171502' className='mx-auto my-auto' />
        </div>
    )

    return (
        <Form action={onFormSubmit} className="flex flex-col gap-6 overflow-y-auto w-full p-7">
            <div className={`bg-red-400 ${error ? 'block' : 'hidden'} text-black rounded-md p-3 transition-all`}>{error && error}</div>
            <div className="text-4xl font-bold">{'Add Car'}</div>
            <div className="flex gap-3 justify-between align-middle">
                <div className="bg-white basis-1/2 w-full flex flex-col gap-6">
                    <TextInput
                        type='text'
                        placeholder='Enter Brand/Make'
                        value={brand || ""}
                        onChange={(e) => setBrand(e.target.value)}
                        required={true}
                    />
                    <TextInput
                        type='text'
                        placeholder='City: Click on Map'
                        value={city || ""}
                        disabled={true}
                        required={true}
                    />
                    <TextInput
                        type='number'
                        placeholder='Enter Price'
                        value={price || ""}
                        onChange={(e) => setPrice(e.target.value)}
                        required={true}
                    />
                    <TextInput
                        type='text'
                        placeholder='Enter Color'
                        value={color || ""}
                        onChange={(e) => setColor(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="bg-white basis-1/2 w-full flex flex-col gap-6">
                    <TextInput
                        type='text'
                        placeholder='Enter Model'
                        value={model || ""}
                        onChange={(e) => setModel(e.target.value)}
                        required={true}
                    />
                    <TextInput
                        type='text'
                        placeholder='Country: Click on Map'
                        value={country || ""}
                        disabled={true}
                        required={true}
                    />
                    <TextInput
                        type='number'
                        placeholder='Enter Speed'
                        value={speed || ""}
                        onChange={(e) => setSpeed(e.target.value)}
                        required={true}
                    />
                    <div className="flex gap-2 w-full h-12 items-center">
                        <label className="inline-flex w-full items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer"
                                id='newCarCB'
                                onChange={(e) => setNewCar(e.target.checked)}
                                checked={newCar}
                            />
                            <div className="relative w-12 h-12 bg-gray-200 rounded-md peer peer-checked:after:translate-x-[1.5rem] rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary after:rounded-md after:h-11 after:w-5 after:transition-all peer-checked:bg-secondary">
                            </div>
                            <span className="ms-3 text-sm font-medium">
                                New Car?
                            </span>
                        </label>
                    </div>
                </div>
            </div>


            <TextInput
                type='date'
                placeholder='Registration Date'
                value={regDate ? formatDateForInput(regDate) : ""}
                onChange={(e) => setRegDate(parseDate(e.target.value, 1))}
                disabled={searchParams.get('car') ? true : false}
                required={true}
            />

            <div className="w-full h-[400px]">
                <ClickableMap
                    onClick={MapOnClick}
                    center={(latitude && longitude) ? [latitude, longitude] : currLocation}
                    position={(latitude && longitude) ? [latitude, longitude] : currLocation}
                />
            </div>

            <div className={`w-full flex ${car ? `justify-between` : 'justify-end'} gap-3`}>
                {car && <CustomButton
                    additionalClass='bg-red-500 text-white basis-2/12'
                    onClick={handleOnDeleteClick}
                >
                    <FaTrash />
                    Delete
                </CustomButton>}
                <CustomButton
                    additionalClass='bg-green-500 text-white basis-2/12'
                    type='submit'
                >
                    <FaSave />
                    Save
                </CustomButton>
            </div>

        </Form>
    )
}

export default EditCar
