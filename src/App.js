import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {ClinicLayout, DoctorLayout, OwnerLayout, Pet, PetCreate, PetDetail, Visit, VisitCreate} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ClinicLayout/>} />
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="/doctor/doctor/pets" index element={<Pet/>} />
          <Route path="/doctor/doctor/pets/:id" element={<PetDetail/>} />
          <Route path="/doctor/doctor/visits" element={<Visit />} />
          <Route path="/doctor/doctor/visits/create" element={<VisitCreate />} />
        </Route>
        <Route path="/owner" element={<OwnerLayout />}>
          <Route path="/owner/owner/pets" index element={<Pet/>} />
          <Route path="/owner/owner/pets/create" element={<PetCreate />} />
          <Route path="/owner/owner/pets/:id" element={<PetDetail/>} />
          <Route path="/owner/owner/visits/create" element={<VisitCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
