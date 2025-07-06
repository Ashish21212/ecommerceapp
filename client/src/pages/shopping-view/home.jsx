import React, { useEffect, useState } from "react";

import bannerOne from "../../assets//banner-one.jpg";
import bannerTwo from "../../assets/banner-two.webp";
import bannerThree from "../../assets/banner-three.webp";
import { Button } from "../../components/ui/button";
import {
  BabyIcon,
  Bird,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
 
  Footprints,
  Leaf,
  Lectern,
  MoveRightIcon,
  Shirt,
  ShirtIcon,
  ShoppingBag,
  Square,
  TicketIcon,
  UmbrellaIcon,
  
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "../../store/shop/products-slice";
import ShoopingProductTile from "../../components/shopping-view/product-tile";
const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];
const brandsWithIcon = [
  
      {id:'nike', label:'Nike', icon:TicketIcon},
      {id:'adidas', label:'Adidas',icon:Footprints},
      {id:'puma', label:'Puma',icon:Bird},
      {id:'levis', label:'Levis',icon:ShoppingBag},
      {id:'zara', label:'Zara',icon:Leaf},
      {id:'h&m', label:'H&M',icon:Square},


    ]
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const {productList} = useSelector((state) => state.shopProducts);
  const {products} = useSelector((state) => state.shopProducts);

  const dispatch = useDispatch()

  const slides = [bannerOne, bannerTwo, bannerThree];

  useEffect(()=>{
   const timer = setInterval(()=>{
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
   }, 3000)

    return () => clearInterval(timer);
  
  },[])

  useEffect(()=>{
  dispatch(fetchAllFilteredProducts({filterParams: {},sortParams:'price-lowtohigh'}))
  },[dispatch])

  console.log(products, "productList");
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="relative w-full h-[600px] overflow-hidden">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              className={`${index === currentSlide ? 'opacity-100': 'opacity-0' } absolute top-0 left-0 w-full h-full  object-cover object-center transition-opacity duration-1000 `}
            />
          ))}
          <Button
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
              )
            }
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide + 1) % slides.length
              )
            }
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
        <section className="py-12 bg-gray-50 ">
          <div className="container mx-auto px-4 ">
            <h2 className="text-3xl font-bold text-center mb-8 ">
              Shop by category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categoriesWithIcon.map((categoryItem) => (
                <Card
                  key={categoryItem.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="flex flex-col items-center justify-center p-2">
                    <categoryItem.icon className=" w-8 h-8 mb-2 text-medium" />
                    <span className="font-bold">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              ))}
             
              {/* {
                brandsWithIcon.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <div
                      key={category.id}
                      className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                    >
                      <IconComponent className="w-8 h-8 text-gray-700 mb-2" />
                      <span className="text-sm font-medium text-gray-800">
                        {category.label}
                      </span>
                    </div>
                  );
                })
               } */}
            </div>
          </div>
        </section>
          <section className="py-12 bg-gray-50 ">
          <div className="container mx-auto px-4 ">
            <h2 className="text-3xl font-bold text-center mb-8 ">
              Shop by Brand
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {brandsWithIcon.map((brandItem) => (
                <Card
                  key={brandItem.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="flex flex-col items-center justify-center p-2">
                    <brandItem.icon className=" w-8 h-8 mb-2 text-medium" />
                    <span className="font-bold">{brandItem.label}</span>
                  </CardContent>
                </Card>
              ))}
              </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Featured Products
            </h2>
            <div className="grid grid-col-1 sm:grid-cols-3 lg:grid-cols-4 gap-6"> 
            {
              products && products.length > 0 ? 
              products.map(productItem => <ShoopingProductTile
                product = {productItem}
              />):<p>No products found.</p>
            }
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ShoppingHome;
