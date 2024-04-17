import axios from "axios";
import { atom, selector, selectorFamily } from "recoil";

// export const  blogAtomFamily = atomFamily({
//     key: "blogSelector",
//     default: selectorFamily({
//         key: "blogSelectorFamily",
//         get: (blogId) => async ({}) => {
//             const response = await axios.get(`https://backend.vishal-sri0902.workers.dev/api/v1/blog/${String(blogId)}`,{
//                 headers:{
//                     Authorization: localStorage.getItem("jwt")
//                 }
//             })
//             return response.data.blog
            
//         }
//     })

// })


export const blogSelectorFamily = selectorFamily({
    key: "blogSelectorFamily",
    get: (blogId) => async ({}) => {
        const response = await axios.get(`https://backend.vishal-sri0902.workers.dev/api/v1/blog/${String(blogId)}`,{
            headers:{
                Authorization: localStorage.getItem("jwt")
            }
        })
        return response.data.blog
        
    }
})


// export const allBlogsSelector = selector({
//     key: "blogsSelector",
//     get: async ({get}) => {
//         const flag = get(flagAtom)
//         const response = await axios.get(`https://backend.vishal-sri0902.workers.dev/api/v1/blog/bulk`,{
//             headers:{
//                 Authorization: localStorage.getItem("jwt"),
//             }
//         })
//         return response.data
        
//     }
// })


export const userDataAtom = atom({
    key: "userDataAtom",
    default: ""
})