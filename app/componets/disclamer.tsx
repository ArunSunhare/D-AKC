"use client";
import React, { useState, useEffect } from "react";


export function Disclaimer() {
  const [position, setPosition] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        if (prevPosition <= -50) {
          return 0;
        }
        return prevPosition - 0.1;
      });
    }, 50);


    return () => clearInterval(interval);
  }, []);


  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 overflow-hidden relative">
      <div
        className="whitespace-nowrap flex items-center"
        style={{ transform: `translateX(${position}%)` }}
      >
        <span className="text-sm md:text-base font-medium">
          Avail 10–20% discount on medical services by taking the Sanatani Oath (Shapath)
        </span>
        <span className="mx-8 text-sm md:text-base font-medium">
          सनातनी शपथ (शपथ) लेने पर चिकित्सा सेवाओं पर 10-20% की छूट प्राप्त करें
        </span>
        <span className="text-sm md:text-base font-medium">
          Avail 10–20% discount on medical services by taking the Sanatani Oath (Shapath)
        </span>
        <span className="mx-8 text-sm md:text-base font-medium">
          सनातनी शपथ (शपथ) लेने पर चिकित्सा सेवाओं पर 10-20% की छूट प्राप्त करें
        </span>
        <span className="text-sm md:text-base font-medium">
          Avail 10–20% discount on medical services by taking the Sanatani Oath (Shapath)
        </span>
        <span className="mx-8 text-sm md:text-base font-medium">
          सनातनी शपथ (शपथ) लेने पर चिकित्सा सेवाओं पर 10-20% की छूट प्राप्त करें
        </span>
      </div>
    </div>
  );
}



