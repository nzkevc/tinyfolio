import { Link } from "react-router";

import { ThemeModeToggle } from "./ThemeModeToggle";

export default function TopBar() {
  return (
    <nav className="bg-primary-foreground flex items-center justify-between px-4 py-3">
      <div className="text-2xl font-bold italic">
        <Link to="/dashboard" className="no-underline">
          tinyfolio
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/settings" className="no-underline">
          Folio
        </Link>
        <ThemeModeToggle />
      </div>
    </nav>
  );
}
