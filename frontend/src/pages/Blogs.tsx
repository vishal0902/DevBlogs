
import { Nav } from "../components/Nav";
import { Link } from "react-router-dom";
import { useBlogs } from "../hooks";
import Skeleton from "../components/Skeleton";

import React, { useCallback, useRef, useState } from "react";
import { Avatar } from "../components/Avatar";




export const Blogs = () => {
  


  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
 
  const { blogs, loading} = useBlogs(setHasMore, page)

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback((node:any)=>{
    if(loading) return;

    if(observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        setPage(prevPage => prevPage + 1)
      }
    });

    if(node) observer.current.observe(node);
  },[blogs, hasMore])
 
  // if(loading) {

  //   return (
  //     <div>
  //       <Nav />
  //       <Skeleton  blogPreview={true} />
  //     </div>
  //   )
  // }

 
  return (
    <div>
      <Nav  />

      {blogs.map((blog: any, index) => {
        if(blogs.length == index + 1 && hasMore == true) {
          return (
            <BlogCard
            key={blog.id}
            id= {blog.id}
            author={blog.author.name}
            title={blog.title}
            content={blog.content}
            date={blog.createdAt}
            lastRef={lastElementRef} 
          />
          )
        }

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
      })} {loading && <Skeleton  blogPreview={true} />}
      {!hasMore && <p style={{ textAlign: 'center' }}>No more data to load.</p>}
    </div>
  );
 }

type BlogCardType = {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
  lastRef?: (node: HTMLDivElement | null) => void;
};

export const BlogCard = React.memo(({ id, author, title, content, date, lastRef }: BlogCardType) => {
  return (
    <Link to={`/blog/${id}`}>
    <div ref={lastRef} className="grid grid-cols-1 md:grid-cols-8 justify-center">
      <div className="md:flex hidden col-span-2"></div>
      
      <div className="md:col-span-4 max-w-full  p-6 bg-white border-b border-gray-200 ">
        <div className="flex  space-x-1 mb-2 ">
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
      
      <div className="md:flex hidden col-span-2"></div>
    </div>
    </Link>
  );
});






