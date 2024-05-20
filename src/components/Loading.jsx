import { useEffect, useState } from "react";
import loadingAnimation from "../../public/image.png";

export default function Loading() {
  const [progress, setProgress] = useState(35);
  const [imagePos, setImagePos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 130 ? 35 : prevProgress + 0.95
      );
      setImagePos((prevPos) => (prevPos >= 100 ? 0 : prevPos + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="mb-4 text-lg font-semibold" style={{ color: "#8A8A8A" }}>
        Mencari penerbangan terbaik
      </div>
      <div className="mb-4 text-lg font-semibold" style={{ color: "#8A8A8A" }}>
        Loading
      </div>
      <div className="relative w-[236.46px] h-[69.5px] bg-white border border-black rounded-2xl overflow-hidden">
        <img
          src={loadingAnimation}
          alt="Loading"
          className="h-[69.5px] w-[70px] absolute z-10"
          style={{ left: `${imagePos}%`, transition: "left 0.1s linear" }}
        />
        <div
          className="absolute top-0 left-0 h-full rounded-l-2xl"
          style={{
            width: `${progress}%`,
            backgroundColor: "#7126B5",
            transition: "width 0.1s linear",
          }}
        ></div>
      </div>
    </div>
  );
}
