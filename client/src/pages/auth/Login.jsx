import { loginFormControls } from '@/config';
import {useState} from 'react'
import { Link } from 'react-router-dom';
import CommonForm from '@/components/common/CommonForm';

const initialState = {
  username: "",
  email: "",
  password: "",
};


function Login() {

  const [formData, setFormData] = useState(initialState);

  const onsubmit = ()=>{

  }
  
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account ?
          <Link
            to="/auth/register"
            className="font-medium ml-2 text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
      <CommonForm 
      formControls={loginFormControls}
      buttonText={'Create Account'}
      formData={formData}
      setFormData={setFormData}
      onsubmit={onsubmit}
      />
    </div>
  )
}

export default Login