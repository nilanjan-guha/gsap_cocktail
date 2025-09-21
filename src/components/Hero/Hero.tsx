import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/SplitText";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const forCommaAnimation = gsap.timeline();
        const heroSplit = new SplitText(".title", {
            type: "chars, words",
        });

        const paragraphSplit = new SplitText(".subtitle", {
            type: "lines",
        });

        // Apply text-gradient class once before animating
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
            )
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
                0.48 // Sync with "Mo" and "to"
            );
        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        });

        gsap
            .timeline({
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            })
            .to(".right-leaf", { y: 200 }, 0)
            .to(".left-leaf", { y: -200 }, 0)
            .to(".arrow", { y: 100 }, 0);

        const startValue = isMobile ? "top 50%" : "center 60%";
        const endValue = isMobile ? "120% top" : "bottom top";

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "video",
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            },
        });
        if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                if (videoRef.current) {
                    tl.to(videoRef.current, {
                        currentTime: videoRef.current.duration || 1,
                    });
                }
            };
        }
    }, []);

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">
                    Mo
                    <div className="hiDiv">
                        hi<div id="comma" className="commaDiv">,</div>
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
                            <p>cool crisp classic</p>
                            <p className="subtitle">
                                sip the spirit <br /> summer
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
            <div className="video absolute inset-0">
                <video
                    ref={videoRef}
                    src="../../../public/public/videos/output.mp4"
                    muted
                    playsInline
                    preload="auto"
                ></video>
            </div>
        </>
    );
};

export default Hero;
