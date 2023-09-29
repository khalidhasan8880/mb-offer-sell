
import { Outlet } from 'react-router-dom'
import './App.css'
import BottomNav from './components/BottomNav'
import Profile from './components/Profile'

function App() {
  
  return (
<>
<Profile user={{name:'khalid hasan',  email:'khalidhasan9888@gmail.com'}}></Profile>
    <Outlet></Outlet>
      <BottomNav></BottomNav>
  </>
  )
}

export default App
