import React from "react";
import { Route, Routes } from "react-router";
import LandingPage from "../../pages/LandingPage";

export const HomePageRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};
