import { Inter } from "next/font/google";
import Link from "next/link";
import home from "./styles/home.module.css";
import footer from "./styles/footer.module.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { PrimeReactProvider } from "primereact/api";
import { Menu } from "primereact/menu";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

const menuItems = [
	{ label: "Home", to: "/" },
	{ label: "Team", to: "/team" },
	{ label: "Player", to: "/player" },
	{ label: "Match", to: "/match" },
	{ label: "Register", to: "/register" },
];

export default function RootLayout({ children }) {
	// const end = <div className={footer.p}>&copy; 2024 Cricket Manager. All rights reserved.</div>;
	// const value = {
	//     appendTo: 'self'
	// };
	return (
		// <PrimeReactProvider value={value}>
		<html lang="en">
			<body className={inter.className} style={{ background: "lightblue" }}>
				{/* <nav>
					<ul className={home.main}>
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<Link href="/team">Team</Link>
						</li>
						<li>
							<Link href="/player">Player</Link>
						</li>
						<li>
							<Link href="/match">Match</Link>
						</li>
						<li>
							<Link href="/register">Register</Link>
						</li>
					</ul>
				</nav> */}
				<div
					style={{
						margin: "20px",
						display: "flex",
						// justifyContent: "flex-end",
					}}
				>
					<Menu
						model={menuItems.map((item) => ({
							label: <Link href={item.to}>{item.label}</Link>,
						}))}
					/>
				</div>

				{children}
				<div>
					<footer>
						<p className={footer.p}>
							&copy; 2024 Cricket Manager. All rights reserved.
						</p>
					</footer>
				</div>
			</body>
		</html>
		// </PrimeReactProvider>
	);
}
