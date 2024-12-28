"use client"
import Form from 'next/form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

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

    useEffect(() => {
        if (!searchBy) {
            const newParams = new URLSearchParams(searchParams.toString())
            newParams.set('sb', 'Name')
            router.push(`${pathname}?${newParams}`)
        }
    }, [pathname, router, searchParams, searchBy])

    const handleFormSubmit = (formData: FormData) => {
        const newParams = new URLSearchParams(searchParams.toString())

        const country = formData.get('c')?.toString()
        if (country) newParams.set('c', country)
        else newParams.delete('c')

        const name = formData.get('n')?.toString()
        if (name) newParams.set('n', name)
        else newParams.delete('n')

        const model = formData.get('m')?.toString()
        if (model) newParams.set('m', model)
        else newParams.delete('m')

        const price = formData.get('p')?.toString()
        if (price) newParams.set('p', price)
        else newParams.delete('p')

        const startPrice = formData.get('sp')?.toString()
        if (startPrice) newParams.set('sp', startPrice)
        else newParams.delete('sp')

        const endPrice = formData.get('ep')?.toString()
        if (endPrice) newParams.set('ep', endPrice)
        else newParams.delete('ep')

        if (startPrice && endPrice && parseInt(startPrice) > parseInt(endPrice)) {
            newParams.set('sp', endPrice)
            newParams.set('ep', startPrice)
        }

        router.push(`${pathname}?${newParams}`)
    }

    return (
        <Form action={handleFormSubmit} className='flex gap-2'>
            <div className="basis-4/5">
                {["Country", "Name"].includes(searchBy || "Name") &&
                    <div className="flex w-full gap-2 items-center">
                        <input
                            className={`h-12 outline rounded-full px-4 outline-slate-200 hover:outline-slate-400 focus:outline-slate-400 hover:cursor-text w-full ${searchBy === "Name" && "basis-1/3"}`}
                            name={searchBy === "Country" ? 'c' : 'n'}
                            type='text'
                            defaultValue={searchBy === "Name" ? (name || "") : (country || " ")}
                            placeholder={searchBy ? `Enter ${searchBy.toLowerCase()}...` : 'Search...'} />
                        {searchBy === 'Name' &&
                            <>
                                <input
                                    className={`h-12 outline rounded-full px-4 outline-slate-200 hover:outline-slate-400 focus:outline-slate-400 hover:cursor-text w-full ${searchBy === "Name" && "basis-1/3"}`}
                                    name='m'
                                    type='text'
                                    defaultValue={model || ""}
                                    placeholder='Enter model...' />
                                <input
                                    className={`h-12 outline rounded-full px-4 outline-slate-200 hover:outline-slate-400 focus:outline-slate-400 hover:cursor-text w-full ${searchBy === "Name" && "basis-1/3"}`}
                                    name='c'
                                    type='text'
                                    defaultValue={country || ""}
                                    placeholder='Enter country...' />
                            </>}
                    </div>
                }

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