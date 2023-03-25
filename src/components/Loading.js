import loading from "../images/loading4.gif";

const Loading = () => {
    return (
        <div className="loading-container">
            <img src={loading} alt="Loading" className="loading" id="loading" />
        </div>
    );
};

export default Loading;
