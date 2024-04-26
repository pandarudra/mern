import React, { useEffect, useState } from "react";

const Time = () => {
  const [date, setDate] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDate(now.toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="w-full h-10 font-black bg-transparent text-white text-center text-3xl font-mono">
        {date}
      </div>
    </>
  );
};

export default Time;
