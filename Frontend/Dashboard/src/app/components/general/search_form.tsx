"use client"
import Form from 'next/form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import TextInput from './text_input'
import CustomButton from './custom_button'

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

        const country = formData.get('c')?.toString().trim()
        if (country) newParams.set('c', country)
        else newParams.delete('c')

        const name = formData.get('n')?.toString().trim()
        if (name) newParams.set('n', name)
        else newParams.delete('n')

        const model = formData.get('m')?.toString().trim()
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

        if (startPrice && endPrice && parseInt(startPrice) > parseInt(endPrice)) {
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
            </div>

            <CustomButton type='submit' additionalClass="text-white bg-secondary basis-1/5">
                <FaMagnifyingGlass size={20} />
                Search
            </CustomButton>
        </Form>
    )
}

export default SearchForm