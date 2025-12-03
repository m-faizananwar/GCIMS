"use client"
import { Car } from "@/app/interfaces/datatypes";

import React, { useEffect, useState } from 'react'
import CarDisplayTableItem from "./car_display_table_item";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HashLoader } from "react-spinners";
import { SERVER_URL } from "@/app/constants/consts";
import { parseCar } from "@/app/util/util";
import Pagination, { paginate } from "../pagination";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";


interface CarDisplayTableProps {
    providedData?: Car[]
}

const CarDisplayTable: React.FC<CarDisplayTableProps> = ({ providedData }) => {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [sortBy, setSortBy] = useState<string | undefined>(searchParams.get('sortBy') || undefined)
    const [sortOrder, setSortOrder] = useState<string | undefined>(searchParams.get('order') || undefined)
    const [sortClickCounter, setSortClickCounter] = useState<number>(
        searchParams.get('order') && searchParams.get('order') === 'asc' ? 1 : 2
    )

    const [cars, setCars] = useState<Car[]>(providedData || [])
    const [loading, setLoading] = useState<boolean>(true)

    const [currentPage, setCurrentPage] = useState(1)

    const pageSize = 10

    useEffect(() => {
        setLoading(true)

        const params = {
            searchBy: searchParams.get('sb'),
            sortBy: searchParams.get('sortBy'),
            sortOrder: searchParams.get('order'),
            name: searchParams.get('n'),
            model: searchParams.get('m'),
            country: searchParams.get('c'),
            startPrice: searchParams.get('sp'),
            endPrice: searchParams.get('ep'),
            lat1: searchParams.get('lat1'),
            lng1: searchParams.get('lng1'),
            lat2: searchParams.get('lat2'),
            lng2: searchParams.get('lng2'),
            radius: searchParams.get('radius')
        }

        let url: string = `${SERVER_URL}/cars`
        if (params.searchBy === 'Price Range' && params.startPrice && params.endPrice)
            url = `${SERVER_URL}/cars/search/price_range/${params.startPrice}/${params.endPrice}`
        else if (params.searchBy === 'Country' && params.country)
            url = `${SERVER_URL}/cars/search/country/${params.country}`
        else if (params.searchBy === 'Name')
            url = `${SERVER_URL}/cars/search?name=${params.name || ""}&model=${params.model || ""}&country=${params.country || ""}`
        else if (params.searchBy === 'Map Area' && params.lat1 && params.lng1 && params.lat2 && params.lng2)
            url = `${SERVER_URL}/cars/search/rectangle?lat1=${params.lat1}&lng1=${params.lng1}&lat2=${params.lat2}&lng2=${params.lng2}`
        else if (params.searchBy === 'Map Radius' && params.lat1 && params.lng1 && params.radius)
            url = `${SERVER_URL}/cars/search/radius?lat=${params.lat1}&lng=${params.lng1}&radius=${params.radius}`

        fetch(`/api/cars?link=${encodeURIComponent(url)}`)
            .then(res => {
                if (!res.ok)
                    res.json().then((error) => { throw new Error(error.error) })

                else return res.json()
            }).then(data => {
                if (data) {
                    let finalCars: Car[] = data?.map((car: unknown) => parseCar(car))

                    if (params.sortBy && params.sortOrder) {
                        const newUrl = `${SERVER_URL}/sort?sortBy=${params.sortBy}&order=${params.sortOrder}`
                        fetch(`/api/cars?link=${encodeURIComponent(newUrl)}`).then(res => {
                            if (!res.ok)
                                res.json().then((error) => { throw new Error(error.error) })
                            else return res.json()
                        }).then(data => {
                            if (data) {
                                finalCars = data.map((car: unknown) => parseCar(car))
                                setCars(finalCars)
                                setLoading(false)
                            }
                        })
                    } else {
                        setCars(finalCars)
                        setLoading(false)
                    }
                }
            })
            .catch(e => console.log(e))
    }, [searchParams])

    const handleSortClick = (newSort: string) => {
        if (newSort !== sortBy) {
            setSortBy(newSort)
            setSortOrder('asc')
            setSortClickCounter(1)
        } else {
            if (sortClickCounter === 0) setSortOrder('asc')
            else if (sortClickCounter === 1) setSortOrder('desc')
            else setSortBy(undefined)

            setSortClickCounter(old => (old + 1) % 3)
        }
    }

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams.toString())
        if (sortBy) {
            newParams.set('sortBy', sortBy)
            if (sortOrder)
                newParams.set('order', sortOrder)
        } else {
            newParams.delete('sortBy')
            newParams.delete('order')
        }

        router.push(`${pathname}?${newParams}`)

    }, [sortBy, sortOrder])

    const NameIcon = sortBy !== 'make_and_model' ? FaSort : (sortOrder && sortOrder === 'asc') ? FaSortUp : FaSortDown;
    const PriceIcon = sortBy !== 'price' ? FaSort : (sortOrder && sortOrder === 'asc') ? FaSortUp : FaSortDown;

    return (
        <div className="light w-full rounded-lg bg-surface shadow-lg flex flex-col py-3 gap-3">
            <div className="text-xl font-semibold mx-3">{loading ? 'Loading...' : `Found ${cars?.length} results:`}</div>
            <div className="w-full py-1 bg-white flex flex-col">
                <div className="flex px-4 pt-4 pb-2 text-sm font-normal text-gray-500">
                    <div className="basis-1/4 w-full flex gap-2 justify-between">
                        Name
                        <NameIcon
                            className={`mr-2 
                        ${sortBy === 'make_and_model' && 'text-black '} 
                        hover:text-black hover:cursor-pointer focus:text-inherit`}
                            onClick={() => handleSortClick('make_and_model')}
                        />
                    </div>
                    <div className="basis-1/4">Colour</div>
                    <div className="basis-1/4">Location</div>
                    <div className="basis-1/4 w-full flex gap-2 justify-between">
                        Price
                        <PriceIcon
                            className={`mr-2 
                        ${sortBy === 'price' && 'text-black '} 
                        hover:text-black hover:cursor-pointer focus:text-inherit`}
                            onClick={() => handleSortClick('price')}
                        />
                    </div>
                </div>
                <div className="border"></div>
                {loading && (
                    <div className="w-full flex justify-center p-3">
                        <HashLoader color="#171502" />
                    </div>
                )}
                {!loading && (cars.length === 0 ? <p className="w-full flex justify-center p-3">No cars found matching the given criteria.</p> : (
                    paginate(cars, currentPage, pageSize).map((car, idx) => {
                        return (
                            <CarDisplayTableItem item={car as Car} key={idx} />
                        )
                    })
                ))}
            </div>
            <div className="w-full items-center text-center">
                <Pagination items={cars.length} pageSize={pageSize} currentPage={currentPage} onPageChange={page => setCurrentPage(page)} />
            </div>
        </div>
    )
}

export default CarDisplayTable