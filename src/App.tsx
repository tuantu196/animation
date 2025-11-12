// import { useState, useMemo, useLayoutEffect, useRef } from "react";
// import MotionBall from "./components/MotionBall";
// import MotionChart from "./components/MotionChart";
// import AnimationPage from "./pages/AnimationPage";

// export default function App() {
//   const [pageIndex, setPageIndex] = useState(0);
//   const pageRef = useRef<HTMLDivElement>(null);

//   const dataLinear = useMemo(
//     () => Array.from({ length: 40 }, (_, i) => ({ time: i, x: i * 12 })),
//     []
//   );
//   const dataEased = useMemo(
//     () =>
//       Array.from({ length: 40 }, (_, i) => ({
//         time: i,
//         x: Math.pow(i / 39, 2.2) * 480,
//       })),
//     []
//   );

//   const pages = useMemo(
//     () => [
//       {
//         id: "intro",
//         title: "GSAP Motion Lab",
//         content: (
//           <div>
//             <p className="mb-4">
//               Khởi động tour các hiệu ứng chuyển động trực quan với GSAP.
//             </p>
//             <MotionBall label="Linear" color="blue" />
//             <MotionBall
//               label="Power2 Ease"
//               color="green"
//               easing="power2.inOut"
//               enableBlur
//             />
//             <MotionChart data={dataLinear} label="Linear Animation" />
//             <MotionChart
//               data={dataEased}
//               label="Eased Animation"
//               strokeColor="#a855f7"
//             />
//           </div>
//         ),
//       },
//       {
//         id: "bounce-elastic",
//         title: "Bounce & Elastic",
//         content: <AnimationPage onBack={() => setPageIndex(0)} />,
//       },
//     ],
//     [dataLinear, dataEased]
//   );

//   useLayoutEffect(() => {
//     if (!pageRef.current) return;
//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         pageRef.current,
//         { autoAlpha: 0, y: 36 },
//         { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }
//       );
//     }, pageRef);
//     return () => ctx.revert();
//   }, [pageIndex]);

//   const goNext = () =>
//     setPageIndex((prev) => Math.min(prev + 1, pages.length - 1));
//   const goPrev = () => setPageIndex((prev) => Math.max(prev - 1, 0));

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <header className="mb-6">
//         <h1 className="text-2xl font-bold mb-2">{pages[pageIndex].title}</h1>
//       </header>

//       <div key={pages[pageIndex].id} ref={pageRef}>
//         {pages[pageIndex].content}
//       </div>

//       {pageIndex === 0 && (
//         <button
//           onClick={goNext}
//           className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//         >
//           Next Page
//         </button>
//       )}
//     </div>
//   );
// }

import { Routes, Route, Link } from "react-router-dom";
import Linear from "./pages/Linear";
import EaseIn from "./pages/EaseIn";
import EaseOut from "./pages/EaseOut";
import Easing from "./pages/Easing";
import EaseInOut from "./pages/EaseInOut";
import Overview from "./pages/Overview";
import RealUseCase from "./pages/RealUseCase";
import ShowCase from "./pages/ShowCase";
import GsapDemo from "./pages/GsapDemo";
import ReFlow1 from "./pages/ReFlow1";
import ReFlow2 from "./pages/Plugin";
import GSAPPluginsDemo from "./pages/Plugin";
import GoodBad from "./pages/GoodBad";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Overview</Link> | <Link to="/liner">Linear</Link> |{" "}
        <Link to="/ease-in">Ease In</Link> |{" "}
        <Link to="/ease-out">Ease Out</Link> | <Link to="/easing">Easing</Link>|{" "}
        <Link to="/ease-in-out">Ease In Out</Link> |{" "}
        <Link to="/good-bad">Good & Bad</Link> |{" "}
        <Link to="/show-case">Show Case</Link>|{" "}
        <Link to="/real-use-case">Real Use Case</Link>|{" "}
        <Link to="/gsap">GSAP</Link>| <Link to="/re-flow1">ReFlow1</Link>|{" "}
        <Link to="/plugin">Plugin</Link>|{" "}
      </nav>

      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/liner" element={<Linear />} />
        <Route path="/ease-in" element={<EaseIn />} />
        <Route path="/ease-out" element={<EaseOut />} />
        <Route path="/easing" element={<Easing />} />
        <Route path="/good-bad" element={<GoodBad />} />
        <Route path="/ease-in-out" element={<EaseInOut />} />
        <Route path="/show-case" element={<ShowCase />} />
        <Route path="/real-use-case" element={<RealUseCase />} />
        <Route path="/gsap" element={<GsapDemo />} />
        <Route path="/re-flow1" element={<ReFlow1 />} />
        <Route path="/plugin" element={<GSAPPluginsDemo />} />
      </Routes>
    </div>
  );
}
