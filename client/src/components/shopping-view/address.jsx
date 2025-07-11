import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from "../../store/shop/address-slice";
import AddressCard from "./address-card";
import {toast} from 'sonner'

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  function handleManageAddress(e) {
    e.preventDefault();

    if(addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast.error("You can only have up to 3 addresses.");
      return;
    }

    currentEditedId !== null ? 
    dispatch(editaAddress({
      userId: user?.id,
      addressId: currentEditedId,
      formData
    }))
    .then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllAddresses(user?.id));
        setCurrentEditedId(null);
        setFormData(initialAddressFormData);
        toast.success("Address updated successfully");
      }
    }) : dispatch(addNewAddress({
      userId: user?.id,
      ...formData
    }))
    .then(data=>{
      // console.log("Address added successfully", data);
      if (data?.payload?.success){
        dispatch(fetchAllAddresses(user?.id));
        setFormData(initialAddressFormData);
        toast.success("Address added successfully");
      }
    })
  }

  function handleDeleteAddress(getCurrentAddress) {
    // console.log("Delete Address", getCurrentAddress);
    dispatch(deleteAddress({userId: user?.id, addressId: getCurrentAddress?._id}))
    .then(data=>{
      // console.log("Address deleted successfully", data);
      if (data?.payload?.success){
        dispatch(fetchAllAddresses(user.id));
         toast.success("Address deleted successfully");
      }
    })
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }
 
   useEffect(() =>{
   dispatch(fetchAllAddresses(user.id))
   },[dispatch])

  // console.log("Address List", addressList);
  return (
    <>
      <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {
            addressList && addressList.length > 0 ?
            addressList.map(singleAddressItem => 
            <AddressCard
              key={singleAddressItem._id}
              addressInfo={singleAddressItem}
              handleDeleteAddress={handleDeleteAddress}
              handleEditAddress={handleEditAddress}

            />):null
          }
        </div>
        <CardHeader>
          <CardTitle>
            {
              currentEditedId ? "Edit Address" : "Add New Address"
            }
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={
              currentEditedId ? "Edit Address" : "Add Address"
            }
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Address;
