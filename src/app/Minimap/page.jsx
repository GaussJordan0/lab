"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
export default function Page() {
  const wrapperRef = useRef();
  const x = useSpring(0, {
    damping: 8,
    stiffness: 80,
    mass: 0.8,
  });

  const handleMouseMove = (e) => {
    const bounds = wrapperRef.current.getBoundingClientRect();
    const relativeX = e.clientX - bounds.left;
    if (relativeX < 0 || relativeX > bounds.width) return;
    x.set(relativeX);
  };
  const mouseX = useMotionValue(0);
  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      mouseX.set(e.clientX);
      // console.log(e.clientX)
    });
    return () => {
      document.removeEventListener("mousemove", (e) => {
        mouseX.set(e.clientX);
        // console.log(e.clientX)
      });
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
        <div className="absolute bottom-[30%] left-[32%]">Inspired by <span className="text-[#FF4500]">Rauno</span> <br /> Developed by <span className="text-[#FF4500]">Gaussjordan</span></div>
      <section
        className="flex items-center gap-2 relative rounded-2xl px-8 h-full"
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          style={{ left: x }}
          className={`absolute  bg-[#FF4500] w-[1px] h-[80px] `}
        ></motion.div>
        {[...Array(100).keys()].map((_, i) => (
          <Line mouseX={mouseX} key={i} i={i} />
        ))}
      </section>
    </div>
  );
}
const Line = ({ i, mouseX }) => {
  const lineRef = useRef();

  const distance = useTransform(mouseX, (val) => {
    let bounds = lineRef.current?.getBoundingClientRect() ?? {
      x: 0,
      height: 30,
    };
    return val - bounds.x - bounds.width / 2;
  });
  let height = useTransform(distance, [-100, 0, 100], [30, 60, 30]);
  const modifiedHeight = useSpring(height,{
    damping: 20.1,
    stiffness: 500,
    mass: 0.1,
  });

  return (
    <motion.div
      ref={lineRef}
      style={{ height: modifiedHeight }}
      initial={{ height: 30 }}
      className={`w-[1px] ${
        i % 5 === 0 ? "bg-white" : "bg-white opacity-30"
      }`}
    ></motion.div>
  );
};

