import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { MyListFilm } from "./pages/MyListFilm";
import { AddFilm } from "./pages/AddFilm";
import { DetailFilm } from "./pages/DetailFilm";
import { Profile } from "./pages/Profile";
import { API, setAuthToken } from "./api/api";
import { FilmsContextProvider } from "./context/filmsContext";
import { useEffect } from "react";
import Transactions from "./pages/Transactions";
import { PrivateRouteAdmin } from "./components/PrivateRouteAdmin";
import { PrivateRouteUser } from "./components/PrivateRouteUser";

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return (
    <FilmsContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<PrivateRouteUser />}>
          <Route path="/AddFilm/" element={<AddFilm />} />
          <Route path="/Transactions/" element={<Transactions />} />
        </Route>
        <Route path="/" element={<PrivateRouteAdmin />}>
          <Route path="/MyListFilm/" element={<MyListFilm />} />
          <Route path="/DetailFilm/:id" element={<DetailFilm />} />
          <Route path="/Profile/" element={<Profile />} />
        </Route>
      </Routes>
    </FilmsContextProvider>
  );
}

export default App;
