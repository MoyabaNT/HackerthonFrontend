import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import Home from "./Components/Home"
import LogIn from "./Forms/LogIn"
import SignUp from "./Forms/SignUp"
import DashBoard from "./Components/DashBoard"
import Passangers from "./Components/Passangers"
import FAQs from "./Components/FAQs"
import Settings from "./Components/Settings"

const router = createBrowserRouter (
createRoutesFromElements(
  <>
    <Route index='/' element={<Home />} />
    <Route path='/LogIn' element={<LogIn />} />
    <Route path='/SignUp' element={<SignUp />} />
    <Route path='/DashBoard' element={<DashBoard />} />
    <Route path='/Passangers' element={<Passangers />} />
    <Route path='/FAQs' element={<FAQs />} />
    <Route path='/Settings' element={<Settings />} />
  </>
)
) 


function App() {

  return (
    <div>
      <RouterProvider router = {router} />
    </div>
  )
}

export default App
