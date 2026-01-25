
import { Nav } from "../components/Nav";
import { Link } from "react-router-dom";
import {  useMyBlogs } from "../hooks";
import Skeleton from "../components/Skeleton";
import React from "react";
// import { Avatar } from "../components/Avatar";
import { useRecoilValue } from "recoil";
import { userNameState } from "../strore/atom/userNameState";
import { BlogCard } from "./Blogs";

export const MyBlogs = React.memo(() => {
  
  // const {user, blogs} = useRecoilValue(allBlogsSelector)
 const { blogs, loading} = useMyBlogs()
//  const navigate = useNavigate()

//  const [userData, setUserData] = useRecoilState(userDataAtom)
//  setUserData({...user})
  const userName = useRecoilValue(userNameState);

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
        <div className=" p-4 mt-4 justify-center text-slate-800 text-xl font-semibold ">You have not written any blog yet. <Link className="cursor-pointer text-blue-700 underline font-normal hover:font-semibold" to="/blog/publish">write one.</Link> </div>
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
            author={userName} 
            title={blog.title}
            content={blog.content}
            date={blog.createdAt}
          />
        );
      })}
    </div>
  );
});

// type BlogCardType = {
//   id: number;
//   author: string;
//   title: string;
//   content: string;
//   date: string;
// };

// export const BlogCard = React.memo(({ id, author, title, content, date }: BlogCardType) => {
//   return (
//     <Link to={`/blog/${id}`}>
//     <div className="flex justify-center">
//       <div className=" max-w-lg p-6 bg-white border-b border-gray-200 ">
//         <div className="flex space-x-1 mb-2 min-w-[32rem] ">
//           <Avatar name={author} />
//           <div className="pl-2">{author}</div>
//           <div className="flex flex-col font-bold text-gray-400 justify-center">
//             &#xb7;
//           </div>
//           <div className="text-gray-400 ">{date.slice(0, 10)}</div>
//         </div>
//         <div className="text-2xl font-serif font-bold mb-2">{title.slice(0, 100)}</div>
//         <div className="font-sans">
//           {content.length > 100 ? content.slice(0, 100) + "..." : content}
//         </div>
//         <div className="mt-4">
//           {Math.ceil(content.length / 100)} minute(s) read
//         </div>
//       </div>
//     </div>
//     </Link>
//   );
// });



