import React from "react";
import ScrollTrigger from "gsap/all";
import { gsap } from "gsap";
import SplitText from "gsap/all";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";
import Cocktails from "./components/Cocktails/Cocktails";
import About from "./components/About/About";
import Art from "./components/Art/Art";
import Menu from "./components/Menu/Menu";
import Contact from "./components/Contact/Contact";
gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <Cocktails />
      <About />
      <Art />
      <Menu />
      <Contact />
    </main>
  );
};

export default App;
