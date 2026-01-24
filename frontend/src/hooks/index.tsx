import axios from "axios"
import { useCallback, useEffect, useMemo, useState } from "react"
import { BACKEND_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userNameState } from "../strore/atom/userNameState";

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

    return useMemo(() => ({blog, loading}), [blog, loading]);
}



export const useBlogs = (setHasMore : any, page: any) => {
    
    const navigate = useNavigate()

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false)
    // const [, setUserData] = useRecoilState(userDataAtom)
    const setUserName = useSetRecoilState(userNameState);


  
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwt");
        console.log('Token: ',token);
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk?page=${page}&limit=10`, {
            headers: { Authorization: token },
            withCredentials: false
          });

          if(response.data.blogs.length < 10) setHasMore(false);
          console.log(response.data);
          setBlogs(prevItems => {
          return [...new Set([...prevItems, ...response.data.blogs])]; 
          });
          setLoading(false)
          setUserName(response.data.user.name)
      } catch (error) {
        navigate('/signin')
      }
    };
  
    useEffect(() => {
      fetchBlogs();
    }, [page]);
  
    return useMemo(() => ({blogs, loading}), [blogs, loading]);

  };


  export const useMyBlogs = () => {
    
    const navigate = useNavigate()

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)


  
    const fetchBlogs = useCallback(async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/getMyBlogs`, {
            headers: { Authorization: localStorage.getItem("jwt") },
            withCredentials: false
          });
          console.log(response.data.blogs);
          setBlogs(response.data.blogs);
          setLoading(false)
      } catch (error) {
        navigate('/signin')
      }
    },[blogs]);
  
    useEffect(() => {
      fetchBlogs();
    }, []);
  
        return useMemo(() => ({blogs, loading}), [blogs, loading]);

  };