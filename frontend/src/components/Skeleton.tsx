import { Nav } from "./Nav";

export default function Skeleton({ blogPreview }: { blogPreview?: boolean }) {
  if (blogPreview) {
    return (
      <div>
        <BlogPreviewSekleton />
        <BlogPreviewSekleton />
        <BlogPreviewSekleton />
        <BlogPreviewSekleton />
        <BlogPreviewSekleton />
        <BlogPreviewSekleton />
        <BlogPreviewSekleton />
        <BlogPreviewSekleton />
        <BlogPreviewSekleton />
      </div>
    );
  }

  return (
    <div>
      <Nav />

      <div className="grid col-span-1 md:grid-cols-12 animate-pulse">
        <div className="md:col-span-8">
          <div className="p-10 flex flex-col justify-center">
            <div className="text-5xl font-bold">
              <div className="h-20 bg-gray-200 rounded-sm  max-w-lg mb-2.5"></div>
            </div>
            <div className="text-xl font-normal mt-4">
              <div className="h-56 bg-gray-200 rounded-sm  w-full mb-2.5"></div>
            </div>
          </div>
        </div>
        <div className="md:col-span-4">
          <div className="p-10">
            <div className="text-slate-500 text-base">
              <div className="h-8 bg-gray-200 rounded-sm max-w-[330px] w-52 mb-2.5"></div>
            </div>
            <div className="flex mt-3 space-x-3">
              <div className="h-10 bg-gray-200 rounded-full  w-10"></div>

              <div className="h-8 bg-gray-200 rounded-sm  w-40 mb-2.5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const BlogPreviewSekleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-8 justify-center">
      <div className="md:flex hidden col-span-2"></div>
      <div className=" md:col-span-4 max-w-full  p-6 bg-white border-b border-gray-200 ">
        <div className="flex space-x-1 mb-2 ">
          <div className="h-8 bg-gray-200 rounded-full  w-8"></div>

          <div className="flex flex-col justify-center">
            <div className="h-8 bg-gray-200 rounded-full  w-20 mb-4"></div>
          </div>

          <div className="h-8 bg-gray-200 rounded-full  w-20 mb-4"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded-full  max-w-[450px] mb-2.5"></div>

        <div>
          <div className="h-2 bg-gray-200 rounded-full  max-w-[500px] mb-2.5"></div>
        </div>
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full  max-w-[100px] mt-5"></div>
        </div>
      </div>
      <div className="md:flex hidden col-span-2"></div>

    </div>
  );
};
