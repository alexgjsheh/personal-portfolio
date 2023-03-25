import { useState, useEffect } from "react";
import Loading from "./Loading";

const About = () => {
    const restPath =
        "https://alexandersheh.com/portfolio/wp-json/wp/v2/pages/39?_embed&acf_format=standard";

    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [emailBtnText, setEmailBtnText] = useState("alexgjsheh@gmail.com");
    const [emailBtnHover, setEmailBtnHover] = useState(false);

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
        if (isLoaded) {
            const hiddenAbout = document.querySelectorAll(".hidden-about");
            // fade in work boxes
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    console.log(entry);
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            });
            console.log(hiddenAbout[0]);
            hiddenAbout.forEach((el) => observer.observe(el));
        }
    }, [isLoaded]);

    const handleEmailCopy = () => {
        navigator.clipboard.writeText(restData.acf.email_link);
        setEmailBtnText("Email Copied!");
    };

    const handleMouseEnter = () => {
        setEmailBtnText("Click to copy");
        setEmailBtnHover(true);
    };

    const handleMouseExit = () => {
        setEmailBtnText(restData.acf.email_link);
        setEmailBtnHover(false);
    };

    return (
        <>
            {isLoaded ? (
                <section id="about" className="about container">
                    <h2 className="about-title hidden-about">
                        {restData.title.rendered}
                    </h2>
                    <div className="about-section-container">
                        <div className="profile-container hidden-about">
                            <h3 className="profile-heading">
                                {restData.acf.profile_heading}
                            </h3>
                            <p className="profile-overview">
                                {restData.acf.profile_overview}
                            </p>
                        </div>
                        <div className="skills-container hidden-about">
                            <h3 className="skills-heading">
                                {restData.acf.skills_heading}
                            </h3>
                            <p className="skills-overview">
                                {restData.acf.skills_overview}
                            </p>
                        </div>
                        <div className="interests-container hidden-about">
                            <h3 className="interests-heading">
                                {restData.acf.interests_heading}
                            </h3>
                            <p className="interests-overview">
                                {restData.acf.interests_overview}
                            </p>
                        </div>
                        <div className="contact-container hidden-about">
                            <h3 className="contact-heading">
                                {restData.acf.contact_heading}
                            </h3>
                            <p className="profile-overview">
                                {restData.acf.contact_text}
                            </p>
                        </div>
                    </div>
                    <button
                        className="btn email-button hidden-about"
                        href={`mailto:${restData.acf.email_link}`}
                        onClick={handleEmailCopy}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseExit}
                    >
                        {emailBtnText}
                        <div className="btn-horizontal"></div>
                        <div className="btn-vertical"></div>
                    </button>
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default About;
