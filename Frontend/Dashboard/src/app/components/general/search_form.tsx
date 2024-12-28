"use client"
import Form from 'next/form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import DateRangePicker from './date_range_picker'

const SearchForm = () => {

    const router = useRouter()

    const pathname = usePathname()
    const searchParams = useSearchParams()

    const searchBy = searchParams.get('sb')

    const startDate = searchParams.get('sd')
    const endDate = searchParams.get('ed')

    const searchQuery = searchParams.get('q')

    const startPrice = searchParams.get('sp')
    const endPrice = searchParams.get('ep')

    const handleFormSubmit = (formData: FormData) => {
        const newParams = new URLSearchParams(searchParams.toString())

        const searchQuery = formData.get('q')?.toString()
        if (searchQuery) newParams.set('q', searchQuery)
        else newParams.delete('q')

        const price = formData.get('p')?.toString()
        if(price) newParams.set('p', price)
        else newParams.delete('p')

        const startPrice = formData.get('sp')?.toString()
        if(startPrice) newParams.set('sp', startPrice)
        else newParams.delete('sp')

        const endPrice = formData.get('ep')?.toString()
        if(endPrice) newParams.set('ep', endPrice)
        else newParams.delete('ep')

        if (startPrice && endPrice && parseInt(startPrice) > parseInt(endPrice)) {
            newParams.set('sp', endPrice)
            newParams.set('ep', startPrice)
        }
        
        router.push(`${pathname}?${newParams}`)
    }

    return (
        <Form action={handleFormSubmit} className='flex gap-2'>
            <div className="basis-4/5 ">
                {(searchBy === 'Country' || searchBy === 'Price') &&
                    <input
                        className="h-12 outline rounded-full px-4 outline-slate-200 hover:outline-slate-400 focus:outline-slate-400 hover:cursor-text w-full"
                        name={searchBy === 'Country' ? 'q' : 'p'}
                        type={searchBy === 'Country' ? 'text' : 'number'}
                        defaultValue={searchQuery || ""}
                        placeholder={searchBy ? `Enter ${searchBy.toLowerCase()}...` : 'Search...'} />
                }

                {searchBy === 'Date Range' && <DateRangePicker startDate={startDate || ""} endDate={endDate || ""} />}

                {searchBy === 'Price Range' &&
                    <div className="flex w-full gap-2 items-center">
                        <input
                            className='h-12 basis-1/2 outline rounded-full px-4 outline-slate-200 hover:outline-slate-400 focus:outline-slate-400 hover:cursor-text w-full'
                            name='sp'
                            type='number'
                            defaultValue={startPrice || ""}
                            placeholder='Starting price...'
                        />
                        to
                        <input
                            className='h-12 basis-1/2 outline rounded-full px-4 outline-slate-200 hover:outline-slate-400 focus:outline-slate-400 hover:cursor-text w-full'
                            name='ep'
                            type='number'
                            defaultValue={endPrice || ""}
                            placeholder='Ending price...'
                        />
                    </div>
                }

            </div>

            <button type='submit' className="flex justify-center items-center text-white text-center gap-3 bg-[#1C0F13] basis-1/5 rounded-full outline-[#D8C5C8] hover:bg-opacity-80 hover:outline hover:cursor-pointer transition-all">
                <FaMagnifyingGlass size={20} />
                Search
            </button>
        </Form>
    )
}

export default SearchForm