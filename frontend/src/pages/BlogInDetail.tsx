import { useParams } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Avatar } from "./Blogs";
import { useRecoilValue } from "recoil";
import { blogSelectorFamily } from "../strore/atom/BlogSelector";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function BlogInDetail() {
  const id = useParams().id;
  // const {blog, loading} = useBlogInDetail(id)

  const blog = useRecoilValue(blogSelectorFamily(id));

  return (
    <div>
      <Nav />
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <div className="px-10 py-4 flex flex-col justify-center">
            <div className="text-5xl font-bold">{blog.title}</div>
            <div className="text-xl font-normal mt-4 mb-4">{blog.content}</div>
            <div className="flex justify-start">
                <Likes blogId={id} />

            </div>

          </div>
        </div>
        
        <div className="col-span-4">
          <div className="p-10">
            <div className="text-slate-500 text-lg font-light border-b ">Author</div>
            
            <div className="flex mt-2 space-x-3">
              <div>
                <Avatar name={blog.author.name} size="big" />
              </div>
              <div className="flex flex-col justify-center text-lg text-slate-500">
                <div className="font-semibold">
                {blog.author.name}

                </div>
                <div className="text-slate-400 text-lg font-normal mt-2 flex leading-6 ">
                Penning dreams into reality, one page at a time. Welcome to the realm of my development.

                </div>
                
              </div>
            </div>

            
          </div>
        </div>
      </div>
      <div className="mx-10">

        <div className="text-4xl font-semibold my-3">Comments</div>
        <Comment blogId={id} />
      </div>
    </div>
  );
}

export const Likes = ({ blogId }: { blogId: String | undefined }) => {
  const [LikeCount, setLikeCount] = useState("");
  const [isLiked, setIsLiked] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/liked/${blogId}`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((response: { data: { likeCount: string; isLiked: boolean } }) => {
        setLikeCount(response.data.likeCount);
        setIsLiked(response.data.isLiked.toString());
        setLoading(false);
      });
  }, [trigger]);

  if (isLiked) {
    return (
      <div>
        <div className="flex space-x-2">
          {loading ? (
            <LikeButtonLoader isLiked={isLiked} />
          ) : (
            <svg
              onClick={() => {
                setLoading(true);

                axios
                  .delete(`${BACKEND_URL}/api/v1/blog/like/${isLiked}`, {
                    headers: { Authorization: localStorage.getItem("jwt") },
                  })
                  .then((response) => setTrigger((prev) => !prev));
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 cursor-pointer">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          )}

            <div className="flex flex-col justify-center text-lg text-slate-600">{LikeCount}</div>

        </div>

        {/* <div className="text-slate-500 text-base">Liked</div> */}
      </div>
    );
  }

  return (
    <div>
      <div className="flex space-x-2">
        {loading ? (
          <LikeButtonLoader isLiked={isLiked} />
        ) : (
          <svg
            onClick={() => {
              setLoading(true);

              axios
                .post(
                  `${BACKEND_URL}/api/v1/blog/like`,
                  { blogId },
                  { headers: { Authorization: localStorage.getItem("jwt") } }
                )
                .then((response) => setTrigger((prev) => !prev));
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-7 h-7 cursor-pointer">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        )}

        <div className="flex flex-col justify-center text-lg text-slate-500">{LikeCount}</div>
      </div>
      {/* <div  className="text-slate-500 text-base">Like</div> */}
    </div>
  );
};

export const LikeButtonLoader = ({ isLiked }: { isLiked: string }) => {
  if (isLiked) {
    return (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7  animate-ping">
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-7 h-7 animate-ping">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </div>
  );
};

export const Comment = ({ blogId }: { blogId: string | undefined }) => {
  const [content, setContent] = useState("");
  const [flag, setFlag] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/comment/${blogId}`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((response) => setComments(response.data.comments));
  }, [flag]);

  return (
    <div>
      {/* //Add comment section */}
      <div className="flex flex-col justify-center mb-4">
        <div className="flex justify-start">
          <textarea
            id="message"
            value={content}
            rows={3}
            className=" max-w-lg block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border  focus:outline-none "
            placeholder="your comments here..."
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-start">
          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/comment`,
                { content, blogId },
                {
                  headers: {
                    Authorization: localStorage.getItem("jwt"),
                  },
                }
              );
              setFlag(!flag);
              setContent("");
              console.log(response.data);
            }}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2">
            Comment
          </button>
        </div>
      </div>

      {/* //All comments section */}
      {comments.map(
        (comment: {
          id: number;
          content: string;
          commentor: { name: string };
        }) => {
          return (
            <div className="flex flex-col max-w-screen-sm justify-center border shadow-md p-5 mb-4 rounded-md">
              <div className="flex space-x-2">
                <Avatar name={comment.commentor.name} size="small" />
                <div className="flex flex-col justify-center">
                  <div className="text-slate-500 text-sm font-light">
                    {comment.commentor.name}
                  </div>
                </div>
              </div>
              <div className="text-slate-500 text-sm font-normal ml-8 mt-1">
                {comment.content}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
