import { Route, Routes } from "react-router";

import {
  DashboardPage,
  LandingPage,
  ProjectPage,
  ProjectsFeedPage,
  SignInPage,
  TinyFolioPage,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/:id" element={<TinyFolioPage />} />
      <Route path="/projects" element={<ProjectsFeedPage />} />
      <Route path="/projects/:id" element={<ProjectPage />} />
    </Routes>
  );
}

export default App;
