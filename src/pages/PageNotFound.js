import React from "react";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";

const PageNotFound = () => {
    return (
        <>
            <Header2 />
            <div className="main-container">
                <main>
                    <div className="page-not-found opaque-background">
                        <h2>Page Was Not Found</h2>
                        <p>Please return to home.</p>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default PageNotFound;
