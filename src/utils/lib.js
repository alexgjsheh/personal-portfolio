// random color generating function

const makeRandColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
};

// function to dynamically generate year
export const getDate = () => {
    const date = new Date();
    return date.getFullYear();
};

let reverse = true;

// function to reverse logo spin direction and speed and change logo color
export const changeLogoSpeedColor = (event) => {
    event.preventDefault();

    let speed = Math.random() * 2 + 0.4;
    console.log(speed);
    const logo = document.getElementById("site-logo");
    reverse = !reverse;
    logo.style.animation = `rotate ${speed}s linear infinite ${
        reverse ? "normal" : "reverse"
    }`;
    document.getElementById("cls-2").style.fill = makeRandColor();
};
