import Cookies from "js-cookie";
import { Link } from "react-router";

import { getJwtSubject } from "@/lib/utils";

import { ThemeModeToggle } from "./ThemeModeToggle";

export default function TopBar() {
  const cookies = Cookies.get();
  const jwtSubject = getJwtSubject(cookies.ACCESS_TOKEN);

  return (
    <nav className="bg-primary-foreground flex items-center justify-between px-4 py-3">
      <div className="text-2xl font-bold italic">
        <Link to="/" className="no-underline">
          tinyfolio
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to={`/${jwtSubject}`} className="">
          Your Folio
        </Link>
        <Link to="/dashboard" className="">
          Dashboard
        </Link>
        <ThemeModeToggle />
      </div>
    </nav>
  );
}
