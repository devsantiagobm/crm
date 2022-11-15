import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'       
import Aside from './Aside'

export default function Layout(){

    return (
        <div className='layout'>
            <Aside/>
            <main className='main'>
                <Outlet/>
            </main>
        </div>
    )
}