// Router Components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageHome from "./pages/PageHome";
import PageSingle from "./pages/PageSingle";

import "./App.css";

import "./scss/style.scss";

import backgroundImg from "./images/portfolioBackgroundSquares.svg";

const AppRouter = () => {
    return (
        <Router basename="/">
            <div
                className="App"
                style={{ backgroundImage: `url(${backgroundImg})` }}
            >
                <Routes>
                    <Route path="/" exact element={<PageHome />} />
                    <Route path="/works/:slug" element={<PageSingle />} />
                    {/* <Route path="*" element={<PageNotFound />} /> */}
                </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;
