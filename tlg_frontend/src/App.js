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
import AddLiftSession from './pages/AddLiftSession'
// import AppNav from '../components/AppNav/AppNav'
import MenuAppBar from './components/AppNav/TopNav';
import { AppContextProvider } from './Providers/AppContextProvider';


function App() {
  return (
    <Provider store={store}>
      <AppContextProvider>
   
      <Router> 
        <MenuAppBar />
        <Routes> 
          <Route path='/' element={ <HomePage /> } />
          <Route path='/coach-dashboard' element={ <CoachDashboard /> } />
          <Route path='/athlete-dashboard' element={ <AthleteDashboard /> } />
          <Route path='/signup' element={ <SignUp /> } />
          <Route path='/signin' element={ <SignIn /> } />
          <Route path='/images' element={ <ImageGallery /> } />
          <Route path='/add-lift-session' element={ <AddLiftSession /> } />
          {/* <Route path='/bell-ringers' element={ <ImageGallery /> } />
          <Route path='/calendar' element={ <ImageGallery /> } />
          <Route path='/chat' element={ <ImageGallery /> } /> */}
        </Routes>
      </Router >
      </AppContextProvider>
    </Provider>
  );
}

export default App;
