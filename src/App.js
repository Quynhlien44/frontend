import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ClinicLayout,
  LoginPage,
  DoctorLayout,
  DoctorPets,
  DoctorVisits,
  DoctorPetDetail,
  OwnerLayout,
  OwnerPets,
  OwnerPetDetail,
  //PetCreate,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClinicLayout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="/doctor/doctor/pets" index element={<DoctorPets />} />
          <Route path="/doctor/doctor/pets/:id" element={<DoctorPetDetail />} />
          <Route path="/doctor/doctor/visits" element={<DoctorVisits />} />
        </Route>
        <Route path="/owner" element={<OwnerLayout />}>
          <Route path="/owner/owner/pets" index element={<OwnerPets />} />
          <Route path="/owner/owner/pets/:id" element={<OwnerPetDetail />} />
          {/* <Route path="/owner/owner/visits/create" element={<VisitCreate />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
