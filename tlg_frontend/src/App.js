import './App.css';
import { Provider } from "react-redux";
import store from './store';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CoachDashboard from './pages/CoachDashboard'
import StudentDashboard from './pages/StudentDashboard'
// import AppNav from '../components/AppNav/AppNav'
import MenuAppBar from './components/AppNav/TopNav';


function App() {
  return (
    <Provider store={store}>
      <Router> 
        <MenuAppBar />
      {/* <AppNav /> */}
        <Routes> 
          <Route path='/' element={ <HomePage /> } />
          <Route path='/coach-dashboard' element={ <CoachDashboard /> } />
          <Route path='/student-dashboard' element={ <StudentDashboard /> } />
        </Routes>
      </Router >
    </Provider>
  );
}

export default App;
