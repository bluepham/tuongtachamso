
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { GameMode, Badge, GameResult, UserStats, AnyQuestion } from './types';
import * as geminiService from './services/geminiService';
import { QuestionGame1, QuestionGame2, QuestionGame3, QuestionGame4 } from './types';
import LoadingSpinner from './components/LoadingSpinner';
import GameShell from './components/GameShell';
import CustomLineChart from './components/LineChart';

// =================================================================
// Game-Specific Interfaces
// =================================================================

interface GameProps<T> {
  onGameEnd: (result: GameResult) => void;
  questions: T[];
}

// =================================================================
// Game Components (with stability fixes)
// =================================================================

const Game1Component: React.FC<GameProps<QuestionGame1>> = ({ onGameEnd, questions }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [startTime] = useState(Date.now());
  const isFinishedRef = useRef(false);

  const nextQuestion = useCallback(() => {
    if (isFinishedRef.current) return;

    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      isFinishedRef.current = true;
      const timeTaken = Math.round((Date.now() - startTime) / 1000);
      onGameEnd({ score, correctAnswers: score / 10, totalQuestions: questions.length, timeTaken });
    }
  }, [currentQ, questions.length, onGameEnd, score, startTime]);

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
    const isFinishedRef = useRef(false);

    const nextQuestion = useCallback(() => {
      if (isFinishedRef.current) return;

      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        isFinishedRef.current = true;
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        onGameEnd({ score, correctAnswers: score / 10, totalQuestions: questions.length, timeTaken });
      }
    }, [currentQ, questions.length, onGameEnd, score, startTime]);
  
    const handleAnswer = (answer: string) => {
      if (selected !== null) return;
      setSelected(answer);
      const correct = answer === questions[currentQ].correctAnswer;
      setIsCorrect(correct);
      if (correct) setScore(s => s + 10);
      setTimeout(nextQuestion, 1500);
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
    const isFinishedRef = useRef(false);

    const nextQuestion = useCallback(() => {
      if (isFinishedRef.current) return;
      
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        isFinishedRef.current = true;
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        onGameEnd({ score, correctAnswers: score / 10, totalQuestions: questions.length, timeTaken });
      }
    }, [currentQ, questions.length, onGameEnd, score, startTime]);
  
    const handleAnswer = (answer: string) => {
      if (selected !== null) return;
      setSelected(answer);
      const correct = answer === questions[currentQ].correctAnswer;
      setIsCorrect(correct);
      if (correct) setScore(s => s + 10);
      setTimeout(nextQuestion, 1500);
    };
  
    const getButtonClass = (option: string) => {
        if (selected === null) return "bg-sky-500 hover:bg-sky-600";
        if (option === questions[currentQ].correctAnswer) return "bg-green-500";
        if (option === selected && !isCorrect) return "bg-red-500";
        return "bg-slate-400";
    }
  
    const question = questions[currentQ];
  
    return (
       <GameShell title="Đoán Tham Số a, b" questionNumber={currentQ + 1} totalQuestions={questions.length} score={score} timeLimit={45} onTimeUp={nextQuestion}>
          <div className="text-center">
              <p className="text-xl md:text-2xl mb-2">Đồ thị nào dưới đây tương ứng với hàm số đã cho?</p>
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
    const isFinishedRef = useRef(false);

    const nextQuestion = useCallback(() => {
        if (isFinishedRef.current) return;

        if (currentQ < questions.length - 1) {
            setCurrentQ(q => q + 1);
            setSelected(null);
            setIsCorrect(null);
        } else {
            isFinishedRef.current = true;
            const timeTaken = Math.round((Date.now() - startTime) / 1000);
            onGameEnd({ score, correctAnswers: score / 10, totalQuestions: questions.length, timeTaken });
        }
    }, [currentQ, questions.length, onGameEnd, score, startTime]);

    const handleAnswer = (answer: string) => {
        if (selected !== null) return;
        setSelected(answer);
        const correct = answer === questions[currentQ].correctAnswer;
        setIsCorrect(correct);
        if (correct) setScore(s => s + 10);
        setTimeout(nextQuestion, 1500);
    };

    const getButtonClass = (option: string) => {
        if (selected === null) return "bg-sky-500 hover:bg-sky-600";
        if (option === questions[currentQ].correctAnswer) return "bg-green-500";
        if (option === selected && !isCorrect) return "bg-red-500";
        return "bg-slate-400";
    }

    const question = questions[currentQ];

    return (
        <GameShell title="Trắc Nghiệm Tốc Độ" questionNumber={currentQ + 1} totalQuestions={questions.length} score={score} timeLimit={15} onTimeUp={nextQuestion}>
            <div className="text-center">
                <p className="text-xl md:text-2xl mb-6 font-semibold">{question.questionText}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {question.options.map((opt, i) => (
                        <button key={i} onClick={() => handleAnswer(opt)} disabled={selected !== null} className={`p-4 text-lg font-bold text-white rounded-lg transition-transform transform hover:scale-105 disabled:opacity-70 disabled:transform-none ${getButtonClass(opt)}`}>
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        </GameShell>
    );
};

// =================================================================
// UI Components
// =================================================================

const MenuComponent: React.FC<{ onSelectGame: (mode: GameMode) => void }> = ({ onSelectGame }) => {
    const games = [
        { mode: GameMode.Game1, title: 'Điền Bảng Giá Trị Nhanh', description: 'Tính giá trị y khi biết x.', icon: '⚡️' },
        { mode: GameMode.Game2, title: 'Tìm Tọa Độ Ẩn', description: 'Tìm giao điểm của đồ thị với các trục.', icon: '📍' },
        { mode: GameMode.Game3, title: 'Đoán Tham Số a, b', description: 'Xác định phương trình từ đồ thị.', icon: '📈' },
        { mode: GameMode.Game4, title: 'Trắc Nghiệm Tốc Độ', description: 'Trả lời nhanh các câu hỏi lý thuyết.', icon: '🧠' }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-sky-600">Thử Thách Toán Học</h1>
                <p className="text-lg text-slate-600 mt-2">Hàm Số Bậc Nhất y = ax + b</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map(game => (
                    <button key={game.mode} onClick={() => onSelectGame(game.mode)} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left border-2 border-sky-100 hover:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-300">
                        <div className="flex items-center">
                            <span className="text-4xl mr-4">{game.icon}</span>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800">{game.title}</h3>
                                <p className="text-slate-500 mt-1">{game.description}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const ScoreboardComponent: React.FC<{ stats: UserStats, onPlayAgain: () => void }> = ({ stats, onPlayAgain }) => {
    return (
        <div className="w-full max-w-2xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-xl border-2 border-amber-200">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-amber-500">KẾT QUẢ VÒNG CHƠI</h2>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-green-100 p-4 rounded-lg">
                        <div className="text-sm font-semibold text-green-700">ĐIỂM SỐ</div>
                        <div className="text-3xl font-bold">{stats.score}</div>
                    </div>
                    <div className="bg-sky-100 p-4 rounded-lg">
                        <div className="text-sm font-semibold text-sky-700">TRẢ LỜI ĐÚNG</div>
                        <div className="text-3xl font-bold">{stats.correctAnswers}/{stats.totalQuestions}</div>
                    </div>
                    <div className="bg-orange-100 p-4 rounded-lg col-span-2 md:col-span-1">
                        <div className="text-sm font-semibold text-orange-700">THỜI GIAN</div>
                        <div className="text-3xl font-bold">{stats.timeTaken}s</div>
                    </div>
                </div>

                {stats.badges.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-slate-700">DANH HIỆU ĐẠT ĐƯỢC</h3>
                        <div className="flex justify-center items-center gap-4 mt-3 flex-wrap">
                            {stats.badges.map(badge => (
                                <span key={badge} className="bg-yellow-400 text-yellow-900 text-sm font-bold px-4 py-2 rounded-full shadow-md">
                                    🏆 {badge}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                
                <button onClick={onPlayAgain} className="mt-10 w-full md:w-auto bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105">
                    Chơi Lại
                </button>
            </div>
        </div>
    );
};


// =================================================================
// Main App Component
// =================================================================

const App: React.FC = () => {
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.Menu);
    const [questions, setQuestions] = useState<AnyQuestion[]>([]);
    const [lastResult, setLastResult] = useState<GameResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSelectGame = useCallback(async (mode: GameMode) => {
        setLoading(true);
        setError(null);
        setQuestions([]);
        try {
            let fetchedQuestions: AnyQuestion[] = [];
            const NUM_QUESTIONS_PER_GAME = 5;

            switch (mode) {
                case GameMode.Game1:
                    fetchedQuestions = await Promise.all(
                        Array(NUM_QUESTIONS_PER_GAME).fill(0).map(() => geminiService.generateGame1Question())
                    );
                    break;
                case GameMode.Game2:
                     fetchedQuestions = await Promise.all(
                        Array(NUM_QUESTIONS_PER_GAME).fill(0).map(() => geminiService.generateGame2Question())
                    );
                    break;
                case GameMode.Game3:
                     fetchedQuestions = await Promise.all(
                        Array(NUM_QUESTIONS_PER_GAME).fill(0).map(() => geminiService.generateGame3Question())
                    );
                    break;
                case GameMode.Game4:
                    // This service already returns an array of questions
                    fetchedQuestions = await geminiService.generateGame4Questions();
                    break;
            }
            if(fetchedQuestions.length > 0) {
              setQuestions(fetchedQuestions);
              setGameMode(mode);
            } else {
              throw new Error("Không thể tải câu hỏi từ AI. Vui lòng thử lại.");
            }
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Đã có lỗi không xác định xảy ra.");
            setGameMode(GameMode.Menu); // Go back to menu on error
        } finally {
            setLoading(false);
        }
    }, []);

    const handleGameEnd = useCallback((result: GameResult) => {
        setLastResult(result);
        setGameMode(GameMode.Scoreboard);
    }, []);

    const handlePlayAgain = useCallback(() => {
        setGameMode(GameMode.Menu);
        setLastResult(null);
    }, []);
    
    const userStats = useMemo<UserStats | null>(() => {
        if (!lastResult) return null;

        const { score, correctAnswers, totalQuestions, timeTaken } = lastResult;
        const badges: Badge[] = [];

        if (correctAnswers === totalQuestions) {
            badges.push(Badge.MathStar);
        }
        if (timeTaken / totalQuestions < 10) {
            badges.push(Badge.QuickThinker);
        }
        if ((gameMode === GameMode.Game2 || gameMode === GameMode.Game3) && score > totalQuestions * 8) {
             badges.push(Badge.GraphKing);
        }

        return { score, correctAnswers, totalQuestions, timeTaken, badges };
    }, [lastResult, gameMode]);


    const renderContent = () => {
        if (loading) return <LoadingSpinner />;

        if (error) {
            return (
                <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-red-600">Lỗi!</h2>
                    <p className="text-slate-600 mt-2">{error}</p>
                    <button onClick={handlePlayAgain} className="mt-6 bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg">
                        Về Menu
                    </button>
                </div>
            );
        }

        switch (gameMode) {
            case GameMode.Menu:
                return <MenuComponent onSelectGame={handleSelectGame} />;
            case GameMode.Game1:
                return <Game1Component questions={questions as QuestionGame1[]} onGameEnd={handleGameEnd} />;
            case GameMode.Game2:
                return <Game2Component questions={questions as QuestionGame2[]} onGameEnd={handleGameEnd} />;
            case GameMode.Game3:
                return <Game3Component questions={questions as QuestionGame3[]} onGameEnd={handleGameEnd} />;
            case GameMode.Game4:
                return <Game4Component questions={questions as QuestionGame4[]} onGameEnd={handleGameEnd} />;
            case GameMode.Scoreboard:
                return userStats && <ScoreboardComponent stats={userStats} onPlayAgain={handlePlayAgain} />;
            default:
                return <MenuComponent onSelectGame={handleSelectGame} />;
        }
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center p-4 font-sans">
            {renderContent()}
        </main>
    );
};

export default App;
