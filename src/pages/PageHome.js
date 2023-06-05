import Home from "../components/Home";
import Header from "../components/Header";
import Works from "../components/Works";
import About from "../components/About";
import Footer from "../components/Footer";

import { useState, useEffect } from "react";
import Loading from "../components/Loading";

const PageHome = () => {
    const restPath =
        "https://alexandersheh.com/portfolio/wp-json/wp/v2/pages/26?_embed&acf_format=standard";
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);

    useEffect(() => {
        document.title = `Alex Sheh | Front-End Web Developer`;
    }, []);

    return (
        <>
            {isLoaded ? (
                <>
                    <a className="screen-reader-text" href="#home">
                        Skip to Content
                    </a>
                    <Header />
                    <div className="main-container">
                        <main>
                            <Home object={restData} />
                            <Works />
                            <About />
                        </main>
                        <Footer />
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};
export default PageHome;
