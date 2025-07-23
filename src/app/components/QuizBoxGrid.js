import React from 'react';
import './QuizBoxGrid.css';

const QuizBoxGrid = ({ quizTopics, onQuizSelect }) => {
    const handleQuizClick = (topic) => {
        onQuizSelect(topic); 
    };

    return (
        <div className="quiz-box-grid">
            {quizTopics.map((topic, index) => (
                <div
                    key={index}
                    className={`quiz-box quiz-box-color-${index + 1}`}
                    onClick={() => handleQuizClick(topic)}
                >
                    {topic.title}
                </div>
            ))}
        </div>
    );
};

export default QuizBoxGrid;
