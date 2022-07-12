import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import { url } from 'inspector';

function App() {
	return (
		<div 
			className="flex flex-col h-screen justify-between" 
			style={{
				backgroundColor: "#055f9f",
				backgroundImage: `url('https://piratenation.game/global_assets/pirate-world-background.png')`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center top",
				backgroundSize: "100% auto"
		}}>
			<Header />
			<MainContent />
			<Footer />
		</div>
	);
}

export default App;
