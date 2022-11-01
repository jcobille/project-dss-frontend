import React from "react";
import "./index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import DetailsPage from "./components/DetailsPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/movie/details/:id" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
