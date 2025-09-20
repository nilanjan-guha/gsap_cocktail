import React from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/SplitText";


gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    useGSAP(() => {
        const heroSplit = new SplitText(".title", { type: "chars,words" });
        const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            ease: 'expo.out',
            duration: 1.8,
            stagger: 0.05
        })
        gsap.from(paragraphSplit.lines,
            {
                opacity: 0,
                yPercent: 100,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.05,
                delay: 1

            })
        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        })
            .to(".right-leaf", { y: -200 }, 0)
            .to(".left-leaf", { y: 200 }, 0);

    }, []);
    return (
        <section id="hero" className='noisy'>
            <h1 className='title'>Mohito</h1>
            <img src="../../../public/public/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />
            <img src="../../../public/public/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />

            <div className='body'>
                <div className='content'>
                    <div className='space-y-5 hidden md:block'>
                        <p>cool crips classic </p>
                        <p className='subtitle'>
                            sip the sipit <br /> summer
                        </p>
                    </div>
                    <div className='view-cocktails'>
                        <p className='subtitle'>Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses.
                            View cocktails</p>
                        <a href="#cocktails">View CockTails</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
