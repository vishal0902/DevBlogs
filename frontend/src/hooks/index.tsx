import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../strore/atom/BlogSelector";

export interface Blog {
    id: number
    title: string;
    content: string;
    author: {
        name: string;
    }
}



export const useBlogInDetail = (id: any) => {
    const [blog, setBlog] = useState<Blog>({
        id: 0,
        title: "",
        content: "",
        author: {
            name: ""
        }
    })

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: { Authorization: localStorage.getItem("jwt") }}).then((res) => {
            setBlog(res.data.blog)
            setLoading(false)
        })
    }, [])

    return {blog, loading}
}

interface userType {
    name: string
}

export const useBlogs = () => {
    
    const [userName, setUserName]=  useRecoilState(userDataAtom)
    
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)


  
    const fetchBlogs = async () => {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
      setUserName(response.data.user.name)
      setBlogs(response.data.blogs);
      setLoading(false)
    };
  
    useEffect(() => {
      fetchBlogs();
    }, []);
  
    return { blogs, loading };
  };