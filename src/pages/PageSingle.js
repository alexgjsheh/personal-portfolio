import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const PageSingle = () => {
    let { slug } = useParams();

    // console.log(slug);
    const restPath = `https://alexandersheh.com/portfolio/wp-json/wp/v2/haerin-work?slug=${slug}&_embed&acf_format=standard`;
    const [restData, setData] = useState([]);
    // calls an array of all works to filter out from
    const restPath2 =
        "https://alexandersheh.com/portfolio/wp-json/wp/v2/haerin-work?sort_by=title&order_by=asc&_embed";
    const [restData2, setData2] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    console.log(isLoaded);

    // clean this up later...
    useEffect(() => {
        setLoadStatus(false);

        const fetchData = async () => {
            const response = await fetch(restPath);
            const response2 = await fetch(restPath2);
            if (response.ok && response2.ok) {
                const data = await response.json();
                const data2 = await response2.json();

                let xyz = [];
                for (let i = 0; i < data2.length; i++) {
                    if (data2[i].slug !== slug) {
                        xyz.push(data2[i]);
                    }
                }
                setData2(xyz);
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
        console.log("hi");
    }, [restPath]);

    useEffect(() => {
        if (isLoaded) {
            document.title = `Alex Sheh | ${restData[0].title.rendered}`;

            const hiddenLeft = document.querySelectorAll(".hidden-left");
            const hiddenRight = document.querySelectorAll(".hidden-right");
            const hidden = document.querySelectorAll(".hidden");
            // fade in work boxes
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    // console.log(entry);
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            });
            hidden.forEach((el) => observer.observe(el));
            hiddenLeft.forEach((el) => observer.observe(el));
            hiddenRight.forEach((el) => observer.observe(el));
            console.log("bye");
        }
    }, [isLoaded, restData]);

    return (
        <>
            {isLoaded ? (
                <>
                    <a className="screen-reader-text" href="#home">
                        Skip to Content
                    </a>
                    <Header2 />
                    <div className="main-container">
                        <main>
                            <section className="container">
                                <h2 className="single-work-title hidden-right">
                                    {restData[0].title.rendered}
                                </h2>
                                {restData.map((post) => (
                                    <article
                                        className="single-work-container margin-bot-adjust"
                                        key={post.id}
                                        id={`post-${post.id}`}
                                    >
                                        <img
                                            className="single-works-page-image hidden-left"
                                            src={
                                                post._embedded[
                                                    "wp:featuredmedia"
                                                ][0].source_url
                                            }
                                            alt={
                                                post._embedded[
                                                    "wp:featuredmedia"
                                                ][0].title.rendered
                                            }
                                        />
                                        <div className="single-works-page-work-info hidden-right opaque-background">
                                            <h3 className="single-work-overview-heading hidden">
                                                {post.acf.work_overview_heading}
                                            </h3>
                                            <p className="tech-used-list hidden">
                                                {post.acf.technologies_used}
                                            </p>
                                            <p className="single-work-overview hidden">
                                                {post.acf.work_overview}
                                            </p>
                                            <div className="link-container hidden">
                                                <a
                                                    href={
                                                        post.acf.live_site_link
                                                            .url
                                                    }
                                                    className="btn linkedin-git single"
                                                    target="_blank"
                                                >
                                                    Live Site
                                                    <div className="btn-horizontal"></div>
                                                    <div className="btn-vertical"></div>
                                                </a>
                                                <a
                                                    href={
                                                        post.acf.github_link.url
                                                    }
                                                    className="btn linkedin-git single"
                                                    target="_blank"
                                                >
                                                    Github
                                                    <div className="btn-horizontal"></div>
                                                    <div className="btn-vertical"></div>
                                                </a>
                                            </div>
                                            <h3 className="single-work-features-heading hidden">
                                                {post.acf.features_heading}
                                            </h3>
                                            <div className="features-container reverse hidden-left">
                                                <div className="features-content">
                                                    <h4 className="single-work-features-sub-heading">
                                                        {
                                                            post.acf
                                                                .feature_1_heading
                                                        }
                                                    </h4>
                                                    <p>
                                                        {
                                                            post.acf
                                                                .feature_1_description
                                                        }
                                                    </p>
                                                </div>
                                                <div className="features-video-container">
                                                    <video
                                                        className="features-video"
                                                        src={
                                                            post.acf
                                                                .feature_1_video
                                                                .url
                                                        }
                                                        type="video/mp4"
                                                        autoPlay
                                                        muted
                                                        loop
                                                        playsInline
                                                    >
                                                        Your browser does not
                                                        support this video type.
                                                    </video>
                                                </div>
                                            </div>
                                            <div className="features-container hidden-right">
                                                <div className="features-content">
                                                    <h4 className="single-work-features-sub-heading">
                                                        {
                                                            post.acf
                                                                .feature_2_heading
                                                        }
                                                    </h4>
                                                    <p>
                                                        {
                                                            post.acf
                                                                .feature_2_description
                                                        }
                                                    </p>
                                                </div>
                                                <div className="features-video-container">
                                                    <video
                                                        className="features-video"
                                                        src={
                                                            post.acf
                                                                .feature_2_video
                                                                .url
                                                        }
                                                        type="video/mp4"
                                                        autoPlay
                                                        muted
                                                        loop
                                                        playsInline
                                                    >
                                                        Your browser does not
                                                        support this video type.
                                                    </video>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                <article className="container more-works">
                                    <h3 className="more-works-container-title hidden">
                                        {restData[0].acf.more_works_heading}
                                    </h3>
                                    {restData2.map((post, i) => (
                                        <div
                                            className="more-works-image-container"
                                            key={post.id}
                                        >
                                            <Link to={`/works/${post.slug}`}>
                                                <img
                                                    className="more-works-image hidden-left"
                                                    src={
                                                        post._embedded[
                                                            "wp:featuredmedia"
                                                        ][0].source_url
                                                    }
                                                    alt={
                                                        post._embedded[
                                                            "wp:featuredmedia"
                                                        ][0].title.rendered
                                                    }
                                                />
                                            </Link>
                                            <h4 className="more-works-title hidden-right">
                                                {post.title.rendered}
                                            </h4>
                                        </div>
                                    ))}
                                </article>
                            </section>
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

export default PageSingle;
