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
import AddLift from './components/AddLift/AddLift'
// import AppNav from '../components/AppNav/AppNav'
import MenuAppBar from './components/AppNav/TopNav';
import { AppContextProvider } from './Providers/AppContextProvider';
import Layout from './hocs/Layout';


function App() {
  return (
    <Provider store={store}>
      <AppContextProvider>
   
      <Router> 
        <Layout>
          <Routes> 
            <Route path='/' element={ <HomePage /> } />
            <Route path='/coach-dashboard' element={ <CoachDashboard /> } />
            <Route path='/athlete-dashboard' element={ <AthleteDashboard /> } />
            <Route path='/signup' element={ <SignUp /> } />
            <Route path='/signin' element={ <SignIn /> } />
            <Route path='/images' element={ <ImageGallery /> } />
            <Route path='/add-lift-session' element={ <AddLift /> } />
            {/* <Route path='/bell-ringers' element={ <ImageGallery /> } />
            <Route path='/calendar' element={ <ImageGallery /> } />
            <Route path='/chat' element={ <ImageGallery /> } /> */}
          </Routes>
        </Layout>
      </Router >
      </AppContextProvider>
    </Provider>
  );
}

export default App;
