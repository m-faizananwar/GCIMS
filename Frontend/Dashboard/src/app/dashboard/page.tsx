import CarDisplayTable from '@/app/components/general/car_display_table';
import SearchForm from '@/app/components/general/search_form';
// import { testCars } from '@/app/interfaces/datatypes';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaChevronDown } from 'react-icons/fa'

interface SearchProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>
}

const Search: React.FC<SearchProps> = async ({ params, searchParams }) => {

  const searchBy = (await searchParams).sb

  return (
    <div className='flex flex-col gap-3 overflow-y-auto w-full p-7'>
      <div className="text-4xl font-bold">Search</div>
      <div>
        <Menu>
          <MenuButton className="flex w-72 justify-between gap-2 items-center py-2 px-4 outline outline-2 outline-slate-200 rounded-full hover:outline-slate-400">
            {searchBy ? `Search by: ${searchBy}` : "Search by..."}
            <FaChevronDown />
          </MenuButton>
          <MenuItems anchor="bottom" className="shadow-lg bg-white outline outline-2 w-72 outline-slate-200 flex flex-col rounded-2xl mt-2">
            <MenuItem>
              <a className="block data-[focus]:bg-[#D8C5C8] p-2" href={`/dashboard?sb=Name`}>
                Name
              </a>
            </MenuItem>
            {/* <MenuItem>
              <a className="block data-[focus]:bg-[#D8C5C8] p-2" href="/dashboard?sb=Price">
                Price
              </a>
            </MenuItem> */}
            <MenuItem>
              <a className="block data-[focus]:bg-[#D8C5C8] p-2" href="/dashboard?sb=Price Range">
                Price Range
              </a>
            </MenuItem>
            <MenuItem>
              <a className="block data-[focus]:bg-[#D8C5C8] p-2" href="/dashboard?sb=Country">
                Country
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      {searchBy && <SearchForm />}
      <CarDisplayTable />
    </div>
  )
}

export default Search