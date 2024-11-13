import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/config";
import {useState} from "react";
import { Link } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
};

function Register() {
  const [formData, setFormData] = useState(initialState);

  const onsubmit = ()=>{

  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create New account
        </h1>
        <p className="mt-2">
          Already Have an account
          <Link
            to="/auth/login"
            className="font-medium ml-2 text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm 
      formControls={registerFormControls}
      buttonText={'Create Account'}
      formData={formData}
      setFormData={setFormData}
      onsubmit={onsubmit}
      />
    </div>
  );
}

export default Register;
