import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "@/store/shop/product-slice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import {
  ArrowLeft,
  Sparkles,
  Send,
  Bot,
  User,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  BookOpen,
  CheckCircle2,
  FileText,
  RotateCcw,
  HelpCircle,
  Code2,
  BrainCircuit,
  X,
  Award,
} from "lucide-react";

const StudyReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productDetails, isloading } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);

  // Document Viewer State
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8; // Simulated multi-page syllabus preview

  // AI Copilot State
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your Zenvora AI Study Copilot . Ask me any doubt about this note, or click one of the quick study chips below to start revision!",
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Interactive Quiz State
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const messagesEndRef = useRef(null);

  // 1. Fetch Note Details on Mount
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  // 2. Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiLoading]);

  // 3. Zoom Handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 70));
  const handleResetZoom = () => setZoomLevel(100);

  // 4. Send Message to Gemini AI
  const handleSendMessage = async (promptText) => {
    const textToSend = promptText || inputPrompt;
    if (!textToSend.trim() || isAiLoading) return;

    // Add user message to feed
    const newMessages = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    setInputPrompt("");
    setIsAiLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai/ask",
        {
          prompt: textToSend,
          noteTitle: productDetails?.title || "Computer Science Notes",
          noteSubject: productDetails?.category || "CS",
          noteDescription: productDetails?.description || "",
        },
        { withCredentials: true }
      );

      if (response?.data?.success) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response.data.answer },
        ]);
      } else {
        toast.error("Gemini AI was unable to respond. Please try again.");
      }
    } catch (error) {
      console.error("AI Error:", error);
      toast.error(error?.response?.data?.message || "Failed to reach AI Copilot.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // 5. Generate 5-Question Quiz
  const handleGenerateQuiz = async () => {
    setIsGeneratingQuiz(true);
    setQuizModalOpen(true);
    setSelectedAnswers({});
    setQuizQuestions([]);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai/quiz",
        {
          noteTitle: productDetails?.title || "Computer Science Notes",
          noteSubject: productDetails?.category || "CS",
          noteDescription: productDetails?.description || "",
        },
        { withCredentials: true }
      );

      if (response?.data?.success && Array.isArray(response.data.quiz)) {
        setQuizQuestions(response.data.quiz);
      } else {
        toast.error("Could not generate quiz. Please try again.");
        setQuizModalOpen(false);
      }
    } catch (error) {
      console.error("Quiz Error:", error);
      toast.error("Failed to generate quiz. Please check your Gemini API key.");
      setQuizModalOpen(false);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleSelectOption = (questionId, optionIndex) => {
    if (selectedAnswers[questionId] !== undefined) return; // Answer locked once clicked
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#FAF8F5] dark:bg-[#0C0C0C] text-[#1C1C1C] dark:text-[#F3F4F6] overflow-hidden">
      {/* 1. TOP STUDY TOOLBAR */}
      <header className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#141414] px-4 flex items-center justify-between shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="rounded-xl border-gray-300 dark:border-gray-700 dark:bg-[#1E1E1E] text-xs font-bold gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Button>

          <div className="h-5 w-[1px] bg-gray-200 dark:bg-gray-800 hidden sm:block" />

          <div>
            <h1 className="text-sm font-extrabold truncate max-w-[200px] sm:max-w-md text-gray-900 dark:text-white">
              {productDetails?.title || "Loading Study Notes..."}
            </h1>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">
              {productDetails?.category || "CORE CS"} • Verified Notes
            </span>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="hidden md:flex items-center bg-gray-100 dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-xl p-0.5">
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 text-xs font-mono font-bold text-gray-700 dark:text-gray-200 cursor-pointer"
            >
              {zoomLevel}%
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Quiz Launcher Button */}
          <Button
            onClick={handleGenerateQuiz}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold gap-1.5 shadow-sm cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exam Quiz</span>
          </Button>
        </div>
      </header>

      {/* 2. DUAL PANE WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT PANE: Note Document Reader (65% width) */}
        <div className="flex-1 flex flex-col bg-[#FAF8F5] dark:bg-[#0A0A0A] overflow-y-auto relative border-r border-gray-200 dark:border-gray-800">
          <div className="flex-1 p-4 sm:p-8 flex justify-center items-start">
            {/* High-contrast Paper Canvas */}
            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
              className="w-full max-w-3xl bg-white dark:bg-[#141414] border-2 border-gray-900 dark:border-gray-700 rounded-3xl p-6 sm:p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] transition-transform duration-200 space-y-6"
            >
              {/* Header inside paper */}
              <div className="border-b-2 border-dashed border-gray-200 dark:border-gray-800 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400">
                    ZENVORA OPEN ACADEMIC REPOSITORY
                  </span>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                    {productDetails?.title}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-gray-400 block">
                    Page {currentPage} of {totalPages}
                  </span>
                  <span className="text-[10px] font-bold font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                    100% FREE
                  </span>
                </div>
              </div>

              {/* Note Preview Image or Diagram */}
              {productDetails?.image ? (
                <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1C1C1C]">
                  <img
                    src={productDetails.image}
                    alt={productDetails.title}
                    className="w-full h-auto object-contain max-h-[420px]"
                  />
                </div>
              ) : (
                <div className="h-64 rounded-2xl bg-gray-100 dark:bg-[#1C1C1C] flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-800">
                  <FileText className="w-12 h-12 mb-2" />
                  <p className="text-xs font-mono">Lecture Note Material</p>
                </div>
              )}

              {/* Note Content / Overview */}
              <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                  Syllabus & Core Concepts
                </h3>
                <p>
                  {productDetails?.description ||
                    "This note contains comprehensive theoretical proofs, algorithm traces, and past semester university exam solutions."}
                </p>

                {/* Key Points Callout */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Key Takeaways for Semester Exams</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 ml-1">
                    <li>Core theoretical definitions and mathematical proofs</li>
                    <li>Time and space complexity comparisons</li>
                    <li>Step-by-step solved problem variations</li>
                    <li>Common viva and technical interview questions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Page Navigation Bar */}
          <div className="sticky bottom-0 bg-white/90 dark:bg-[#141414]/90 backdrop-blur border-t border-gray-200 dark:border-gray-800 p-3 flex items-center justify-between px-6 z-10">
            <span className="text-xs font-mono text-gray-500">
              Navigation: Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="rounded-xl text-xs font-bold"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="rounded-xl text-xs font-bold"
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Gemini AI Study Copilot (35% width) */}
        <aside className="w-full lg:w-[420px] xl:w-[460px] bg-white dark:bg-[#141414] flex flex-col border-t lg:border-t-0 border-gray-200 dark:border-gray-800 shrink-0">
          {/* Copilot Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-[#FAF8F5] dark:bg-[#111111]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">
                    Gemini Copilot
                  </h3>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                  Gemini 1.5 Flash • Context Grounded
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setMessages([
                  {
                    role: "assistant",
                    content: "Chat cleared! How can I help you revise this note?",
                  },
                ])
              }
              className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Quick Action Chips */}
          <div className="p-3 border-b border-gray-100 dark:border-gray-800/80 bg-white dark:bg-[#141414] flex gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSendMessage("Give me a concise 5-bullet summary of the core concepts in this note for fast exam revision.")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800 whitespace-nowrap hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>⚡ 5-Bullet Summary</span>
            </button>

            <button
              onClick={() => handleSendMessage("Explain the primary algorithm or concept from this note with a clean code implementation and comments.")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800 whitespace-nowrap hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <Code2 className="w-3 h-3" />
              <span>💻 Code Example</span>
            </button>

            <button
              onClick={() => handleSendMessage("What are the 3 most common semester exam or viva questions asked from this chapter?")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 text-[11px] font-bold border border-purple-200 dark:border-purple-800 whitespace-nowrap hover:bg-purple-100 transition-colors cursor-pointer"
            >
              <BrainCircuit className="w-3 h-3" />
              <span>🎯 Viva Questions</span>
            </button>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={index}
                  className={`flex gap-3 ${isAssistant ? "items-start" : "items-start justify-end"}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 text-xs font-bold border border-emerald-300 dark:border-emerald-800 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                      isAssistant
                        ? "bg-[#FAF8F5] dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200"
                        : "bg-[#1C1C1C] dark:bg-white text-white dark:text-[#111111] font-medium"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center shrink-0 text-xs font-bold border border-gray-300 dark:border-gray-700 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* AI Thinking Animation */}
            {isAiLoading && (
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-300 dark:border-emerald-800">
                  <Bot className="w-3.5 h-3.5 animate-bounce" />
                </div>
                <div className="bg-[#FAF8F5] dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-800 p-3 rounded-2xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono text-gray-500">Gemini is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Question Input Form */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-[#FAF8F5] dark:bg-[#111111]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-white dark:bg-[#1A1A1A] border-2 border-gray-900 dark:border-gray-700 rounded-2xl px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask a doubt about this note..."
                disabled={isAiLoading}
                className="flex-1 text-xs bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400 py-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputPrompt.trim() || isAiLoading}
                className="h-7 w-7 rounded-xl bg-[#1C1C1C] dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-gray-200 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </div>
        </aside>
      </div>

      {/* 3. INTERACTIVE EXAM QUIZ MODAL */}
      {quizModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#141414] border-2 border-gray-900 dark:border-gray-700 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-[#FAF8F5] dark:bg-[#1A1A1A]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                    AI Exam Practice Quiz
                  </h3>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    5 High-Yield Questions • Instant Explanations
                  </p>
                </div>
              </div>

              <button
                onClick={() => setQuizModalOpen(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {isGeneratingQuiz ? (
                <div className="py-16 text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                    Generating exam questions with Gemini 1.5 Flash...
                  </h4>
                  <p className="text-xs text-gray-400">
                    Analyzing syllabus topics and framing multiple choice questions.
                  </p>
                </div>
              ) : quizQuestions.length > 0 ? (
                <div className="space-y-6">
                  {quizQuestions.map((q, qIndex) => {
                    const isAnswered = selectedAnswers[q.id] !== undefined;
                    const selectedIdx = selectedAnswers[q.id];

                    return (
                      <div
                        key={q.id || qIndex}
                        className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-800 space-y-3"
                      >
                        <p className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                          <span className="font-mono text-emerald-600 dark:text-emerald-400 mr-1.5">
                            Q{qIndex + 1}.
                          </span>
                          {q.question}
                        </p>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedIdx === optIdx;
                            const isCorrect = optIdx === q.correctAnswer;

                            let btnStyle =
                              "bg-white dark:bg-[#141414] border-gray-300 dark:border-gray-700 hover:border-gray-900";
                            if (isAnswered) {
                              if (isCorrect) {
                                btnStyle =
                                  "bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold";
                              } else if (isSelected) {
                                btnStyle =
                                  "bg-red-100 dark:bg-red-950/80 border-red-500 text-red-900 dark:text-red-200 font-bold";
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={isAnswered}
                                onClick={() => handleSelectOption(q.id, optIdx)}
                                className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2 cursor-pointer ${btnStyle}`}
                              >
                                <span className="font-mono uppercase text-gray-400 font-bold">
                                  {String.fromCharCode(65 + optIdx)}.
                                </span>
                                <span className="flex-1">{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation reveal */}
                        {isAnswered && (
                          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-[11px] text-blue-900 dark:text-blue-300 leading-relaxed">
                            <span className="font-bold">Explanation: </span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-gray-400 text-xs">
                  No questions generated. Please try again.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-[#FAF8F5] dark:bg-[#1A1A1A] flex justify-end gap-2">
              <Button
                onClick={() => setQuizModalOpen(false)}
                className="bg-[#1C1C1C] dark:bg-white text-white dark:text-black font-bold text-xs rounded-xl px-5 py-2 cursor-pointer"
              >
                Close Practice Quiz
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyReader;
