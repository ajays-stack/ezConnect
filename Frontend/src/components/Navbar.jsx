import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageCircle, Settings, UserCircle } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 z-40 w-full bg-base-100/90 border-b border-base-300 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo & App Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shadow-inner transition-transform group-hover:scale-105">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight group-hover:opacity-80 transition-all">
              ezConnect
            </h1>
          </Link>

          {/* Right-side Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/settings"
              className="btn btn-sm btn-ghost gap-2 hover:bg-primary/10 transition"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-sm btn-ghost gap-2 hover:bg-primary/10 transition"
                  aria-label="Profile"
                >
                  <UserCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="btn btn-sm btn-ghost gap-2 text-error hover:bg-error/10 transition"
                  onClick={logout}
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
