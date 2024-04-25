
import { Nav } from "../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import {  useMyBlogs } from "../hooks";
import Skeleton from "../components/Skeleton";

export const MyBlogs = () => {
  
  // const {user, blogs} = useRecoilValue(allBlogsSelector)
 const { blogs, loading} = useMyBlogs()
//  const navigate = useNavigate()

//  const [userData, setUserData] = useRecoilState(userDataAtom)
//  setUserData({...user})

 if(loading) {

    return (
      <div>
        <Nav  />
        <Skeleton  blogPreview={true} />
      </div>
    )
 }

 if(blogs.length === 0) {
    return (
       <div>
        <Nav  />
        <div className="flex p-4 mt-4 justify-center text-3xl font-semibold ">You have not written any blog yet. </div>
       </div>
    )
 }

  return (
    <div>
      <Nav />
      {blogs.map((blog: any) => {
        return (
          <BlogCard
            key={blog.id}
            id= {blog.id}
            author={blog.author.name}
            title={blog.title}
            content={blog.content}
            date={blog.createdAt}
          />
        );
      })}
    </div>
  );
};

type BlogCardType = {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
};

export const BlogCard = ({ id, author, title, content, date }: BlogCardType) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="flex justify-center">
      <div className=" max-w-lg p-6 bg-white border-b border-gray-200 ">
        <div className="flex space-x-1 mb-2 min-w-[32rem] ">
          <Avatar name={author} />
          <div className="pl-2">{author}</div>
          <div className="flex flex-col font-bold text-gray-400 justify-center">
            &#xb7;
          </div>
          <div className="text-gray-400 ">{date.slice(0, 10)}</div>
        </div>
        <div className="text-2xl font-serif font-bold mb-2">{title.slice(0, 100)}</div>
        <div className="font-sans">
          {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </div>
        <div className="mt-4">
          {Math.ceil(content.length / 100)} minute(s) read
        </div>
      </div>
    </div>
    </Link>
  );
};

export const Avatar = ({ name, size }: { name: string; size?: string }) => {
  if (size == "big") {
    return (
      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {name[0]}
        </span>
      </div>
    );
  } else {
    return (
      <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {name[0]}
        </span>
      </div>
    );
  }
};


