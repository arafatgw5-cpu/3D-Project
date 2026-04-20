"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

// Reusable Component: ContainerScroll
export const ContainerScroll = ({
  titleComponent,
  children,
  className = "",
  cardClassName = "",
  perspective = "1000px",
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const checkReducedMotion = () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsReducedMotion(prefersReduced);
    };
    
    checkMobile();
    checkReducedMotion();
    
    window.addEventListener("resize", checkMobile);
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", checkReducedMotion);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.matchMedia("(prefers-reduced-motion: reduce)").removeEventListener("change", checkReducedMotion);
    };
  }, []);

  // Animation values based on scroll with reduced motion support
  const rotate = useTransform(scrollYProgress, [0, 1], isReducedMotion ? [0, 0] : [20, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.7, 0.9] : [1.05, 1]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className={`h-[60rem] md:h-[80rem] flex items-center justify-center relative p-4 md:p-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 ${className}`}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{ perspective }}
      >
        <Header translate={translate}>
          {titleComponent}
        </Header>

        <Card 
          rotate={rotate} 
          scale={scale}
          className={cardClassName}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

// Sub-component: Header with better animations
const Header = ({ translate, children, className = "" }) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className={`max-w-5xl mx-auto text-center mb-8 md:mb-16 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Sub-component: Card with enhanced styling
const Card = ({ 
  rotate, 
  scale, 
  children, 
  className = "",
  innerClassName = ""
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026",
      }}
      className={`max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-2 border-gray-200 dark:border-[#6C6C6C] p-2 md:p-6 bg-white dark:bg-[#222222] rounded-[30px] shadow-2xl transition-all duration-300 hover:shadow-3xl ${className}`}
    >
      <div className={`h-full w-full overflow-hidden rounded-2xl bg-gray-50 dark:bg-zinc-900 ${innerClassName}`}>
        {children}
      </div>
    </motion.div>
  );
};

// Optional: Loading skeleton component
const LoadingSkeleton = () => (
  <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse rounded-2xl" />
);

// Enhanced Image wrapper with loading state
const ScrollImage = ({ src, alt, width, height }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingSkeleton />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`mx-auto rounded-2xl object-cover h-full object-left-top transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        draggable={false}
        priority
        onLoadingComplete={() => setIsLoading(false)}
      />
    </>
  );
};

// --- Main Page Implementation ---
export default function ContainerScrollDemo() {
  return (
    <main className="overflow-x-hidden">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold mx-auto"
            >
              ✨ Premium Feature
            </motion.div>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Scroll Animations
              </span>
              <br />
              <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none block">
                Transform Your UI
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience smooth, hardware-accelerated 3D transformations that respond to your scroll position.
            </p>
          </div>
        }
        cardClassName="hover:border-purple-500/50 transition-colors duration-300"
      >
        <ScrollImage
          src="https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&q=80&w=1400&h=720"
          alt="Dashboard Preview"
          width={1400}
          height={720}
        />
      </ContainerScroll>

      {/* Enhanced extra content */}
      <div className="relative">
        <div className="h-[20rem] bg-gradient-to-t from-transparent to-gray-50 dark:to-gray-900" />
        
        {/* Additional content section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Smooth Performance", desc: "60fps animations using GPU acceleration" },
              { title: "Fully Responsive", desc: "Adapts perfectly to any screen size" },
              { title: "TypeScript Ready", desc: "Full type safety with intelligent autocomplete" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}