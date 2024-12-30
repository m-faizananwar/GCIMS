"use client"
import { Car } from '@/app/interfaces/datatypes'
import { LatLng } from 'leaflet';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import CustomButton from '../custom_button';
import { FaPen, FaTimes, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface CarDisplayTableItemProps {
    item: Car;
}

const CarDisplayTableItem: React.FC<CarDisplayTableItemProps> = ({ item }) => {

    const router = useRouter()

    const [showDetail, setShowDetail] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setShowDetail(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    const Map = useMemo(() => dynamic(
        () => import('@/app/components/general/map/map'),
        {
            loading: () => <p>Loading map...</p>,
            ssr: false
        }
    ), [])

    return (
        <div
            ref={ref}
            className={`${showDetail ? 'z-10 shadow-[0_0_50px_50px_rgba(0,0,0,0.4)] rounded-lg' : 'hover:text-white hover:bg-secondary hover:cursor-pointer '}  bg-white text-black flex flex-col w-full p-4 gap-2 transition-all`}
            onClick={() => !showDetail && setShowDetail(true)}>
            {showDetail && <div className="flex py-2 text-sm font-normal text-gray-500">
                <div className="basis-1/4">Name</div>
                <div className="basis-1/4">Colour</div>
                <div className="basis-1/4">Location</div>
                <div className="basis-1/4">Price</div>
            </div>}
            <div className="flex text-md font-normal">
                <div className="basis-1/4">{item.carName}</div>
                <div className="basis-1/4">{item.color}</div>
                <div className="basis-1/4">{`${item.city}, ${item.country}`}</div>
                <div className="basis-1/4">$ {item.price}</div>
            </div>
            {showDetail && <div className="flex py-2 justify-between text-sm font-normal text-gray-500">
                <div className="basis-1/4">Status</div>
                <div className="basis-1/4">Top Speed</div>
            </div>}
            {showDetail &&
                <div className="flex text-md font-bold justify-between">
                    <div className="basis-1/4">{item.newCar ? "New" : "Used"}</div>
                    <div className="basis-1/4">{item.speed} km/h</div>
                </div>}
            {showDetail && <div className='w-full h-[500px]'>
                <Map position={new LatLng(item.dealerLatitude, item.dealerLongitude)} zoom={13} />
            </div>}
            {showDetail &&
                <div className="flex gap-3 w-full">
                    <CustomButton additionalClass='basis-1/3 bg-special text-white'
                        onClick={() => setShowDetail((pr) => !pr)}>
                            <FaTimes />
                        Close
                    </CustomButton>
                    <CustomButton additionalClass='basis-1/3 bg-tertiary text-white'
                        onClick={() => router.push(`/dashboard/edit?car=${encodeURIComponent(JSON.stringify(item))}`)}>
                        <FaPen />
                        Edit
                    </CustomButton>
                    <CustomButton additionalClass='basis-1/3 bg-red-500 text-white'
                        onClick={() => setShowDetail((pr) => !pr)}>
                        <FaTrash />
                        Delete
                    </CustomButton>
                </div>
            }
        </div>
    )
}

export default CarDisplayTableItem