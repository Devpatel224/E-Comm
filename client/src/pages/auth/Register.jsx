import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
};

function Register() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {toast} = useToast()

  const onsubmit = (e)=>{
      e.preventDefault()
      dispatch(registerUser(formData)).then((data)=>{
        if(data?.payload?.success){
          toast({
            title:data?.payload?.message
          })
          navigate('/auth/login')
        }else{
          toast({
            title:data?.payload,
            variant:'destructive',
          })
        }
        console.log(data)
      })
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
