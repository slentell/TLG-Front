import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoachDashboard from "./pages/CoachDashboard";
import AthleteDashboard from "./pages/AthleteDashboard";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import ImageGallery from "./pages/ImageGallery";
import AddLift from "./components/AddLift/AddLift";
import Activate from "./pages/Activate";
import NewTeam from "./components/NewTeam/NewTeam";

// import AppNav from '../components/AppNav/AppNav'
import { AppContextProvider } from "./Providers/AppContextProvider";
import Layout from "./hocs/Layout";
import Posts from "./components/Posts/Posts";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import BellRinger from "./components/BellRinger/BellRinger";
import LiftHistory from "./components/Lifts/LiftHistory";

// Stream Chat 
import Chat from "./components/Chat/Chat";
import UnauthedRoute from "./UnauthedRoute";
import AuthedRoute from "./AuthedRoute";

function App() {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <Router>
         
          <Layout>
            <Routes>
                {/* <UnauthedRoute path="/auth/login" component={SignIn} />
                <AuthedRoute path="/" component={Chat} /> */}
              <Route path="/" element={<HomePage />} />
              <Route path="/coach-dashboard" element={<CoachDashboard />} />
              <Route path="/athlete-dashboard" element={<AthleteDashboard />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/images" element={<ImageGallery />} />
              <Route path="/add-lift-session" element={<AddLift />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/activate" element={<Activate />} />
              <Route path="/new-team" element={<NewTeam />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path='/bell-ringers' element={ <BellRinger /> } />
              <Route path='/progress' element={<LiftHistory/>} />
              <Route path='/chat' element={ <Chat /> } />
              {/*
            <Route path='/calendar' element={ <ImageGallery /> } />
          */}
            </Routes>
          </Layout>
        
        </Router>
      </AppContextProvider>
    </Provider>
  );
}

export default App;
