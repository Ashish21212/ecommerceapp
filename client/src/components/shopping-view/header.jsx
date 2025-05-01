import { House, Menu } from 'lucide-react'
import { Sheet } from '@/components/ui/sheet'
import React from 'react'
import { Link } from 'react-router-dom'
import { SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'

function MenuItems(){
  return(
  <>
    <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row '>

    </nav>
  </>
 )}

function ShoppingHeader() {

  const {isAuthenticated} = useSelector(state=>state.auth)
  return (
  <>
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
    <div className='flex h-16 items-center justify-between px-4 md:px-6'>
    <Link to='/shop/home' className='flex items-center gap-2' >
    <House className='h-6 w-6'/>
    <span className='font-bold'> Ecommerce</span>
    </Link>
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='lg:hidden'>
        <Menu className='h-6 w-6' />
          <span className='sr-only'>Toggle header menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='w-full mx-w-xs'>
  
      </SheetContent>
    
    </Sheet>
    <div className='hidden lg:block'>
    {
      isAuthenticated?<div></div> : null
    }

    </div>

    </div>

    </header>
  </>
  )
}

export default ShoppingHeader