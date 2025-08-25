
import React, { useState, useCallback, useMemo } from 'react';
import { GameMode, Badge, GameResult, UserStats } from './types';
import * as geminiService from './services/geminiService';
import { QuestionGame1, QuestionGame2, QuestionGame3, QuestionGame4 } from './types';
import LoadingSpinner from './components/LoadingSpinner';
import GameShell from './components/GameShell';
import CustomLineChart from './components/LineChart';
import { Recharts_LineChart } from 'recharts/types/chart/LineChart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';


// =================================================================
// Game Components (Defined outside App to prevent re-creation)
// =================================================================

interface GameProps<T> {
  onGameEnd: (result: GameResult) => void;
  questions: T[];
}

const Game1Component: React.FC<GameProps<QuestionGame1>> = ({ onGameEnd, questions }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [startTime] = useState(Date.now());

  const handleAnswer = (answer: number) => {
    if (selected !== null) return;
    setSelected(answer);
    const correct = answer === questions[currentQ].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 10);
    }
    setTimeout(nextQuestion, 1500);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      const timeTaken = Math.round((Date.now() - startTime) / 1000);
      onGameEnd({ score, correctAnswers: score / 10, totalQuestions: questions.length, timeTaken });
    }
  };
  
  const getButtonClass = (option: number) => {
    if (selected === null) return "bg-sky-500 hover:bg-sky-600";
    if (option === questions[currentQ].correctAnswer) return "bg-green-500";
    if (option === selected && !isCorrect) return "bg-red-500";
    return "bg-slate-400";
  }

  const question = questions[currentQ];

  return (
     <GameShell title="Điền Bảng Giá Trị Nhanh" questionNumber={currentQ + 1} totalQuestions={questions.length} score={score} timeLimit={20} onTimeUp={nextQuestion}>
        <div className="text-center">
            <p className="text-xl md:text-2xl mb-2">Cho hàm số:</p>
            <p className="text-3xl md:text-4xl font-bold text-indigo-600 bg-indigo-50 p-4 rounded-lg inline-block mb-6">{question.equation}</p>
            <p className="text-xl md:text-2xl mb-4">Khi <span className="font-bold text-pink-500">x = {question.xValue}</span>, giá trị của y là bao nhiêu?</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
                {question.options.map((opt, i) => (
                    <button key={i} onClick={() => handleAnswer(opt)} disabled={selected !== null} className={`p-4 text-2xl font-bold text-white rounded-lg transition-transform transform hover:scale-105 disabled:opacity-70 disabled:transform-none ${getButtonClass(opt)}`}>
                        {opt}
                    </button>
                ))}
            </div>
        </div>
     </GameShell>
  );
};


const Game2Component: React.FC<GameProps<QuestionGame2>> = ({ onGameEnd, questions }) => {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [startTime] = useState(Date.now());
  
    const handleAnswer = (answer: string) => {
      if (selected !== null) return;
      setSelected(answer);
      const correct = answer === questions[currentQ].correctAnswer;
      setIsCorrect(correct);
      if (correct) setScore(s => s + 10);
      setTimeout(nextQuestion, 1500);
    };
  
    const nextQuestion = () => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        onGameEnd({ score, correctAnswers: score / 10, totalQuestions: questions.length, timeTaken });
      }
    };
    
    const getButtonClass = (option: string) => {
        if (selected === null) return "bg-sky-500 hover:bg-sky-600";
        if (option === questions[currentQ].correctAnswer) return "bg-green-500";
        if (option === selected && !isCorrect) return "bg-red-500";
        return "bg-slate-400";
    }
  
    const question = questions[currentQ];
  
    return (
       <GameShell title="Tìm Tọa Độ Ẩn" questionNumber={currentQ + 1} totalQuestions={questions.length} score={score} timeLimit={30} onTimeUp={nextQuestion}>
          <div className="text-center">
              <p className="text-xl md:text-2xl mb-2">{question.questionText}</p>
              <CustomLineChart equation={question.equation} />
              <div className="grid grid-cols-2 gap-4 mt-4">
                  {question.options.map((opt, i) => (
                      <button key={i} onClick={() => handleAnswer(opt)} disabled={selected !== null} className={`p-4 text-2xl font-bold text-white rounded-lg transition-transform transform hover:scale-105 disabled:opacity-70 disabled:transform-none ${getButtonClass(opt)}`}>
                          {opt}
                      </button>
                  ))}
              </div>
          </div>
       </GameShell>
    );
};

const Game3Component: React.FC<GameProps<QuestionGame3>> = ({ onGameEnd, questions }) => {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [startTime] = useState(Date.now());
  
    const handleAnswer = (answer: string) => {
      if (selected !== null) return;
      setSelected(answer);
      const correct = answer === questions[currentQ].correctAnswer;
      setIsCorrect(correct);
      if (correct) setScore(s => s + 10);
      setTimeout(nextQuestion, 1500);
    };
  
    const nextQuestion = () => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        onGameEnd({ score, correctAnswers: score / 10, totalQuestions: questions.length, timeTaken });
      }
    };
  
    const getButtonClass = (option: string) => {
        if (selected === null) return "bg-sky-500 hover:bg-sky-600";
        if (option === questions[currentQ].correctAnswer) return "bg-green-500";
        if (option === selected && !isCorrect) return "bg-red-500";
        return "bg-slate-400";
    }
  
    const question = questions[currentQ];
  
    return (
       <GameShell title="Đoán Tham Số a, b" questionNumber={currentQ + 1} totalQuestions={questions.length} score={score} timeLimit={30} onTimeUp={nextQuestion}>
          <div className="text-center">
              <p className="text-xl md:text-2xl mb-2">Đồ thị dưới đây ứng với phương trình nào?</p>
              <CustomLineChart equation={question.equation} />
              <div className="grid grid-cols-2 gap-4 mt-4">
                  {question.options.map((opt, i) => (
                      <button key={i} onClick={() => handleAnswer(opt)} disabled={selected !== null} className={`p-4 text-xl font-bold text-white rounded-lg transition-transform transform hover:scale-105 disabled:opacity-70 disabled:transform-none ${getButtonClass(opt)}`}>
                          {opt}
                      </button>
                  ))}
              </div>
          </div>
       </GameShell>
    );
};

const Game4Component: React.FC<GameProps<QuestionGame4>> = ({ onGameEnd, questions }) => {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [startTime] = useState(Date.now());
  
    const handleAnswer = (answer: string) => {
      if (selected !== null) return;
      setSelected(answer);
      const correct = answer === questions[currentQ].correctAnswer;
      setIsCorrect(correct);
      if (correct) setScore(s => s + 10);
      setTimeout(nextQuestion, 1000);
    };
  
    const nextQuestion = () => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        onGameEnd({ score, correctAnswers: score / 10, totalQuestions: questions.length, timeTaken });
      }
    };
  
    const getButtonClass = (option: string) => {
        if (selected === null) return "bg-sky-500 hover:bg-sky-600";
        if (option === questions[currentQ].correctAnswer) return "bg-green-500";
        if (option === selected && !isCorrect) return "bg-red-500";
        return "bg-slate-400";
    }
  
    const question = questions[currentQ];
  
    return (
       <GameShell title="Ai Nhanh Hơn" questionNumber={currentQ + 1} totalQuestions={questions.length} score={score} timeLimit={15} onTimeUp={nextQuestion}>
          <div className="text-center">
              <p className="text-xl md:text-2xl mb-6 min-h-[6rem] flex items-center justify-center bg-slate-100 p-4 rounded-lg">{question.questionText}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {question.options.map((opt, i) => (
                      <button key={i} onClick={() => handleAnswer(opt)} disabled={selected !== null} className={`p-3 text-lg font-semibold text-white rounded-lg transition-transform transform hover:scale-105 disabled:opacity-70 disabled:transform-none ${getButtonClass(opt)}`}>
                          {opt}
                      </button>
                  ))}
              </div>
          </div>
       </GameShell>
    );
};


// =================================================================
// App Component
// =================================================================

export default function App() {
  const [gameState, setGameState] = useState<GameMode>(GameMode.Menu);
  const [gameQuestions, setGameQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  const startGame = useCallback(async (mode: GameMode) => {
    setIsLoading(true);
    setError(null);
    setGameQuestions([]);
    try {
      let questions;
      const questionCount = 5; // 5 questions for graph games
      const quizCount = 10;
      switch (mode) {
        case GameMode.Game1:
          questions = await Promise.all(Array(questionCount).fill(0).map(() => geminiService.generateGame1Question()));
          break;
        case GameMode.Game2:
          questions = await Promise.all(Array(questionCount).fill(0).map(() => geminiService.generateGame2Question()));
          break;
        case GameMode.Game3:
            questions = await Promise.all(Array(questionCount).fill(0).map(() => geminiService.generateGame3Question()));
            break;
        case GameMode.Game4:
            questions = await geminiService.generateGame4Questions();
            break;
        default:
          throw new Error("Invalid game mode");
      }
      setGameQuestions(questions);
      setGameState(mode);
    } catch (e) {
      console.error(e);
      setError("Không thể tải câu hỏi từ AI. Vui lòng thử lại.");
      setGameState(GameMode.Menu);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGameEnd = useCallback((result: GameResult) => {
    const badges: Badge[] = [];
    if (result.correctAnswers / result.totalQuestions >= 0.9) {
        badges.push(Badge.MathStar);
    }
    if (result.timeTaken / result.totalQuestions < 7) {
        badges.push(Badge.QuickThinker);
    }
    if ((gameState === GameMode.Game2 || gameState === GameMode.Game3) && result.correctAnswers === result.totalQuestions) {
        badges.push(Badge.GraphKing);
    }

    setUserStats({ ...result, badges });
    setGameState(GameMode.Scoreboard);
  }, [gameState]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    switch (gameState) {
      case GameMode.Game1:
        return <Game1Component questions={gameQuestions as QuestionGame1[]} onGameEnd={handleGameEnd} />;
      case GameMode.Game2:
        return <Game2Component questions={gameQuestions as QuestionGame2[]} onGameEnd={handleGameEnd} />;
      case GameMode.Game3:
        return <Game3Component questions={gameQuestions as QuestionGame3[]} onGameEnd={handleGameEnd} />;
      case GameMode.Game4:
        return <Game4Component questions={gameQuestions as QuestionGame4[]} onGameEnd={handleGameEnd} />;
      case GameMode.Scoreboard:
        return <Scoreboard stats={userStats!} onPlayAgain={() => setGameState(GameMode.Menu)} />;
      case GameMode.Menu:
      default:
        return <MainMenu onStartGame={startGame} error={error} />;
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 font-sans">
        <Header />
        <main className="w-full flex-grow flex items-center justify-center">
            {renderContent()}
        </main>
        <Footer />
    </div>
  );
}


// =================================================================
// Sub-Components (Defined outside App to prevent re-creation)
// =================================================================
const Header = () => (
    <header className="w-full text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-sky-700">Thử Thách Toán Học</h1>
        <p className="text-lg md:text-xl text-slate-600 mt-2">Khám phá đồ thị hàm số <code className="bg-sky-100 text-sky-800 px-2 py-1 rounded">y = ax + b</code></p>
    </header>
);

const Footer = () => (
    <footer className="w-full text-center mt-8 text-sm text-slate-500">
        <p>Thiết kế bởi: <strong>Lê Thị Hà</strong> - Giáo viên Toán</p>
        <p>Đơn vị: Trường TH-THCS Chiềng Chăn – Sơn La</p>
    </footer>
);

interface MainMenuProps {
    onStartGame: (mode: GameMode) => void;
    error: string | null;
}
const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, error }) => {
    const games = [
        { mode: GameMode.Game1, title: "Điền Bảng Giá Trị Nhanh", description: "Tính giá trị y khi biết x.", icon: "📝" },
        { mode: GameMode.Game2, title: "Tìm Tọa Độ Ẩn", description: "Xác định giao điểm của đồ thị với các trục.", icon: "📍" },
        { mode: GameMode.Game3, title: "Đoán Tham Số a, b", description: "Chọn đúng phương trình cho đồ thị.", icon: "📈" },
        { mode: GameMode.Game4, title: "Ai Nhanh Hơn", description: "Trả lời 10 câu hỏi trắc nghiệm tốc độ.", icon: "⚡️" }
    ];

    return (
        <div className="w-full max-w-2xl">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map(game => (
                    <button key={game.mode} onClick={() => onStartGame(game.mode)} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left flex flex-col items-start h-full">
                        <span className="text-4xl mb-3">{game.icon}</span>
                        <h3 className="text-xl font-bold text-sky-700 mb-2">{game.title}</h3>
                        <p className="text-slate-600 flex-grow">{game.description}</p>
                        <div className="mt-4 bg-sky-500 text-white font-bold py-2 px-4 rounded-full self-end">Bắt đầu</div>
                    </button>
                ))}
            </div>
        </div>
    );
};


interface ScoreboardProps {
    stats: UserStats;
    onPlayAgain: () => void;
}
const Scoreboard: React.FC<ScoreboardProps> = ({ stats, onPlayAgain }) => {
    const badgeIcons: Record<Badge, string> = {
        [Badge.MathStar]: '🌟',
        [Badge.QuickThinker]: '🧠',
        [Badge.GraphKing]: '👑'
    };

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-2">Hoàn Thành!</h2>
            <p className="text-slate-600 mb-6">Đây là kết quả của bạn:</p>

            <div className="grid grid-cols-2 gap-4 text-left mb-6">
                <div className="bg-sky-50 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-sky-700">Điểm Số</div>
                    <div className="text-3xl font-bold">{stats.score}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-green-700">Câu Đúng</div>
                    <div className="text-3xl font-bold">{stats.correctAnswers}/{stats.totalQuestions}</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg col-span-2">
                    <div className="text-sm font-semibold text-orange-700">Thời Gian</div>
                    <div className="text-3xl font-bold">{stats.timeTaken} giây</div>
                </div>
            </div>

            {stats.badges.length > 0 && (
                 <div className="mb-6">
                    <h3 className="font-bold text-lg mb-2">Huy Hiệu Đạt Được</h3>
                    <div className="flex justify-center gap-4">
                        {stats.badges.map(badge => (
                             <div key={badge} className="flex flex-col items-center bg-yellow-100 p-3 rounded-lg border-2 border-yellow-300">
                                 <span className="text-4xl">{badgeIcons[badge]}</span>
                                 <span className="text-sm font-semibold text-yellow-800 mt-1">{badge}</span>
                             </div>
                        ))}
                    </div>
                 </div>
            )}

            <button onClick={onPlayAgain} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition-transform transform hover:scale-105">
                Chơi Lại
            </button>
        </div>
    );
};
