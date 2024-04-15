import { useState } from "react";
import { Nav } from "../components/Nav";
import { useBlogs } from "../hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Publish = () => {
  const { user } = useBlogs();

  return (
    <div>
      <div>
        <Nav name={user.name} />
      </div>
      <div>
        <BlogForm />
      </div>
    </div>
  );
};

export const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

    const navigate = useNavigate()

  return (
    <div className="mt-10">
      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          <input
            type="text"
            id="large-input"
            className="max-w-lg block w-full p-4 text-gray-900 border focus:outline-none rounded-lg bg-gray-50 text-base "
            placeholder="Title"
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <textarea
            id="message"
            rows={6}
            className=" max-w-lg block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border  focus:outline-none "
            placeholder="Write your thoughts here..."
            onChange={e=>setContent(e.target.value)}
            />
        </div>
        <div className="flex justify-center">
            <div className="max-w-lg w-full">
            <button onClick={()=>{
                axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content
                },{
                    headers:{
                        Authorization: localStorage.getItem("jwt")
                    }
                }).then((response)=>{
                    const blogId = response.data.blog.id
                    navigate(`/blog/${blogId}`)
                })
            }} type="button" className="max-w-lg mt-5 text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2">
                Publish
            </button>
            </div>
            
        </div>
      </div>
    </div>
  );
};
