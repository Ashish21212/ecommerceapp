import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { registerFormControl } from "../../config/config";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const onSubmit = (e) => {}
 
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
