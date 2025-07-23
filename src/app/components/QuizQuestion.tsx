import React, { useState } from 'react';
import './QuizQuestion.css';

// Define interfaces for quiz data and choice data
interface Quiz {
    id: number;
    question: string;
    correctAnswer: string;
}

interface Choice {
    id: number;
    optionText: string;
    quizId: number;
}

interface QuizQuestionProps {
    quizData: Quiz[];
    choicesData: {
        quizId: number;
        choices: Choice[];
    }[];
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ quizData, choicesData }) => {
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [showResults, setShowResults] = useState(false);

    const handleOptionChange = (questionId: number, option: string) => {
        setAnswers({
            ...answers,
            [questionId]: option,
        });
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    const handleClear = () => {
        setAnswers({});
        setShowResults(false);
    };

    const calculateScore = () => {
        let correctCount = 0;
        quizData.forEach((question) => {
            if (answers[question.id] === question.correctAnswer) {
                correctCount++;
            }
        });
        return (correctCount / quizData.length) * 100;
    };

    return (
        <div className="quizzes">
            <h2 style={{ paddingBottom: '5px', fontSize: '22px' }}>Quiz Questions</h2>
            {quizData.length === 0 ? (
                <p>No quiz questions available.</p>
            ) : (
                <>
                    {quizData.map((question) => (
                        <div key={question.id} className="quiz-question">
                            <h4>{question.question}</h4>
                            {choicesData
                                .find((choice) => choice.quizId === question.id)
                                ?.choices.map((choice) => (
                                    <label key={choice.id} className="option-label">
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={choice.optionText}
                                            checked={answers[question.id] === choice.optionText}
                                            onChange={() =>
                                                handleOptionChange(
                                                    question.id,
                                                    choice.optionText
                                                )
                                            }
                                        />
                                        {choice.optionText}
                                    </label>
                                ))}
                        </div>
                    ))}
                    <div className="button-group">
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={handleClear} className="clear-button">
                            Clear
                        </button>
                    </div>
                    {showResults && (
                        <div className="quiz-results">
                            <h3>Results</h3>
                            <p>Your Score: {calculateScore()}%</p>
                            {quizData.map((question) => (
                                <div key={question.id}>
                                    <p>
                                        <strong>Q: {question.question}</strong>
                                    </p>
                                    <p
                                        className={
                                            answers[question.id] ===
                                            question.correctAnswer
                                                ? 'correct-answer'
                                                : 'incorrect-answer'
                                        }
                                    >
                                        Your Answer: {answers[question.id]} <br />
                                        Correct Answer: {question.correctAnswer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default QuizQuestion;
