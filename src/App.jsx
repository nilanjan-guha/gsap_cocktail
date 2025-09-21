import React from "react";
import ScrollTrigger from "gsap/all";
import { gsap } from "gsap";
import SplitText from "gsap/all";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";
import Cocktails from "./components/Cocktails/Cocktails";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <Cocktails />
    </main>
  );
};

export default App;
