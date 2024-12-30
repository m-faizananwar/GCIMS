"use client"
import Form from 'next/form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import TextInput from './text_input'
import CustomButton from './custom_button'
import { MapSearch } from './map/map'
import { fetchLocationData } from '@/app/util/util'
import { LatLng } from 'leaflet'

const SearchForm = () => {

    const router = useRouter()

    const pathname = usePathname()
    const searchParams = useSearchParams()

    const searchBy = searchParams.get('sb')

    const country = searchParams.get('c')

    const name = searchParams.get('n')
    const model = searchParams.get('m')

    const startPrice = searchParams.get('sp')
    const endPrice = searchParams.get('ep')

    const [firstPos, setFirstPos] = useState<{ lat: number, lng: number } | undefined>(
        searchParams.get('lat1') && searchParams.get('lng1') ? {
            lat: Number(searchParams.get('lat1')),
            lng: Number(searchParams.get('lng1'))
        } : undefined)
    const [secondPos, setSecondPos] = useState<{ lat: number, lng: number } | undefined>(
        searchParams.get('lat2') && searchParams.get('lng2') ? {
            lat: Number(searchParams.get('lat2')),
            lng: Number(searchParams.get('lng2'))
        } : undefined)
    const [mapCenter, setMapCenter] = useState<[number, number] | undefined>(
        searchParams.get('mclat') && searchParams.get('mclng') ? [
            Number(searchParams.get('mclat')),
            Number(searchParams.get('mclng'))
        ] : undefined)

    const [radius, setRadius] = useState<number | undefined>(undefined)
    const [clickCount, setClickCount] = useState<number>(0)

    useEffect(() => {
        if (!searchBy) {
            const newParams = new URLSearchParams(searchParams.toString())
            newParams.set('sb', 'Name')
            router.push(`${pathname}?${newParams}`)
        }
    }, [, pathname, router, searchParams, searchBy])

    useEffect(() => {
        if (!mapCenter && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // setFirstPos({ lat: position.coords.latitude, lng: position.coords.longitude })
                    setMapCenter([position.coords.latitude, position.coords.longitude])
                }
            )
        }
    }, [])

    const mapOnClick = (e: L.LeafletMouseEvent) => {
        const pos = {
            lat: e.latlng.lat,
            lng: e.latlng.lng
        }
        if (clickCount === 0) {
            setFirstPos(pos)
            setMapCenter(
                secondPos ?
                    [(secondPos.lat + pos.lat) / 2, (secondPos.lng + pos.lng) / 2]
                    : [pos.lat, pos.lng])
        } else if (clickCount === 1) {
            setSecondPos(pos)
            setMapCenter(
                firstPos ?
                    [(firstPos.lat + pos.lat) / 2, (firstPos.lng + pos.lng) / 2]
                    : [pos.lat, pos.lng])
            if (searchBy === 'Map Radius') {
                // const newRadius = (firstPos && pos) ?
                //     (new LatLng(firstPos.lat, firstPos.lng)).distanceTo(new LatLng(pos.lat, pos.lng))
                //     : undefined

                const latDiff = firstPos ? (firstPos.lat - pos.lat) : 0
                const lngDiff = firstPos ? (firstPos.lng - pos.lng) : 0
                const latSq = latDiff * latDiff
                const lngSq = lngDiff * lngDiff
                const newRadius = Math.sqrt(latSq + lngSq)
                
                console.warn("Ran radius. Radius: ", newRadius.toString())
                setRadius(newRadius)
            }
        } else {
            setFirstPos(undefined)
            setSecondPos(undefined)
            setRadius(undefined)
        }
        setClickCount(old => (old + 1) % 3)
    }

    const handleFormSubmit = (formData: FormData) => {
        const newParams = new URLSearchParams(searchParams.toString())

        const country = formData.get('c')?.toString().trim().capitalizeFirstLetter()
        if (country) newParams.set('c', country)
        else newParams.delete('c')

        const name = formData.get('n')?.toString().trim().capitalizeFirstLetter()
        if (name) newParams.set('n', name)
        else newParams.delete('n')

        const model = formData.get('m')?.toString().trim().capitalizeFirstLetter()
        if (model) newParams.set('m', model)
        else newParams.delete('m')

        const price = formData.get('p')?.toString().trim()
        if (price) newParams.set('p', price)
        else newParams.delete('p')

        const startPrice = formData.get('sp')?.toString().trim()
        if (startPrice) newParams.set('sp', startPrice)
        else newParams.delete('sp')

        const endPrice = formData.get('ep')?.toString().trim()
        if (endPrice) newParams.set('ep', endPrice)
        else newParams.delete('ep')

        if (firstPos) {
            newParams.set('lat1', firstPos.lat.toString())
            newParams.set('lng1', firstPos.lng.toString())
        } else {
            newParams.delete('lat1')
            newParams.delete('lng1')
        }

        if (secondPos && searchBy === 'Map Area') {
            newParams.set('lat2', secondPos.lat.toString())
            newParams.set('lng2', secondPos.lng.toString())
        } else {
            newParams.delete('lat2')
            newParams.delete('lng2')
        }

        if (radius && searchBy == 'Map Radius') newParams.set('radius', radius.toString())
        else newParams.delete('radius')

        if (mapCenter) {
            newParams.set('mclat', mapCenter[0].toString())
            newParams.set('mclng', mapCenter[1].toString())
        } else {
            newParams.delete('mclat')
            newParams.delete('mclng')
        }

        if (startPrice && endPrice && Number(startPrice) > Number(endPrice)) {
            newParams.set('sp', endPrice)
            newParams.set('ep', startPrice)
        }

        router.push(`${pathname}?${newParams}`)
    }

    return (
        <Form action={handleFormSubmit} className='flex gap-3'>
            <div className="basis-4/5">
                {["Country", "Name"].includes(searchBy || "Name") &&
                    <div className="flex w-full gap-3 items-center">
                        <TextInput
                            addtionalClass={searchBy === "Name" ? "basis-1/3" : ''}
                            name={searchBy === "Country" ? 'c' : 'n'}
                            type='text'
                            defaultValue={searchBy === "Name" ? (name || "") : (country || "")}
                            placeholder={searchBy ? `Enter ${searchBy.toLowerCase()}...` : 'Search...'} />
                        {searchBy === 'Name' &&
                            <>
                                <TextInput
                                    addtionalClass={searchBy === "Name" ? "basis-1/3" : 'basis-1/2'}
                                    name='m'
                                    type='text'
                                    defaultValue={model || ""}
                                    placeholder='Enter model...' />
                                <TextInput
                                    addtionalClass={searchBy === "Name" ? "basis-1/3" : 'basis-1/2'}
                                    name='c'
                                    type='text'
                                    defaultValue={country || ""}
                                    placeholder='Enter country...' />
                            </>}
                    </div>
                }

                {searchBy === 'Price Range' &&
                    <div className="flex w-full gap-3 items-center">
                        <TextInput
                            addtionalClass='basis-1/2'
                            name='sp'
                            type='number'
                            defaultValue={startPrice || ""}
                            placeholder='Starting price...'
                        />
                        -
                        <TextInput
                            addtionalClass='basis-1/2'
                            name='ep'
                            type='number'
                            defaultValue={endPrice || ""}
                            placeholder='Ending price...'
                        />
                    </div>
                }

                {searchBy && ["Map Area", "Map Radius"].includes(searchBy) &&
                    <MapSearch
                        center={mapCenter}
                        position={firstPos ? [firstPos.lat, firstPos.lng] : undefined}
                        position2={secondPos ? [secondPos.lat, secondPos.lng] : undefined}
                        onClick={mapOnClick}
                        radius={searchBy === 'Map Radius'} />
                }
            </div>

            <CustomButton type='submit' additionalClass="text-white bg-secondary basis-1/5">
                <FaMagnifyingGlass size={20} />
                Search
            </CustomButton>
        </Form>
    )
}

export default SearchForm