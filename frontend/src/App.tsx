import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register.jsx";
import SignIn from "./pages/SignIn.jsx";
import AddEvent from "./pages/AddEvent.jsx";
import { useAppContext } from "./contexts/AppContext";
import MyEvents from "./pages/MyEvents.jsx";
import EditEvent from "./pages/EditEvent.jsx";
import Search from "./pages/Search.jsx";
import Detail from "./pages/Detail.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:eventId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            
            <Route
              path="/add-event"
              element={
                <Layout>
                  <AddEvent />
                </Layout>
              }
            />
            <Route
              path="/edit-event/:eventId"
              element={
                <Layout>
                  <EditEvent />
                </Layout>
              }
            />
            <Route
              path="/my-events"
              element={
                <Layout>
                  <MyEvents />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
