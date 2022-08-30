import { useState, useEffect, useRef } from "react";
interface Props {
  value: number;
}
const ProgressCircle = ({ value }: Props) => {
  const circleRef = useRef<any>(null);
  const [strokeDasharray, setStrokeDasharray] = useState<number>(280);
  const [strokeOffset, setStrokeOffset] = useState<number>(278);
  const [progress, setProgress] = useState<number>(value);
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * strokeDasharray;
    setStrokeOffset(progressOffset);
    let count = 0;
    let interval = undefined;
    interval = setInterval(() => {
      count === value ? value : (count += 1);
      setCounter(count);
    }, 10);
    console.log(strokeOffset);
    circleRef.current.style = "transition: stroke-dashoffset 850ms ease-in-out";
    console.log(circleRef);
  }, [setStrokeOffset, progress, strokeOffset]);

  return (
    <div className="rating flex-[50%]">
      <div className="outer">
        <div className="inner flex items-center justify-center">
          <div className="text-[#8C948C] font-semibold">{counter}%</div>
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="100px"
        height="100px"
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#e91e63" />
            <stop offset="100%" stopColor="#673ab7" />
          </linearGradient>
        </defs>
        <circle
          ref={circleRef}
          cx="50"
          cy="50"
          r="45"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeOffset}
        />
      </svg>
    </div>
  );
};

export default ProgressCircle;
