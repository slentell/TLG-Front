import './App.css';
import { Provider } from "react-redux";
import store from './store';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CoachDashboard from './pages/CoachDashboard'
import AthleteDashboard from './pages/AthleteDashboard'
import SignUp from './pages/Signup'
import SignIn from './pages/SignIn'
import ImageGallery from './pages/ImageGallery'
// import AppNav from '../components/AppNav/AppNav'
import MenuAppBar from './components/AppNav/TopNav';


function App() {
  return (
    <Provider store={store}>
      <Router> 
        <MenuAppBar />
        <Routes> 
          <Route path='/' element={ <HomePage /> } />
          <Route path='/coach-dashboard' element={ <CoachDashboard /> } />
          <Route path='/athlete-dashboard' element={ <AthleteDashboard /> } />
          <Route path='/signup' element={ <SignUp /> } />
          <Route path='/signin' element={ <SignIn /> } />
          <Route path='/images' element={ <ImageGallery /> } />
        </Routes>
      </Router >
    </Provider>
  );
}

export default App;
