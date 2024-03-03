import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Post from './pages/Post';
import Account from './pages/Account';
import Album from './pages/Album';
import Detail from './pages/Detail';
import AccountAlbum from './pages/AccountAlbum';
import Setting from './pages/Settings';
import UpdatePost from './pages/EditFoto';
import EditAlbum from './pages/EditALbum';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/album' element={<Album/>}/>
        <Route path='/detail/:fotoId' element={<Detail/>}/>
        <Route path='/account/album' element={<AccountAlbum/>}/>
        <Route path='/setting' element={<Setting/>}/>
        <Route path='/edit/foto/:fotoId' element={<UpdatePost/>}/>
        <Route path='/edit/album/:albumId' element={<EditAlbum/>}/>
      </Routes>
    </Router>
  )
}

export default App
