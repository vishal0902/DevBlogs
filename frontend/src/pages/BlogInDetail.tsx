import { useParams } from "react-router-dom"
import { useBlogInDetail } from "../hooks"
import { Nav } from "../components/Nav"
import { Avatar } from "./Blogs"
import Skeleton from "../components/Skeleton"

export default function BlogInDetail() {
    const id = useParams().id
  const {blog, loading} = useBlogInDetail(id)
  
    if(loading){
        return <div>
            <Nav name={blog.author.name}/>
            <Skeleton/>
            </div>
    }

  return (
    <div>
        <Nav name={blog.author.name}/>
        <div className="grid grid-cols-12">
            <div className="col-span-8">
                <div className="p-10 flex flex-col justify-center">
                    <div className="text-5xl font-bold">{blog.title}</div>
                    <div className="text-xl font-normal mt-4">{blog.content}</div>
                </div>
            </div>
            <div className="col-span-4">
                <div className="p-10">
                    <div className="text-slate-500 text-base">Author</div>
                    <div className="flex mt-3 space-x-3">
                        <div><Avatar name={blog.author.name} size="big"/></div>
                        <div className="flex flex-col justify-center text-lg text-slate-600">{blog.author.name} </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
