import React from 'react'
import { Fragment } from 'react'
import {Button} from '@/components/ui/button'
import { Sheet } from '@/components/ui/sheet'
import { useState } from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet'
import CommonForm from '../../components/common/form'
import { addProductFormElements } from '../../config/config'

const initialFormData = {
  image: null,
  title: '',
  description: '', 
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
}


function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const onSubmit = (data) =>{

  }
  return (
    <>
      <Fragment>
        <div className='mb-5 w-full flex justify-end'>
          <Button onClick={()=>setOpenCreateProductsDialog(true)}>Add New Product</Button>
        </div>
        <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'></div>
        <Sheet open={openCreateProductsDialog} onOpenChange={()=>setOpenCreateProductsDialog(false)}>
         <SheetContent side='right' className='overflow-auto'>
         <SheetHeader>
          <SheetTitle>
            Add New Product
          </SheetTitle>
         </SheetHeader> 
         <div className='py-6'>
          <CommonForm
            formData={formData}
            setFormData={setFormData}
            formControls={addProductFormElements}
            buttonText='Add'
            onSubmit={onSubmit}
          />
         </div>
         </SheetContent>
        </Sheet>
      </Fragment>
    </>
  )
}

export default AdminProducts
