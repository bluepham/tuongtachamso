
import React, { useState, useEffect } from 'react';

interface GameShellProps {
  title: string;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  timeLimit: number;
  onTimeUp: () => void;
  children: React.ReactNode;
}

const GameShell: React.FC<GameShellProps> = ({ title, questionNumber, totalQuestions, score, timeLimit, onTimeUp, children }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);
  
  const timePercentage = (timeLeft / timeLimit) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-xl border border-slate-200">
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-sky-600">{title}</h2>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div className="bg-sky-100 p-2 rounded-lg">
          <div className="text-sm font-semibold text-sky-700">CÂU HỎI</div>
          <div className="text-xl font-bold">{questionNumber}/{totalQuestions}</div>
        </div>
        <div className="bg-green-100 p-2 rounded-lg">
          <div className="text-sm font-semibold text-green-700">ĐIỂM SỐ</div>
          <div className="text-xl font-bold">{score}</div>
        </div>
        <div className="bg-orange-100 p-2 rounded-lg">
          <div className="text-sm font-semibold text-orange-700">THỜI GIAN</div>
          <div className="text-xl font-bold">{timeLeft}s</div>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-orange-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${timePercentage}%` }}></div>
      </div>
      
      <div>
        {children}
      </div>
    </div>
  );
};

export default GameShell;
