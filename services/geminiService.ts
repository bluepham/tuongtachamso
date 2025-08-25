
import { GoogleGenAI, Type } from "@google/genai";
import { QuestionGame1, QuestionGame2, QuestionGame3, QuestionGame4 } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

export const generateGame1Question = async (): Promise<QuestionGame1> => {
  const response = await ai.models.generateContent({
    model,
    contents: "Tạo một câu hỏi cho trò chơi 'Điền bảng giá trị nhanh'. Cho hàm số bậc nhất y = ax + b, với a và b là các số nguyên từ -10 đến 10, a khác 0. Cung cấp hàm số, một giá trị x nguyên từ -10 đến 10. Yêu cầu 4 đáp án cho y, trong đó có một đáp án đúng. Các đáp án sai nên là kết quả của các lỗi tính toán phổ biến (như sai dấu, cộng thay vì trừ,...). Trả về dưới dạng JSON.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          equation: { type: Type.STRING, description: "Hàm số dạng y = ax + b" },
          xValue: { type: Type.INTEGER, description: "Giá trị x cho trước" },
          options: {
            type: Type.ARRAY,
            items: { type: Type.INTEGER },
            description: "4 đáp án số nguyên cho y, có 1 đáp án đúng"
          },
          correctAnswer: { type: Type.INTEGER, description: "Đáp án y đúng" }
        }
      },
    },
  });
  const jsonText = response.text.trim();
  return JSON.parse(jsonText) as QuestionGame1;
};

export const generateGame2Question = async (): Promise<QuestionGame2> => {
    const response = await ai.models.generateContent({
      model,
      contents: "Tạo một câu hỏi cho trò chơi 'Tìm tọa độ ẩn'. Cho hàm số bậc nhất y = ax + b, với a, b là số nguyên từ -8 đến 8, a và b khác 0. Hỏi về giao điểm với trục tung hoặc trục hoành. Cung cấp 4 tọa độ điểm làm đáp án dạng chuỗi '(x, y)', một trong số đó là đúng. Trả về dưới dạng JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            equation: {
              type: Type.OBJECT,
              properties: {
                a: { type: Type.INTEGER },
                b: { type: Type.INTEGER }
              }
            },
            questionText: { type: Type.STRING, description: "Câu hỏi về giao điểm trục tung hoặc hoành" },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4 đáp án tọa độ dạng chuỗi '(x, y)', có 1 đáp án đúng"
            },
            correctAnswer: { type: Type.STRING, description: "Đáp án đúng dạng chuỗi '(x, y)'" }
          }
        },
      },
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as QuestionGame2;
  };
  
  export const generateGame3Question = async (): Promise<QuestionGame3> => {
    const response = await ai.models.generateContent({
      model,
      contents: "Tạo một câu hỏi cho trò chơi 'Đoán tham số a, b'. Cho một hàm số bậc nhất y = ax + b với a, b là số nguyên từ -8 đến 8, a và b khác 0. Cung cấp 4 phương trình làm đáp án dạng chuỗi 'y = ax + b' hoặc 'y = ax - b', một trong số đó là đúng. Các phương trình sai nên có các tham số a hoặc b tương tự để gây nhiễu. Trả về dưới dạng JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            equation: {
                type: Type.OBJECT,
                properties: {
                  a: { type: Type.INTEGER },
                  b: { type: Type.INTEGER }
                }
            },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4 phương trình đáp án, có 1 đáp án đúng"
            },
            correctAnswer: { type: Type.STRING, description: "Phương trình đúng" }
          }
        },
      },
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as QuestionGame3;
  };
  
  export const generateGame4Questions = async (): Promise<QuestionGame4[]> => {
    const response = await ai.models.generateContent({
      model,
      contents: "Tạo một bộ 10 câu hỏi trắc nghiệm nhanh về đồ thị hàm số bậc nhất y = ax + b cho học sinh lớp 8. Các câu hỏi nên đa dạng: 'Đồ thị nào đi qua điểm (x, y)?', 'Hàm số nào đồng biến/nghịch biến?', 'Hàm số nào có tung độ gốc là z?', 'Hàm số nào song song với đường thẳng y=...'. Mỗi câu hỏi có 4 đáp án chuỗi, một đáp án đúng. Trả về một mảng 10 đối tượng JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                  questionText: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctAnswer: { type: Type.STRING }
                }
            }
        },
      },
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as QuestionGame4[];
  };

export const getHint = async (question: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model,
    contents: `Một học sinh đã trả lời sai câu hỏi này: "${question}". Hãy đưa ra một gợi ý ngắn gọn (khoảng 1-2 câu), mang tính xây dựng để giúp học sinh suy nghĩ đúng hướng. Không tiết lộ đáp án. Ví dụ gợi ý: "Hãy xem lại dấu của hệ số a để biết chiều đi của đồ thị nhé!" hoặc "Điểm cắt trục tung có liên quan đến hệ số nào nhỉ?".`,
  });
  return response.text;
};

export const getPraise = async (): Promise<string> => {
  const response = await ai.models.generateContent({
    model,
    contents: "Tạo một lời khen ngợi ngắn gọn, tích cực cho học sinh vừa trả lời đúng một câu hỏi toán học. Ví dụ: 'Tuyệt vời!', 'Chính xác!', 'Làm tốt lắm!', 'Bạn thật thông minh!'. Có thể thêm một icon cảm xúc.",
  });
  return response.text;
};
