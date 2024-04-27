import { useNavigate } from "react-router-dom";
import { Avatar } from "../pages/Blogs";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../strore/atom/BlogSelector";
import { useState } from "react";

export const Nav = () => {
  const userName = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  2;
  return (
    <div>
      <div className="grid grid-cols-1 w-full bg-gray-50">
        <div>
          <div className="flex justify-between py-4 px-5 border-b shadow-sm">
            <div
              onClick={() => {
                navigate("/blogs");
              }}
              className="flex flex-col justify-center text-4xl font-bold text-slate-900 pb-2.5 cursor-pointer">
              DevBlogs.to
            </div>

            <div className="flex flex-col justify-center space-x-4">
              <div className="flex justify-center space-x-4">
                <div className="">
                  <button
                    onClick={() => {
                      navigate("/blog/publish");
                    }}
                    type="button"
                    className="text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 md:flex hidden">
                    Publish new blog
                  </button>

                  <div
                    onClick={() => {
                      navigate("/blog/publish");
                    }}
                    className="border-2 rounded-full text-white bg-green-500 hover:bg-green-500 md:hidden flex cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-9 h-9">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setMenu(!menu);
                  }}
                  className="cursor-pointer">
                  <Avatar name={userName} size="big" />
                  {/* <button
                     onClick={()=>{
                        localStorage.removeItem("jwt")
                        navigate("/signin")
                     }}
                     className="hidden absolute mt-10 -ml-6   group-hover:block text-white bg-slate-600 hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-3xl text-sm px-4 py-2.5 text-center">Signout</button>         */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {menu ? (
          <div className="justify-center font-semibold ">
            <div
              onClick={() => {
                navigate("/myBlogs");
              }}
              className="cursor-pointer flex justify-end px-5 text-slate-500 text-lg hover:text-xl hover:text-slate-600 my-1">
              My Blogs
            </div>
            <div
              onClick={() => {
                localStorage.removeItem("jwt");
                navigate("/signin");
              }}
              className=" cursor-pointer flex justify-end px-5 text-slate-500 text-lg  hover:text-xl hover:text-slate-600">
              Logout
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
