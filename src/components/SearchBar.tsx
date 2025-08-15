import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

type Props = {}

export default function SearchBar({ }: Props) {
    return (
        <div className='relative'>
            <input type="text"
            placeholder='Search for country.....'
            value={""}
            className='pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all w-[300px] max-h-[36px] bg-inherit'
            />
            <div className='absolute inset-y-0 left-0 flex pl-3 items-center'>
                <AiOutlineSearch
                className='text-gray-500 text-lg'
                />
            </div>
        </div>
    )
}