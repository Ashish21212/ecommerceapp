import React from 'react'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/auth-slice'

function AdminHeader({setOpen}) {
  const dispatch = useDispatch()
  
  function handleLogout() {
    dispatch(logoutUser())

  }
  return ( 
    <>
      <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
        <Button onClick={()=>setOpen(true)} className ="lg:hidden sm:block cursor-pointer" >
        <Menu />
        {/* <span className='sr-only'>Toggle Menu</span> */}
        </Button>
        <div className='flex flex-1 justify-end '></div>
        <Button onClick={handleLogout} className="inline-flex  items-center rounded-md px-4 py-2 text-sm font-medium shadow cursor-pointer">
        <LogOut />Logout</Button>
      </header>
    </>
  )
}

export default AdminHeader
