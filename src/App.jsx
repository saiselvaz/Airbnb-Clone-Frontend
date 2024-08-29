import React from "react"
import { Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout.jsx"
import IndexPage from "./components/pages/IndexPage.jsx"
import LoginPage from "./components/pages/LoginPage.jsx"
import RegisterPage from "./components/pages/RegisterPage.jsx"
import axios from 'axios'
import { UserContextProvider } from "./components/UserContext"
import ProfilePage from "./components/pages/ProfilePage.jsx"
import PlacesPage from "./components/pages/PlacesPage.jsx"
import PlacesFormPage from "./components/pages/PlacesFormPage.jsx"
import PlacePage from "./components/pages/PlacePage.jsx"
import BookingsPage from "./components/pages/BookingsPage.jsx"
import BookingPage from "./components/pages/BookingPage.jsx"

axios.defaults.baseURL = "https://airbnb-clone-backend-bl33.onrender.com",
  axios.defaults.withCredentials = true;

export default function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="/account/places" element={<PlacesPage/>} />
            <Route path="/account/places/new" element={<PlacesFormPage/>} />
            <Route path="/account/places/:id" element={<PlacesFormPage/>} />
            <Route path="/place/:id" element={<PlacePage/>} />
            <Route path="/account/bookings" element={<BookingsPage />} />
            <Route path="/account/bookings/:id" element={<BookingPage/>} />

          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}
