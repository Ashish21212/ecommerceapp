import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { loginFormControl } from "../../config/config";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice/";
import { toast } from "sonner";

const initialState = {
  
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .then((data) => {
          if(data?.payload?.success) {
           toast.success(data?.payload?.message)
          }else{
            toast.error(data?.payload?.message);
          }
            
      })
      
    
  }
 
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline "
            to="/auth/register"
          >
           Signup
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControl}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
       
      />
    </div>
  );
};

export default AuthLogin;
