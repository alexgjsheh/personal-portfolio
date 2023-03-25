import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Works = () => {
    const restPath =
        "https://alexandersheh.com/portfolio/wp-json/wp/v2/haerin-work?sort_by=title&order_by=asc&_embed";

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
        if (isLoaded) {
            const hiddenLeft = document.querySelectorAll(".hidden-left");
            const hiddenRight = document.querySelectorAll(".hidden-right");
            const hidden = document.querySelectorAll(".hidden");
            // fade in work boxes
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    console.log(entry);
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            });
            hidden.forEach((el) => observer.observe(el));
            hiddenLeft.forEach((el) => observer.observe(el));
            hiddenRight.forEach((el) => observer.observe(el));
        }
    }, [isLoaded]);

    return (
        <>
            {isLoaded ? (
                <section id="works" className="container">
                    <h2 className="works-container-title hidden">
                        {restData[0].acf.works}
                    </h2>
                    <div className="works-container">
                        {restData.map((post, i) => (
                            <article
                                className={`single-work-container ${
                                    i % 2 !== 1 || i === 0
                                        ? "hidden-left"
                                        : "hidden-right"
                                }`}
                                key={post.id}
                                id={`post-${post.id}`}
                            >
                                <img
                                    className="single-work-image"
                                    src={
                                        post._embedded["wp:featuredmedia"][0]
                                            .source_url
                                    }
                                    alt={
                                        post._embedded["wp:featuredmedia"][0]
                                            .title.rendered
                                    }
                                />
                                <div className="single-work-info opaque-background">
                                    <h3 className="single-work-title">
                                        {post.title.rendered}
                                    </h3>
                                    {/* <h4>{post.acf.work_overview_heading}</h4> */}
                                    <p className="single-work-overview">
                                        {post.acf.work_overview}
                                    </p>
                                    <p className="tech-used-list">
                                        {post.acf.technologies_used}
                                    </p>
                                    <div className="learn-more-container">
                                        {/* <a
                                            className="btn learn-more"
                                            href={post.link}
                                        >
                                            Learn More
                                        </a> */}
                                        <Link
                                            className="btn learn-more"
                                            to={`/works/${post.slug}`}
                                        >
                                            Learn More
                                            <div className="btn-horizontal"></div>
                                            <div className="btn-vertical"></div>
                                        </Link>
                                    </div>
                                    {/* <p className="temp-link">{post.link}</p> */}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Works;
