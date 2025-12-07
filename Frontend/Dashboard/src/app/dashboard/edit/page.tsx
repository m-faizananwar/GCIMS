import { Suspense } from 'react'
import { EditCarClient } from './edit-car-client'
import { HashLoader } from 'react-spinners'

// This is a server component
export default function EditCarPage() {
  return (
    <Suspense fallback={
      <div className="w-full flex h-screen justify-center text-center align-middle items-center">
        <HashLoader color='#171502' className='mx-auto my-auto' />
      </div>
    }>
      <EditCarClient />
    </Suspense>
  )
}
