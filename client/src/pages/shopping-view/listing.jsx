import React, { useEffect, useState } from "react";
import ProductFilter from "../../components/shopping-view/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "../../store/shop/products-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "../../components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import {toast} from 'sonner'

// import { getFilteredProducts } from "../../store/product-slice";

function createSearchParamsHelper(filterParams){
  const queryParams = []

  for(const [key,value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length > 0){
      const paramValue = value.join(',')

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
 return queryParams.join('&')

}
function ShoppingListing() {
  // fetching list of product
  const dispatch = useDispatch();
  const { products, productDetails } = useSelector((state) => state.shopProducts);
  // console.log(products, "hello");
  const {user} = useSelector(state=>state.auth)
  const [filters, setFilters] = useState({});
  // console.log(filters,'jj')
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)



  function handleSort(value) {
    // console.log(value, "value");
    setSort(value);
  }

 function handleFilter(getSectionId, getCurrentOptions) {
  // console.log(getSectionId, getCurrentOptions, "getSectionId");
  let cpyFilters = { ...filters };
 
  const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

  if (indexOfCurrentSection === -1) {
    cpyFilters={
      ...cpyFilters,
      [getSectionId]:[getCurrentOptions]

    }
     
  } else{
    const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOptions);

    if(indexOfCurrentOption === -1){
      cpyFilters[getSectionId].push(getCurrentOptions)
    }
    else{
      cpyFilters[getSectionId].splice(indexOfCurrentOption,1)
    }
  }
   
//  console.log(cpyFilters,'fsggg');
 setFilters(cpyFilters);
 sessionStorage.setItem('filters',JSON.stringify(cpyFilters))
 }

 function handleGetProductDetails(getCurrentProductId){
  // console.log(getCurrentProductId,'details' )
  dispatch(fetchProductDetails(getCurrentProductId))
 }

 function handleAddToCart(getCurrentProductId){
   console.log(getCurrentProductId,'getidproduct')
   dispatch(addToCart({userId : user?.id,productId:getCurrentProductId,quantity:1}))
   .then(data=>{
    if(data?.payload?.success){
      dispatch(fetchCartItems(user?.id))
     toast.success('Product added to cart')
    }
   })
 }

 useEffect(()=>{
  setSort('price-lowtohigh')
  setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
 },[])

 useEffect(()=>{
   if(filters && Object.keys(filters).length>0){
    const createQueryString = createSearchParamsHelper(filters)
    setSearchParams(new URLSearchParams(createQueryString) )
   }
 },[filters])

  useEffect(() => {
    if(filters !== null && sort !== null)
    dispatch(fetchAllFilteredProducts({filterParams : filters,sortParams: sort}));
  }, [dispatch,sort,filters]);

  useEffect(()=>{
    if(productDetails !==null)
    {
      setOpenDetailsDialog(true)
    }
  },[productDetails])


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter
         filters={filters}
         handleFilter={handleFilter}
         />
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex  items-center justify-between">
            <h2 className="text-lg font-extrabold ">All Products</h2>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">{products?.length}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                        {sortItem.label}{" "}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 p-4">
            {products && products.length > 0 ? (
              products.map((productItem) => (
                <ShoppingProductTile 
                product={productItem}
                handleGetProductDetails={handleGetProductDetails}
                handleAddToCart={handleAddToCart}
                 />
              ))
            ) : (
              <p>No products found.</p>
            )}
            {/* {console.log(productList, "product list")} */}
          </div>
        
        </div>
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </>
  );
}

export default ShoppingListing;
