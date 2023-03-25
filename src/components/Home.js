const Home = ({ object }) => {
    console.log(object);
    return (
        <>
            <div id="home" className="intro-wrapper">
                <section className="intro home">
                    <h1 className="intro-title">{object.acf.home_title}</h1>
                    <p className="intro-text">{object.acf.home_subtitle}</p>
                </section>
            </div>
        </>
    );
};

export default Home;
