import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    useGSAP(() => {
        const forCommaAnimation = gsap.timeline();
        const heroSplit = new SplitText(".title", { type: "words" });

        const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

        forCommaAnimation
            .from(
                heroSplit.words,
                {
                    yPercent: 100,
                    opacity: 0,
                    ease: "expo.out",
                    duration: 1.8,
                    stagger: {
                        grid: [2, 1],
                        axis: "y",
                        amount: 0.9,
                        from: "center",
                        ease: "sine.inOut",
                    },
                },
                0
            ) // start at 0

            // Animate comma at the same time center words fire
            .fromTo(
                "#comma",
                { y: 0, opacity: 1, rotation: 0, scale: 1, display: "block" },
                {
                    y: 200,
                    rotation: 360,
                    opacity: 0,
                    scale: 0,
                    duration: 1,
                    ease: "sine.inOut",
                    onComplete: () => {
                        gsap.set("#comma", { display: "none" });
                    },
                },
                0.48// offset so it starts when "Mo" & "To" (center) animate
            );

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.05,
            delay: 1,
        });
        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        })
            .to(".right-leaf", { y: -200 }, 0)
            .to(".left-leaf", { y: 200 }, 0);
    }, []);
    return (
        <section id="hero" className="noisy">
            <h1 className="title">
                Mo
                <div className="hiDiv">
                    hi<div id="comma">,</div>
                </div>
                to
            </h1>
            <img
                src="../../../public/public/images/hero-left-leaf.png"
                alt="left-leaf"
                className="left-leaf"
            />
            <img
                src="../../../public/public/images/hero-right-leaf.png"
                alt="right-leaf"
                className="right-leaf"
            />

            <div className="body">
                <div className="content">
                    <div className="space-y-5 hidden md:block">
                        <p>cool crips classic </p>
                        <p className="subtitle">
                            sip the sipit <br /> summer
                        </p>
                    </div>
                    <div className="view-cocktails">
                        <p className="subtitle">
                            Every cocktail on our menu is a blend of premium ingredients,
                            creative flair, and timeless recipes — designed to delight your
                            senses. View cocktails
                        </p>
                        <a href="#cocktails">View CockTails</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
