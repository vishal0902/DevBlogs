import { Nav } from "./Nav"

export default function Skeleton({blogPreview}:{blogPreview?: boolean}) {
  
    if(blogPreview){
                return (
                <div>
                    <BlogPreviewSekleton />
                    <BlogPreviewSekleton />
                    <BlogPreviewSekleton />
                    <BlogPreviewSekleton />
                    <BlogPreviewSekleton />
                    
            
            
            
                </div>
            )

    }
  


 return(
        <div>
                    <Nav />

        <div className="grid grid-cols-12 animate-pulse">
            <div className="col-span-8">
                <div className="p-10 flex flex-col justify-center">
                    <div className="text-5xl font-bold">
                    <div className="h-20 bg-gray-200 rounded-sm  max-w-lg mb-2.5"></div>

                        </div>
                    <div className="text-xl font-normal mt-4">
                <div className="h-56 bg-gray-200 rounded-sm  w-full mb-2.5"></div>

                    </div>
                </div>
            </div>
            <div className="col-span-4">
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

 )



}


export const BlogPreviewSekleton = () => {
    return (
        <div className="flex justify-center animate-pulse">
                <div className=" max-w-lg p-6 bg-white border-b border-gray-200 ">
                    <div className="flex space-x-1 mb-2 min-w-[500px] ">
                        <div className="h-8 bg-gray-200 rounded-full  w-8"></div>
            
                        <div className="flex flex-col justify-center">
            
                        <div className="h-8 bg-gray-200 rounded-full  w-20 mb-4"></div>
                        </div>
            
                        <div className="h-8 bg-gray-200 rounded-full  w-20 mb-4"></div>
            
                    </div>
                    <div className="h-8 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
            
                    <div>
                    <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
            
                    </div>
                    <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full  max-w-[100px] mt-5"></div>
            
                    </div>
                </div>
                </div>
    );
}