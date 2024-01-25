import PlayersRouter from "./components/PlayersRouter";
import TeamsRouter from "./components/TeamsRouter";
import HomeRouter from "./components/HomeRouter";
import {Navigate, Route, Routes}  from "react-router-dom";
import WelcomeRouter from "./components/WelcomeRouter";
import PlayerRouter from "./components/PlayerRouter";
import TeamRouter from "./components/TeamRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import FooterRouter from "./components/FooterRouter";


function App() {
	return (
		<div>
			<HomeRouter/>
			<Routes>
				<Route path="/" element={<Navigate to="/welcome"/>}/>
				<Route path="/welcome" element={<WelcomeRouter/>} /> 
				<Route path="/team" element={<TeamsRouter/>} />
				<Route path="/team/:id" element={<TeamRouter/>} /> 
				<Route path="/player" element={<PlayersRouter/>} />
				<Route path="/player/:id" element={<PlayerRouter/>} />
			</Routes>
			<FooterRouter/>
		</div>
	);
}

export default App;
