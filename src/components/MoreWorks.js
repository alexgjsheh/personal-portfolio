import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const MoreWorks = ({ slugProp }) => {
    const restPath =
        "https://alexandersheh.com/portfolio/wp-json/wp/v2/haerin-work?sort_by=title&order_by=asc&_embed";

    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();

                let xyz = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].slug !== slugProp) {
                        if (xyz.length < 2) {
                            xyz.push(data[i]);
                        }
                    }
                }
                setData(xyz);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);

    console.log(slugProp);
    console.log(restData);

    let slug = [];

    if (isLoaded) {
        for (let i = 0; i < restData.length; i++) {
            slug.push(restData[i].slug);
        }
    }

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
            {restData.length && isLoaded ? (
                <article className="container">
                    <h3 className="works-container-title hidden">
                        {restData[0].acf.more_works_heading}
                    </h3>
                    {restData.map((post, i) => (
                        <div className="more-works-image" key={post.id}>
                            <Link to={`/works/${slug[i]}`}>
                                <img
                                    className="single-works-page-image hidden-left"
                                    src={
                                        post._embedded["wp:featuredmedia"][0]
                                            .source_url
                                    }
                                    alt={
                                        post._embedded["wp:featuredmedia"][0]
                                            .title.rendered
                                    }
                                />
                            </Link>
                            <h4 className="single-work-title hidden-right">
                                {post.title.rendered}
                            </h4>
                        </div>
                    ))}
                </article>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default MoreWorks;
