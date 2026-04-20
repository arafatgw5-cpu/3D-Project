"use client";

import React, { Suspense, lazy } from "react";

// ========= utils =========
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ========= Card =========
const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-black text-white shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

// ========= Spotlight =========
const Spotlight = ({ className, fill = "white" }) => {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute z-[1] h-[169%] w-[138%] opacity-30 lg:w-[84%]",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <ellipse
        cx="1924.71"
        cy="273.501"
        rx="1924.71"
        ry="273.501"
        transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
        fill={fill}
        fillOpacity="0.2"
      />
    </svg>
  );
};

// ========= Spline =========
const Spline = lazy(() => import("@splinetool/react-spline"));

const SplineScene = ({ scene, className }) => {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
};

// ========= Main Component =========
export default function Page() {
  return (
    <main className="min-h-screen bg-black p-6 md:p-10">
      <Card className="relative h-[500px] w-full overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

        <div className="flex h-full flex-col md:flex-row">
          {/* Left */}
          <div className="relative z-10 flex flex-1 flex-col justify-center p-8">
            <h1 className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Interactive 3D
            </h1>
            <p className="mt-4 max-w-lg text-gray-300">
              Bring your UI to life with beautiful 3D scenes. Create immersive
              experiences that capture attention.
            </p>
          </div>

          {/* Right */}
          <div className="relative flex-1">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full w-full"
            />
          </div>
        </div>
      </Card>
    </main>
  );
}