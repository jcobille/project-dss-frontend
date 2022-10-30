import React from "react";
import "./index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./controllers/HomePage";
import DetailsPage from "./controllers/DetailsPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/movie/:title" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
