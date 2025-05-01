import React from "react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { useState } from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import CommonForm from "../../components/common/form";
import { addProductFormElements } from "../../config/config";
import ProductImageUpload from "../../components/admin-view/image-upload";
import { useDispatch,useSelector  } from "react-redux";
import { fetchAllProducts , addNewProduct, editProduct, deleteProduct} from "../../store/admin/products-slice";
import { useEffect } from "react";
import { toast } from "sonner";
import AdminProductTile from "../../components/admin-view/product-tile";





const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const {productList} = useSelector((state) => state.adminProducts);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch(); 

  // console.log(formData, "formData");
  const onSubmit = (event) => {
    event.preventDefault();
    
    currentEditedId !== null?
    dispatch(editProduct({id:currentEditedId,formData}))
    .then((data) => {
      // console.log(data, 'data');
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null)
      }
      
    }):
    dispatch(addNewProduct({
      ...formData,
      image: uploadedImageUrl,
    }))
    .then((data) => {
      console.log(data, 'data');
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast.success(data?.payload?.message)

      }
        
    });
  };

 function handleDelete(getCurrentProductId){
  // console.log(getCurrentProductId )
  dispatch(deleteProduct(getCurrentProductId))
  .then((data) => {
    if(data?.payload?.success){
      // console.log(data, 'data');
      dispatch(fetchAllProducts());
      
    }
  })
 }

  function isFormValid(){
    return Object.keys(formData)
    .map(key=> formData[key] !== '')
    .every(item=> item === true)
  }
  
useEffect(()=>{
dispatch((fetchAllProducts()))
},[dispatch])
 
console.log(formData, "productList")
  return (
    <>
      <Fragment>
        <div className="mb-5 w-full flex justify-end">
          <Button onClick={() => setOpenCreateProductsDialog(true)}>
            Add New Product
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {
            productList && productList.length > 0 ?
            productList.map((productItem) =>{
              return (
                <AdminProductTile
                  key={productItem._id}
                  product={productItem}
                  setCurrentEditedId={setCurrentEditedId}
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                  setFormData={setFormData}
                  handleDelete={handleDelete}
                />
              );
            })
            : null
          }
        </div>
        <Sheet
          open={openCreateProductsDialog}
          onOpenChange={() =>{
           setOpenCreateProductsDialog(false)
           setCurrentEditedId(null)
           setFormData(initialFormData)
           }
          }
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {
                  currentEditedId !== null
                    ? "Edit Product"
                    : "Create New Product"
                }
              </SheetTitle>
            </SheetHeader>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            <div className="py-6">
              <CommonForm
                formData={formData}
                setFormData={setFormData}
                formControls={addProductFormElements}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                onSubmit={onSubmit}
                isBtnDisabled={!isFormValid()}
              />
            </div>
          </SheetContent>
        </Sheet>
      </Fragment>
    </>
  );
}

export default AdminProducts;
