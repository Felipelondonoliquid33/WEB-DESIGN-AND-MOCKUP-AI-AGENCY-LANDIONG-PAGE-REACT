import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function MacbookScrollDemo() {
	return (
		<div className="w-full overflow-hidden bg-transparent">
			<MacbookScroll
				badge={
					<a
						href="https://my-interactive-portfolio-website.vercel.app/"
						target="_blank"
						rel="noreferrer"
						aria-label="Visit my interactive portfolio website"
					>
						<Badge className="h-12 w-12 -rotate-12 transform" />
					</a>
				}
				src={`/Products%20screenshot.png`}
				showGradient={false}
			/>
		</div>
	);
}

// Custom cartoon-style sticker badge linking to your portfolio
const Badge = ({ className }: { className?: string }) => {
	return (
		<svg
			width="48"
			height="48"
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			{/* Blobby sticker background */}
			<path
				d="M10 22C10 12 18 6 28 6C40 6 52 12 54 24C56 34 50 46 38 50C28 54 16 50 12 42C10 38 10 30 10 22Z"
				fill="url(#sticker-gradient)"
			/>
			{/* Outline */}
			<path
				d="M10 22C10 12 18 6 28 6C40 6 52 12 54 24C56 34 50 46 38 50C28 54 16 50 12 42C10 38 10 30 10 22Z"
				stroke="white"
				strokeWidth="2"
			/>
			{/* Cute face / character */}
			<path
				d="M24 30C24 28.8954 23.1046 28 22 28C20.8954 28 20 28.8954 20 30"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M44 30C44 28.8954 43.1046 28 42 28C40.8954 28 40 28.8954 40 30"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M24 36C26 39 30 41 34 39"
				stroke="white"
				strokeWidth="2.5"
				strokeLinecap="round"
			/>
			{/* Small sparkles */}
			<path
				d="M18 18L20 20M20 18L18 20"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M46 20L47.5 21.5M47.5 19.5L46 21"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<defs>
				<linearGradient
					id="sticker-gradient"
					x1="10"
					y1="6"
					x2="54"
					y2="50"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#9333EA" />
					<stop offset="0.5" stopColor="#DB2777" />
					<stop offset="1" stopColor="#F97316" />
				</linearGradient>
			</defs>
		</svg>
	);
};


