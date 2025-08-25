// Navbar.js - Enhanced with conditional glass effects and dynamic logo
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./providers/AuthContext";
import { useCart } from "./providers/CartContext";
import logo from "../assets/Image/logo.png";
import logoGlass from "../assets/svg/black-logo.svg"; // Add your alternate logo here
import GuestCartService from "../services/GuestCartService";

const Navbar = () => {
	const { cartCount, updateCartCount } = useCart();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
	const [isScrolled, setIsScrolled] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const { isLoggedIn, logout, user } = useAuth();

	// Check if current page is home page
	const isHomePage = location.pathname === '/';

	useEffect(() => {
		const handleResize = () => {
			setIsDesktop(window.innerWidth >= 1024);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;

			if (isHomePage) {
				// On home page, only apply glass effect after hero section
				const heroHeight = window.innerHeight; // 100vh
				setIsScrolled(scrollPosition > heroHeight - 100); // -100 for smooth transition
			} else {
				// On other pages, apply glass effect immediately when scrolling
				setIsScrolled(scrollPosition > 50); // Small threshold for better UX
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isHomePage]); // Add isHomePage as dependency

	useEffect(() => {
		// Update cart count on location change or when logged in state changes
		if (isLoggedIn && user?._id) {
			updateCartCount(user._id);
		} else if (!isLoggedIn) {
			// For guest users, update cart count from localStorage
			const count = GuestCartService.getCartCount();
			updateCartCount(count);
		}
	}, [isLoggedIn, user, location, updateCartCount]);

	useEffect(() => {
		// Scroll to top on location change
		window.scrollTo(0, 0);
	}, [location]);

	const handleLogout = async () => {
		await logout();
		updateCartCount(null);
		navigate("/login");
	};

	const handleUserIconClick = () => {
		// Add console logging to debug
		console.log("User icon clicked, isLoggedIn:", isLoggedIn);
		console.log("Current user:", user);

		if (isLoggedIn && user) {
			// Check for both role and _id to ensure proper user object
			const role = user.role || "user";
			console.log(
				"Navigating to:",
				role === "admin" ? "/admin-panel" : "/user-panel",
			);
			navigate(role === "admin" ? "/admin-panel" : "/user-panel");
		} else {
			navigate("/login");
		}
	};

	// Function to get the appropriate logo based on current state
	const getCurrentLogo = () => {
		if (isHomePage) {
			// On home page: use glass logo when scrolled (glass effect active)
			return isScrolled ? logoGlass : logo;
		} else {
			// On other pages: always use glass logo (glass effect always active)
			return logoGlass;
		}
	};

	// Dynamic classes based on scroll state and current page
	const getNavbarClasses = () => {
		if (isHomePage) {
			// Home page behavior - transparent initially, glass effect after hero
			return `
				${isScrolled
					? isDesktop
						? 'bg-white/10 backdrop-blur-lg border-b border-white/20'
						: 'bg-white shadow-lg'
					: 'bg-transparent'
				}
				${isScrolled ? 'text-emerald-700' : 'text-white'}
				h-20 fixed w-full z-50 transition-all duration-500 ease-in-out
			`;
		} else {
			// Other pages behavior - always show glass effect when scrolled
			return `
				${isScrolled
					? 'bg-white/10 backdrop-blur-lg border-b border-white/20 text-emerald-700'
					: 'bg-white/5 backdrop-blur-sm border-b border-white/10 text-emerald-700'
				}
				h-20 fixed w-full z-50 transition-all duration-500 ease-in-out
			`;
		}
	};

	const getLinkClasses = (isActive) => {
		if (isHomePage) {
			// Home page link styles
			return `
				${isScrolled
					? (isActive ? 'text-emerald-700' : 'text-emerald-700 hover:text-green-700')
					: (isActive ? 'text-secondary' : 'text-white hover:text-secondary')
				}
				transition-colors duration-300
			`;
		} else {
			// Other pages link styles
			return `
				${isActive ? 'text-emerald-800 font-semibold' : 'text-emerald-700 hover:text-emerald-800'}
				transition-colors duration-300
			`;
		}
	};

	const getIconClasses = () => {
		if (isHomePage) {
			// Home page icon styles
			return `
				${isScrolled ? 'text-emerald-700 hover:text-green-700' : 'text-white hover:text-secondary'}
				transition-colors duration-300
			`;
		} else {
			// Other pages icon styles
			return 'text-emerald-700 hover:text-emerald-800 transition-colors duration-300';
		}
	};

	const getMobileMenuClasses = () => {
		if (isHomePage) {
			// Home page mobile menu
			return `
				absolute top-20 left-0 w-full shadow-lg z-40 flex flex-col text-base font-medium space-y-4 px-6 py-4
				${isScrolled
					? isDesktop
						? 'bg-white/10 backdrop-blur-lg border-b border-white/20'
						: 'bg-white'
					: 'bg-black/20 backdrop-blur-sm'
				}
			`;
		} else {
			// Other pages mobile menu
			return `
				absolute top-20 left-0 w-full shadow-lg z-40 flex flex-col text-base font-medium space-y-4 px-6 py-4
				bg-white/90 backdrop-blur-lg border-b border-white/20
			`;
		}
	};

	return (
		<nav className={getNavbarClasses()}>
			<div className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-full overflow-hidden">
				{/* Brand */}
				<div className="text-2xl font-bold">
					<Link
						to="/"
						className={`${
							isHomePage
								? (isScrolled ? 'hover:text-green-700' : 'hover:text-secondary')
								: 'hover:text-emerald-800'
						} transition-colors duration-300`}
					>
						<img
							src={getCurrentLogo()}
							alt="nidaspure"
							className="h-12 transition-all duration-500"
						/>
					</Link>
				</div>

				{/* Desktop Navigation */}
				{isDesktop ? (
					<ul className="hidden lg:flex space-x-8 text-base font-medium">
						{[
							{ name: "Home", path: "/" },
							{ name: "Monsoon Collection", path: "/monsoon-collection" },
							{ name: "Shop", path: "/shop" },
							{ name: "Contact Us", path: "/contact" },
						].map((navItem) => (
							<li key={navItem.path}>
								<Link
									to={navItem.path}
									className={getLinkClasses(location.pathname === navItem.path)}
								>
									{navItem.name}
								</Link>
							</li>
						))}
					</ul>
				) : null}

				{/* Icons */}
				<div className="flex items-center space-x-6 text-xl">
					{/* Cart Icon with Badge */}
					<Link
						to="/cart"
						className={`relative ${getIconClasses()}`}
					>
						<FiShoppingCart />
						{cartCount > 0 && (
							<span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
								{cartCount}
							</span>
						)}
					</Link>

					{/* User Icon (Desktop only) */}
					{isDesktop && (
						<div
							onClick={handleUserIconClick}
							className={`cursor-pointer ${getIconClasses()}`}
						>
							<FiUser />
						</div>
					)}

					{/* Logout Button (Always visible when logged in) */}
					{isDesktop && isLoggedIn && (
						<div
							onClick={handleLogout}
							className={`cursor-pointer ${getIconClasses()} flex items-center`}
						>
							<FiLogOut />
							<span className="ml-2 hidden lg:inline">Logout</span>
						</div>
					)}

					{/* Hamburger Menu moved here - only visible on mobile */}
					{!isDesktop && (
						<div
							className={`cursor-pointer text-2xl ${getIconClasses()}`}
							onClick={() => setIsMenuOpen((prev) => !prev)}
						>
							{isMenuOpen ? <HiX /> : <HiMenu />}
						</div>
					)}
				</div>
			</div>

			{/* Mobile Navigation */}
			<AnimatePresence>
				{isMenuOpen && !isDesktop && (
					<motion.ul
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
						className={getMobileMenuClasses()}
					>
						{[
							{ name: "Home", path: "/" },
							{ name: "Monsoon Collection", path: "/monsoon-collection" },
							{ name: "Shop", path: "/shop" },
							{ name: "Contact Us", path: "/contact" },
						].map((navItem) => (
							<li key={navItem.path}>
								<Link
									to={navItem.path}
									onClick={() => setIsMenuOpen(false)}
									className={getLinkClasses(location.pathname === navItem.path)}
								>
									{navItem.name}
								</Link>
							</li>
						))}
						{/* Profile Icon */}
						<li>
							<div
								onClick={() => {
									handleUserIconClick();
									setIsMenuOpen(false);
								}}
								className={`cursor-pointer ${getIconClasses()} flex items-center space-x-2`}
							>
								<FiUser />
								<span>{isLoggedIn ? "My Account" : "Login"}</span>
							</div>
						</li>
						{/* Logout Icon */}
						{isLoggedIn && (
							<li>
								<div
									onClick={() => {
										handleLogout();
										setIsMenuOpen(false);
									}}
									className={`cursor-pointer ${getIconClasses()} flex items-center space-x-2`}
								>
									<FiLogOut />
									<span>Logout</span>
								</div>
							</li>
						)}
					</motion.ul>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
