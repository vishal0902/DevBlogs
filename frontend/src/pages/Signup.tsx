import Quote from "../components/Quote"
import AuthForm from "../components/AuthForm"

export const Signup = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 ">
        <div className="col-span-1 h-screen">
          <AuthForm type="signup" />  
        </div>
        <div className="lg:flex hidden col-span-1 "><Quote/></div>
    </div>
  )
}
