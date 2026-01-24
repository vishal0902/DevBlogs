import { useState } from "react";
import { Nav } from "../components/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ButtonLoader } from "../components/ButtonLoader";
import { Editor } from "@tinymce/tinymce-react";


export const Publish = () => {

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div>
        <BlogForm />
      </div>
    </div>
  );
};

export const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const editorRef = useState(null)[1]

    const navigate = useNavigate()


  return (
    <div className="mt-10 p-5">
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
        <div className="flex justify-center mt-5">
          <div className="max-w-lg block w-full">
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API}
              onInit={(evt, editor) => editorRef(editor)}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                menubar: false,
                height: 400,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | bold italic forecolor',
                skin: 'oxide',
                content_css: 'default',
                body_class: 'mce-content-body',
                content_style: `
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; font-size: 14px; line-height: 1.6; color: #1f2937; }
                  p { margin: 0.5em 0; }
                  code { background-color: #f3f4f6; color: #374151; padding: 2px 4px; border-radius: 3px; }
                  pre { background-color: #f3f4f6; color: #374151; padding: 10px; border-radius: 5px; overflow-x: auto; }
                `,
              }}
            />
          </div>
        </div>
        <div className="flex justify-center">
            <div className="max-w-lg w-full">
            <button onClick={()=>{
                setLoading(true)
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
                {loading?<div className="flex space-x-2"><div>Publish</div><ButtonLoader /></div>:<div>Publish</div>}
            </button>
            </div>
            
        </div>
      </div>
    </div>
  );
};
