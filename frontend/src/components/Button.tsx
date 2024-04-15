
interface ButtonType {
    buttonText: string,
    onClick: (e:any)=> void;
}


export default function Button({buttonText, onClick}:ButtonType) {
  return (
    <div className="flex">
        <button onClick={onClick} className="py-2 px-10 w-full bg-black text-white rounded-md" >{buttonText}</button>
    </div>
  )
}
