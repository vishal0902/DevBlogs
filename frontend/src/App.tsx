import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import {Blogs} from "./pages/Blogs"
import BlogInDetail from "./pages/BlogInDetail"
import { Publish } from "./pages/Publish"
import { RecoilRoot } from "recoil"
import { Suspense } from "react"
import Skeleton from "./components/Skeleton"


function App() {

  return (<div>
    <RecoilRoot>
      
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/blogs" element={<Suspense fallback={<div><Skeleton blogPreview={true}/></div>}><Blogs /></Suspense>}></Route>
        <Route path="/blog/:id" element={<Suspense fallback={<div><Skeleton/></div>}><BlogInDetail /></Suspense>}></Route>
        <Route path="/blog/publish" element={<Publish />}></Route>
      </Routes>
    </BrowserRouter>
    
    </RecoilRoot> 
  </div>)
}

export default App
