import "./App.css";
import "/node_modules/primeflex/primeflex.css";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/themes/bootstrap4-dark-purple/theme.css"
// import "primereact/resources/themes/fluent-light/theme.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./SettingsPage";
import PlacesTable from "./Tables/PlacesTable";
import ActivitiesTable from "./Tables/ActivitiesTable";
import HotelsTable from "./Tables/HotelsTable";
import RestaurantsTable from "./Tables/RestaurantsTable";
import UserTable from "./Tables/UserTable";
import LandingPage from "./LandingPage";
import { useEffect, useState } from "react";
import SettingsPage from "./SettingsPage";
import UserPage from "./UserPage";
import PlacePage from "./UserPages/PlacePage";
import ActivityPage from "./UserPages/ActivityPage";
import HotelPage from "./UserPages/HotelPage";
import RestaurantPage from "./UserPages/RestaurantPage";
import AgentPage from "./UserPages/AgentPage";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <PrimeReactProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar user={user} setUser={updateUser} />
          <Routes>
            <Route path="/" element={<UserPage />} >
              <Route index element={<LandingPage user={user} />} />
              <Route path="place/:placeId" element={<PlacePage />} />
              <Route path="activity/:activityId" element={<ActivityPage />} />
              <Route path="hotel/:hotelId" element={<HotelPage />} />
              <Route path="restaurant/:restaurantId" element={<RestaurantPage />} />
              {user && <Route path="travel-genie" element={<AgentPage username={user.username}/>} />}
            </Route>
            {user && user.role !== "user" && (
              <Route path="/settings" element={<SettingsPage user={user} />}>
                <Route index element={<LandingPage user={user} />} />
                <Route path="places" element={<PlacesTable />} />
                <Route path="activities" element={<ActivitiesTable />} />
                <Route path="hotels" element={<HotelsTable />} />
                <Route path="restaurants" element={<RestaurantsTable />} />
                <Route path="users" element={<UserTable />} />
              </Route>
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
