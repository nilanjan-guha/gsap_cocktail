import React from "react";
import ScrollTrigger from "gsap/all";
import { gsap } from "gsap";
import SplitText from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <div className="flex-center h-[100vh]">
      <h1 className="text-3xl text-indigo-300">
        Hello Nilanjan welcome to the gsap{" "}
      </h1>
    </div>
  );
};

export default App;
