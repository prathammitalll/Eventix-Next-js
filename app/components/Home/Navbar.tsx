"use client"
import { useState, useEffect, useRef, JSX } from "react";
import { FaHome, FaCalendarAlt, FaUsers, FaUser, FaSignOutAlt } from "react-icons/fa";
import { BsChatSquareDots } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import eventsData from "../../data/eventsData";

interface NavItem {
  id: string;
  label: string;
  icon: JSX.Element;
  route: string;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <FaHome />,
    route: "/",
  },
  {
    id: "clubs",
    label: "Clubs",
    icon: <FaUsers />,
    route: "/clubs",
  },
  {
    id: "events",
    label: "Events",
    icon: <FaCalendarAlt />,
    route: "/events",
  },
  {
    id: "contact",
    label: "Contact",
    icon: <BsChatSquareDots />,
    route: "/contact",
  },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const navRef = useRef<HTMLElement | null>(null);
  const { user, openAuthModal, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Clean URL on page load and scroll to top
    if (window.location.hash) {
      // Remove hash from URL without triggering navigation
      window.history.replaceState(null, "", window.location.pathname);
    }

    // Ensure page starts at top
    window.scrollTo(0, 0);
  }, [pathname]);

  const scrollToHome = () => {
    if (pathname === "/") {
      // If already on homepage, just scroll to top
      window.scrollTo(0, 0);
    } else {
      // Navigate to homepage
      router.push("/");
    }
  };

  const navigateToPage = (item: NavItem) => {
    setMobileMenuOpen(false);
    const route = item.route || "/";
    if (route === "/" && pathname === "/") {
      window.scrollTo(0, 0);
    } else {
      router.push(route);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close profile menu when clicking outside
      if (showProfileMenu && !(event.target as Element).closest(".profile-menu")) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileMenu]);

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileMenu(false);
      // Redirect to homepage after logout
      if (pathname !== "/") {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const found = eventsData.find((ev) =>
        ev.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
      router.push("/events");
      setSearchQuery(""); // Clear search bar after search
    }
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center cursor-pointer"
              onClick={scrollToHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1
                className="text-2xl font-black text-white"
                style={{
                  fontFamily: "'General Sans', sans-serif",
                }}
              >
                EVENTIX
              </h1>
              <h1
                className="text-2xl font-black"
                style={{
                  fontFamily: "'General Sans', sans-serif",
                  color: "#f2f862",
                  textShadow: "0 0 20px rgba(242, 248, 98, 0.3)",
                }}
              >
                360
              </h1>
            </motion.div>

            {/* Desktop Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative search-container">
                <input
                  type="text"
                  placeholder="Search events, clubs, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50 focus:bg-white/15 transition-all"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Navigation Items - always visible */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => navigateToPage(item)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-[#f2f862] cursor-pointer"
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Desktop Auth Button / Profile */}
            {user ? (
              // User is signed in - show profile menu
              <div className="hidden md:block relative profile-menu ml-6">
                <motion.button
                  onClick={handleProfileClick}
                  className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 bg-[#f2f862] rounded-full flex items-center justify-center">
                    <FaUser className="text-black text-sm" />
                  </div>
                </motion.button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-white text-sm font-medium mb-1">
                          {user.displayName ||
                            user.email?.split("@")[0] ||
                            "User"}
                        </p>
                        <p className="text-gray-400 text-xs break-all">
                          {user.email}
                        </p>
                      </div>
                      <motion.button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-white/10 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <FaSignOutAlt className="text-[#f2f862] flex-shrink-0" />
                        <span className="text-sm">Sign Out</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              // User is not signed in - show sign up button
              <motion.button
                onClick={() => openAuthModal("signup")}
                className="hidden md:block bg-[#f2f862] text-black px-6 py-2 rounded-full font-semibold text-sm flex-shrink-0 cursor-pointer hover:bg-[#e8e356] ml-6"
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            )}

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white hover:text-gray-300 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <motion.span
                    className="w-5 h-0.5 bg-current block mb-1"
                    animate={{
                      rotate: mobileMenuOpen ? 45 : 0,
                      y: mobileMenuOpen ? 6 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="w-5 h-0.5 bg-current block mb-1"
                    animate={{
                      opacity: mobileMenuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="w-5 h-0.5 bg-current block"
                    animate={{
                      rotate: mobileMenuOpen ? -45 : 0,
                      y: mobileMenuOpen ? -6 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-4 space-y-4">
                {/* Mobile Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events, clubs, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50 focus:bg-white/15"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Navigation Items */}
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => navigateToPage(item)}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-[#f2f862] cursor-pointer"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}

                {/* Mobile Auth Button / Profile */}
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-10 h-10 bg-[#f2f862] rounded-full flex items-center justify-center">
                        <FaUser className="text-black" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {user.displayName ||
                            user.email?.split("@")[0] ||
                            "User"}
                        </p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaSignOutAlt />
                      <span className="font-medium">Sign Out</span>
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => openAuthModal("signup")}
                    className="w-full bg-[#f2f862] text-black px-6 py-3 rounded-full font-semibold text-sm mt-4 cursor-pointer hover:bg-[#e8e356]"
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Up
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
