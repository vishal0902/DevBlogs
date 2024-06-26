import { Link, useNavigate } from "react-router-dom";
import InputElement from "./InputElement";
import Button from "./Button";
import { useState } from "react";
import { SignupType } from "@vishal0902/common-app";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../strore/atom/BlogSelector";
import toast, { Toaster } from 'react-hot-toast';

interface FormType {
    type : string
}

export default function AuthForm({type}: FormType) {
    
  const [postInput, setPostInput] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  })
  
  const [userName, setUserName] = useRecoilState(userDataAtom)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  

  const handleSignup = async () => {
    setLoading(true)
    console.log(userName)
       try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInput);
      console.log(response.data.jwtToken)
      localStorage.setItem("jwt", response.data.jwtToken)
      setUserName(String(postInput.name))
      navigate("/blogs")
      
    } catch (error:any) {
        toast.error(error.response.data.error);
        setLoading(false)
    }
    

  }

  const handleSignin = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInput);
      console.log(response.data.jwtToken)
      localStorage.setItem("jwt", response.data.jwtToken)
      setUserName(String(postInput.name))
      navigate("/blogs")
      
    } catch (error: any) {
        toast.error(error.response.data.error);
        setLoading(false)
    }
    

  }

  return (
      <div className="flex flex-col h-screen justify-center w-full">
        <div className="flex justify-center ">
          <div className="max-w-md">
            <div className="flex flex-col justify-center">
                <div className="font-bold text-4xl text-center">{type=="signup"?"Create an account":"Login to your account"}</div>
                <div className="font-normal text-sm text-center text-slate-400 mt-1 mb-3" >{type=="signup"? <div>Already have an account? <Link to="/signin" className="underline">Login</Link></div>: <div>Don't have an account? <Link to="/signup" className="underline">Create an account</Link></div>} </div>
                {type=="signup" && <InputElement type="text" placeholder="Enter your name" label="Your Name" onChange = {(e)=>setPostInput({...postInput, name: e.target.value})} />}
                <InputElement type="text" placeholder="abc@example.com" label="Email" onChange = {(e)=>setPostInput({...postInput, email: e.target.value})}/>
                <InputElement type="password" placeholder="123456" label= "Password" onChange = {(e)=>setPostInput({...postInput, password: e.target.value})}/> 
                <div className="mt-4">
                    <Button loading={loading} buttonText={type=="signup"?"Signup":"Login"} onClick = {type=="signup"?handleSignup:handleSignin} />   
                </div>          
            </div>
          </div>
        </div>
        <Toaster 
           
          toastOptions={{
            success: {
              style: {
                background: 'green',
              },
            },
            error: {
              position: 'top-center',
              duration: 2000,
              
              style: {
                border: '1px solid #713200',
                width: '300px',
                padding: '16px',
                color: '#713200',
                boxShadow: '2px'
              },
            },
          }}
        
        />
      </div>
    );
  }
  