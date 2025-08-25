
export enum GameMode {
  Menu = 'MENU',
  Game1 = 'GAME1',
  Game2 = 'GAME2',
  Game3 = 'GAME3',
  Game4 = 'GAME4',
  Scoreboard = 'SCOREBOARD',
}

export interface QuestionGame1 {
  equation: string;
  xValue: number;
  options: number[];
  correctAnswer: number;
}

export interface EquationParams {
  a: number;
  b: number;
}
export interface QuestionGame2 {
  equation: EquationParams;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface QuestionGame3 {
  equation: EquationParams;
  options: string[];
  correctAnswer: string;
}

export interface QuestionGame4 {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export type AnyQuestion = QuestionGame1 | QuestionGame2 | QuestionGame3 | QuestionGame4;

export enum Badge {
  MathStar = 'Ngôi sao Toán học',
  QuickThinker = 'Nhà tư duy nhanh',
  GraphKing = 'Vua đồ thị',
}

export interface UserStats {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number;
  badges: Badge[];
}

export interface GameResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number;
}
