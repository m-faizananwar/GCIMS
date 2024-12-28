"use client"
import { Car } from "@/app/interfaces/datatypes";

import React, { useEffect, useState } from 'react'
import CarDisplayTableItem from "./car_display_table_item";
import { useSearchParams } from "next/navigation";
import { HashLoader } from "react-spinners";
import { SERVER_URL } from "@/app/constants/consts";
import { parseCar } from "@/app/util/util";
import Pagination, { paginate } from "./pagination";


interface CarDisplayTableProps {
    providedData?: Car[]
}

const CarDisplayTable: React.FC<CarDisplayTableProps> = ({ providedData }) => {

    const searchParams = useSearchParams()

    const [cars, setCars] = useState<Car[]>(providedData || [])
    const [loading, setLoading] = useState<boolean>(true)

    const [currentPage, setCurrentPage] = useState(1)

    const pageSize = 10

    useEffect(() => {
        setLoading(true)

        const params = {
            searchBy: searchParams.get('sb'),
            name: searchParams.get('n'),
            model: searchParams.get('m'),
            country: searchParams.get('c'),
            startPrice: searchParams.get('sp'),
            endPrice: searchParams.get('ep'),
        }

        let url: string = `${SERVER_URL}/cars`
        if (params.searchBy === 'Price Range' && params.startPrice && params.endPrice)
            url = `${SERVER_URL}/cars/search/price_range/${params.startPrice}/${params.endPrice}`
        else if (params.searchBy === 'Country' && params.country) 
            url = `${SERVER_URL}/cars/search/country/${params.country}`
        else if (params.searchBy === 'Name') 
            url = `${SERVER_URL}/cars/search?name=${params.name || ""}&model=${params.model || ""}&country=${params.country || ""}`
        fetch(url)
            .then(res => {
                if (!res.ok)
                    console.error("Error in receiving data")

                return res.json()
            }).then(data => {
                const finalCars: Car[] = data.map((car: unknown) => {
                    return parseCar(car)
                })

                setCars(finalCars)
                setLoading(false)
            })
            .catch(e => console.log(e))
    }, [searchParams])

    return (
        <div className="w-full rounded-3xl bg-[#D8C5C8] shadow-lg flex flex-col py-3 gap-3">
            <div className="text-xl font-semibold mx-3">Found {cars?.length} results:</div>
            <div className="w-full rounded-3xl px-3 py-1 bg-white flex flex-col">
                <div className="flex px-4 pt-4 pb-2 text-sm font-normal text-gray-500">
                    <div className="basis-1/4">Name</div>
                    <div className="basis-1/4">Colour</div>
                    <div className="basis-1/4">Location</div>
                    <div className="basis-1/4">Price</div>
                </div>
                <div className="border"></div>
                {loading && (
                    <div className="w-full flex justify-center">
                        <HashLoader />
                    </div>
                )}
                {!loading && (cars.length === 0 ? <p>No cars found matching the given criteria.</p> : (
                    paginate(cars, currentPage, pageSize).map((car, idx) => {
                        return (
                            <CarDisplayTableItem item={car as Car} key={idx}/>
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