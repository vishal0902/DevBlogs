import { ButtonLoader } from "./ButtonLoader";

interface ButtonType {
    buttonText: string,
    loading: boolean
    onClick: (e:any)=> void;
}


export default function Button({buttonText, loading, onClick}:ButtonType) {
 
  if(loading) {
     return (
    <div className="">
        <button onClick={onClick} className="py-2 px-10 w-full flex justify-center bg-white border-black rounded-md text-slate-600 border-2 space-x-2 animate-pulse" ><span>{buttonText} </span> <ButtonLoader/></button>
    </div>
     )
  }
  
  return (
    <div className="flex">
        <button onClick={onClick} className="py-2 px-10 w-full bg-black text-white rounded-md" >{buttonText}</button>
    </div>
  )
}
