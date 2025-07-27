import { Route, Routes } from "react-router";

import {
  DashboardPage,
  LandingPage,
  LoginPage,
  ProjectPage,
  RegisterPage,
  TinyFolioPage,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/:id" element={<TinyFolioPage />} />
      <Route path="/projects/:id" element={<ProjectPage />} />
    </Routes>
  );
}

export default App;
