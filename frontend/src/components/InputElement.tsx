import { ChangeEvent } from "react"

type InputType = {
    label:string,
    type: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function InputElement({label, type, placeholder, onChange, onKeyDown}: InputType) {
    
    return (
    <div className="flex flex-col mt-3  ">
        <div className="font-semibold mb-1">{label}</div>
        <input type={type} placeholder={placeholder} onChange={onChange} onKeyDown={onKeyDown} className="border border-slate-400 rounded-md py-1 px-2"/>
    </div>
  )
}
