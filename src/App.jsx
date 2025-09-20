import React from "react";
import ScrollTrigger from "gsap/all";
import { gsap } from "gsap";
import SplitText from "gsap/all";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <div className="h-dvh bg-black"></div>
    </main>
  );
};

export default App;
