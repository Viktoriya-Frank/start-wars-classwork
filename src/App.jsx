import './App.css'
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import {StarWarsProvider} from "./utils/context.jsx";

function App() {


    return (
        <div className={'container-fluid'}>
            <StarWarsProvider>
                <Header/>
                <Main/>
                <Footer/>
            </StarWarsProvider>
        </div>
    )
}

export default App
