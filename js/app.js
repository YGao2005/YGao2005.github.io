
//functions below update image position based on mouse movement
const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");
let xValue = 0, yValue = 0;

let rotateDegree = 0;

function update(cursorPosition) {
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;

        let isInLeft =
            parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) 
        rotateY(${rotateDegree * rotateSpeed}deg) 
        translateY(calc(-50% + ${yValue * speedy}px)) 
        perspective(2300px) translateZ(${zValue * speedz}px)`
    });
}

update(0);

window.addEventListener("mousemove", (e) => {
    if (timeline.isActive()) return;

    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

    update(e.clientX);
});

if (window.innerWidth >= 725) {
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else {
    main.style.maxHeight = `${window.innerWidth * 1.6}px`;
}

/* GSAP Animation that controls initial animation of everything falling down */

let timeline = gsap.timeline();

Array.from(parallax_el)
    .filter((el) => !el.classList.contains("text"))
    .forEach((el) => {
        timeline.from(
            el,
            {
                top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
                duration: 3.5,
                ease: "power3.out",
            },
            "1"
        );
    })

//transition of h1 text moving up
timeline.from(".text h1", {
    y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 200,
    //without this opacity change, the title becomes bugged on scroll
    opacity: 0,
    duration: 2,
},
    "2.5"
//transition of h2 text moving down
).from(".text h2", {
    y: -150,
    opacity: 0,
    duration: 1.5,
},
    "3"
)
//transition of navbar appearing
    .from(".hide", {
        opacity: 0,
        duration: 1.5,
    }, "3");


//parallax effect on scroll for initial title screen
window.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;
    document.querySelectorAll('.background').forEach(function (element) {
        element.style.transform = `translateY(${scrollPosition * 0.8}px)`;
    });

    document.querySelectorAll('.foreground').forEach(function (element) {
        element.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    });


    document.querySelectorAll('.portfolio-title').forEach(function (element) {
        element.style.transform = `translateY(-${scrollPosition * 0.2}px)`;
    });
});