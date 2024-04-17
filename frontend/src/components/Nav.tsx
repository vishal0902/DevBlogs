import { useNavigate } from 'react-router-dom'
import { Avatar } from '../pages/Blogs'
import { useRecoilValue } from 'recoil'
import { userDataAtom } from '../strore/atom/BlogSelector'

export const  Nav = () =>{
  
    const userName = useRecoilValue(userDataAtom)
    const navigate = useNavigate()
    return (
    <div>
        <div className='flex justify-between py-4 px-5 border-b shadow-sm'>
            <div onClick={()=>{navigate("/blogs")}} className='flex flex-col justify-center text-4xl font-bold text-slate-900 pb-2.5 cursor-pointer'>
                DevBlogs.to
            </div>
            <div className='flex flex-col justify-center space-x-4'>
                <div className='flex justify-center'>
                <div>
                    <button 
                        onClick={()=>{
                            navigate("/blog/publish")
                        }} 
                    type="button" className="text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2">Publish new blog</button>
                </div>
                <Avatar name={userName} size="big"/>
                </div>
            </div>
        </div>
    </div>
  )
}
