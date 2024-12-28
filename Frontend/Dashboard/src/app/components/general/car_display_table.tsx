import { Car } from "@/app/interfaces/datatypes";

import React from 'react'
import CarDisplayTableItem from "./car_display_table_item";

interface CarDisplayTableProps {
    data: Car[]
}

const CarDisplayTable: React.FC<CarDisplayTableProps> = ({ data }) => {
    return (
        <div className="w-full rounded-3xl bg-[#D8C5C8] shadow-lg flex flex-col py-3 gap-3">
            <div className="text-xl font-semibold mx-3">Found {data.length} results:</div>
            <div className="relative w-full rounded-3xl bg-white flex flex-col">
                <div className="flex px-4 pt-4 pb-2 text-sm font-normal text-gray-500">
                    <div className="basis-1/5">Make</div>
                    <div className="basis-1/5">Model</div>
                    <div className="basis-1/5">Colour</div>
                    <div className="basis-1/5">Location</div>
                    <div className="basis-1/5">Price</div>
                </div>
                <div className="outline w-full outline-[0.3] outline-slate-200"></div>
                {data.map((car, index) => <CarDisplayTableItem item={car} key={index} />)}
            </div>
            <div className="w-full items-center text-center">
                Pagination
            </div>
        </div>
    )
}

export default CarDisplayTable