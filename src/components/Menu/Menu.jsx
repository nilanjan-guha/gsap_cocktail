"use client";

import { allCocktails } from "../constants/index";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";

// register plugins
gsap.registerPlugin(Draggable, InertiaPlugin);
const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: -100 },
      {
        xPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      }
    );
    gsap.fromTo(
      ".details h2",
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: "power1.inOut",
      }
    );
    gsap.fromTo(
      ".details p",
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: "power1.inOut",
      }
    );

    gsap.timeline({ repeat: -1 }).set("#svg-stage", { opacity: 1 }).fromTo(
      "#clover",
      {
        transformOrigin: "50%",
        x: 30,
        y: 30,
      },
      {
        duration: 50,
        rotation: 360,
        ease: "none",
      }
    );

    Draggable.create("#svg-stage", {
      type: "x,y", // enable drag in X, Y, and rotation
      trigger: "#svg-stage",
      inertia: true,
      bounds: "#menu",

      snap: {
        x: (value) => Math.round(value / 50) * 50, // snap grid 50px (customize)
        y: (value) => Math.round(value / 50) * 50,
        rotation: (value) => Math.round(value / 45) * 45, // snap rotation every 45°
      },
    });
  }, [currentIndex]);

  const totalCocktails = allCocktails.length;

  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };

  const getCocktailAt = (indexOffset) => {
    return allCocktails[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      {/* Same paths as you had */}
      <img
        src="../../../public/public/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="../../../public/public/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          {/* Left arrow button */}
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="../../../public/public/images/right-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>

          {/* Right arrow button */}
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="../../../public/public/images/left-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div id="svg-stage" className="cocktail">
          <img
            id="hero-lightpass"
            src={currentCocktail.image}
            className="object-contain"
            alt={currentCocktail.name}
          />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>

          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
