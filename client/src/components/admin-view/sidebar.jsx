import React from 'react'
import { Fragment } from 'react'
import {ChartNoAxesCombined} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { LayoutDashboard,ShoppingBasket,ChartBarIncreasing } from "lucide-react";


 const adminSidebarMenuItems =[
  {
    id:'dashboard',
    label :'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard />
  },
  {
    id:'products',
    label :'Products',
    path: '/admin/products',
    icon:<ShoppingBasket />
  },
  {
    id:'orders',
    label :'Orders',
    path: '/admin/orders',
    icon: <ChartBarIncreasing />
  },
  
]

const MenuItems =()=>{
  const Navigate = useNavigate()

  return (

<nav className='mt-8 flex-col flex gap-2'>
{
  adminSidebarMenuItems.map((menuItem)=>{
    return(

    <div key={menuItem.id} onClick={()=>Navigate(menuItem.path)} className='flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer'>
    {menuItem.icon}
    <span>{menuItem.label}</span>
    </div>
    )

  })
}
</nav>
  )
}

const AdminSidebar=()=> {
  const Navigate = useNavigate()
  return (

  
   <>
    <Fragment>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={()=>Navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
        <ChartNoAxesCombined size={30}/>
        <h1 className='text-2xl font-extrabold'>Admin Pannel</h1>
        </div>
        <MenuItems/>
      </aside>
    </Fragment>
   </>
  )
}

export default AdminSidebar
