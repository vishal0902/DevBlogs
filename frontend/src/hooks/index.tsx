import axios from "axios"
import { useEffect, useState } from "react"

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
        axios.get(`http://127.0.0.1:8787/api/v1/blog/${id}`, {
            headers: { Authorization: localStorage.getItem("jwt") }}).then((res) => {
            setBlog(res.data.blog)
            setLoading(false)
        })
    }, [])

    return {blog, loading}
}

interface userType {
    name: string,
    blogs: any
}

export const useBlogs = () => {
    const [user, setUser] = useState<userType>({
        name: "",
        blogs: []
    });
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)


  
    const fetchBlogs = async () => {
      const response = await axios.get("http://127.0.0.1:8787/api/v1/blog/bulk", {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
      setUser(response.data.user)
      setBlogs(response.data.blogs);
      setLoading(false)
    };
  
    useEffect(() => {
      fetchBlogs();
    }, []);
  
    return { user, blogs, loading };
  };