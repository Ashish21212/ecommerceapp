import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { registerFormControl } from "../../config/config";
import { registerUser } from '../../store/auth-slice/'
import { toast } from "sonner";


const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const onSubmit = (e) => {
   e.preventDefault()
   dispatch(registerUser(formData))
  
   .then((data)=>{
    
    if(data?.payload?.success){
      navigate('/auth/login')
      toast.success(data?.payload?.message, {
        style: {
          background: 'green',
          color: 'white',
        }
      });
    }else
    {
      toast.success(data?.payload?.message, {
        style: {
          background: 'red',
          color: 'white',
        }
      });
    }
    // console.log(data)
   })
}
  // console.log(formData);
 
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create New Account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline "
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControl}
        buttonText={"Signup"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
       
      />
    </div>
  );
};

export default AuthRegister;
