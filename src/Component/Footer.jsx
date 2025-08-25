import { FiInstagram } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { useState, useEffect } from "react";
import smallrose from "../assets/svg/smallrose.svg";
import locationIcon from "../assets/svg/location.svg";
import phoneIcon from "../assets/svg/phonenumber.svg";
import emailIcon from "../assets/svg/footeremail.svg";

const Footer = () => {
	const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// URLs and paths
	const shopCategoryLinks = {
		skinCare: "/shop",
		bodyCare: "/shop",
		hairCare: "/shop",
		soapBars: "/shop",
	};

	// Address for Google Maps
	const addressForMap =
		"41, RAJASTHALI APARTMENT, C-1 Rd, Block C-2, Pocket 2, Sector 16C, Pitampura, Delhi, 110034";
	const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressForMap)}`;

	// Contact information
	const phoneNumber = "+91 96432 48874";
	const emailAddress = "nidaspure2@gmail.com";

	// Dynamic styles based on window width
	const getResponsiveStyles = () => {
		if (windowWidth <= 480) {
			return {
				gridContainer: {
					textAlign: 'left',
				},
				textElements: {
					textAlign: 'left',
				},
				listItems: {
					marginLeft: 0,
					textAlign: 'left',
				}
			};
		} else if (windowWidth <= 768 && windowWidth > 480) {
			return {
				emailIcon: {
					width: '2.5rem',
					height: '2.5rem',
					padding: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}
			};
		}
		return {};
	};

	const responsiveStyles = getResponsiveStyles();

	return (
		<footer className="bg-white border-t border-[#5C3822] font-bold">
			<div className="container max-w-[1240px] mx-auto px-6 lg:py-10 py-5">
				<div
					className="grid grid-cols-1 lg:grid-cols-3 gap-20 text-center lg:text-left md:grid-cols-3 lg:gap-10 md:gap-5 md:items-center"
					style={responsiveStyles.gridContainer || {}}
				>
					{/* About Us Section with background image */}
					<div
						className="mt-10 lg:mt-10 relative lg:pt-6 bg-cover bg-center"
						style={{
							backgroundImage: `url(${smallrose})`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "contain",
						}}
					>
						<div className="relative md:text-left lg:pb-[40px] xl:pb-[70px]">
							<h3
								className="text-lg font-bold text-gray-800"
								style={responsiveStyles.textElements || {}}
							>
								About Us
							</h3>
							<p
								className="text-gray-600 mt-4"
								style={responsiveStyles.textElements || {}}
							>
								Rooted in ancient Indian herbal wisdom, Nida's Pure prepares
								100% natural, handmade products designed to nourish your natural
								beauty with a promise of purity and ayurveda.
							</p>
						</div>
					</div>

					{/* Shop by Category Section */}
					<div className="lg:mb-0 md:mb-5 w-[180px] md:mx-auto text-left">
						<h3
							className="text-lg font-bold text-gray-800 lg:px-0 text-left md:text-left"
							style={responsiveStyles.textElements || {}}
						>
							Shop by category
						</h3>
						<ul className="text-gray-600 mt-3 space-y-1 text-[16px] text-left md:text-left">
							{Object.entries(shopCategoryLinks).map(([key, link]) => {
								const labels = {
									skinCare: 'Skin Care',
									bodyCare: 'Body care',
									hairCare: 'Hair Care',
									soapBars: 'Soap Bars'
								};
								return (
									<li key={key} style={responsiveStyles.listItems || {}}>
										<a
											href={link}
											className="hover:text-black"
											style={responsiveStyles.textElements || {}}
										>
											{labels[key]}
										</a>
									</li>
								);
							})}
						</ul>
					</div>

					{/* Contact Us Section */}
					<div className="text-center xl:text-left lg:text-left md:text-left xl:mt-20 lg:mt-[90px] md:mt-[60px] mr-12 xl:w-[390px] lg:w-[300px] md:w-[250px] xs:w-[350px]">
						<h3
							className="text-lg font-bold text-gray-800 xl:mt-0 lg:mt-0 md:mt-16"
							style={responsiveStyles.textElements || {}}
						>
							Contact Us
						</h3>
						<ul className="lg:mt-6 md:mt-8 mt-4 space-y-4">
							<li className="flex md:items-start space-x-4" style={responsiveStyles.listItems || {}}>
								<div className="w-[100px] md:w-[150px] lg:w-[100px] xl:w-[75px] h-auto flex items-center justify-center">
									<img
										src={locationIcon}
										alt="Location Icon"
										className="w-full h-full object-contain"
									/>
								</div>
								<a
									href={mapUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-600 hover:text-black"
									style={responsiveStyles.textElements || {}}
								>
									41, RAJASTHALI APARTMENT, C-1 Rd, Block C-2, Pocket 2, Sector
									16C, Pitampura, Delhi, 110034
								</a>
							</li>
							<li className="flex md:items-start space-x-4" style={responsiveStyles.listItems || {}}>
								<div className="w-[38px] h-auto flex items-center justify-center">
									<img
										src={phoneIcon}
										alt="Phone Icon"
										className="w-full h-full object-contain"
									/>
								</div>
								<a
									href={`tel:${phoneNumber}`}
									className="text-gray-600 hover:text-black"
									style={responsiveStyles.textElements || {}}
								>
									{phoneNumber}
								</a>
							</li>
							<li className="flex md:items-start space-x-4" style={responsiveStyles.listItems || {}}>
								<div
									className="w-[40px] h-auto flex items-center justify-center"
									style={windowWidth <= 768 && windowWidth > 480 ? responsiveStyles.emailIcon : {}}
								>
									<img
										src={emailIcon}
										alt="Email Icon"
										className="w-full h-full object-contain"
									/>
								</div>
								<a
									href={`mailto:${emailAddress}`}
									className="text-gray-600 hover:text-black"
									style={responsiveStyles.textElements || {}}
								>
									{emailAddress}
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="w-full bg-button-primary h-20 flex justify-between items-center px-6 lg:px-40">
				{/* Left Section */}
				<div className="text-white md:text-[16px] text-[13px] text-left xl:ml-[-50px] lg:ml-[-150px] md:ml-[-15px]">
					<p>
						© 2024 YourCompany. All Rights Reserved.
						<a
							href="/privacy-policy"
							className="ml-2 underline hover:text-[#f8bdb9]"
						>
							Privacy Policy
						</a>
					</p>
				</div>

				{/* Right Section */}
				<div className="flex space-x-4 xl:mr-[-30px] lg:mr-[-140px] md:mr-[-10px]">
					<a
						href="https://www.facebook.com/nidaspure"
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-[#f8bdb9]"
					>
						<FiFacebook size={20} />
					</a>
					<a
						href="https://www.instagram.com/nidaspure"
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-[#f8bdb9]"
					>
						<FiInstagram size={20} />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
