import React, { useState, useEffect } from 'react';
import '../App.css';

const questions = [
    {
        type: "checkbox",
        content: "Which of the following is not a metal?",
        options: ["Sand", "Iron", "Silver", "Water"],
        answer: ["Sand", "Water"]
    },
    {
        type: "radio",
        content: "Which of the following is not available on Earth?",
        options: ["Vibranium", "Iron", "Silver", "Water"],
        answer: "Vibranium"
    },
    {
        type: "dropdown",
        content: "Select the District which is not in Tamil Nadu",
        options: ["Ariyalur", "Pune", "Madurai"],
        answer: "Pune"
    },
    {
        type: "text",
        content: "Capital of India",
        answer: "Delhi"
    },
    {
        type: "text",
        content: "12 + 22 + 66",
        answer: "100"
    },
    {
        type: "checkbox",
        content: "Which of the following are states of India?",
        options: ["Tamil Nadu", "San Francisco", "Kerala", "Washington"],
        answer: ["Tamil Nadu", "Kerala"]
    },
    {
        type: "text",
        content: "What is the capital of Tamil Nadu?",
        answer: "Chennai"
    },
    {
        type: "radio",
        content: "Which one is the national fruit of India?",
        options: ["Apple", "Carrot", "Mango"],
        answer: "Mango"
    },
    {
        type: "checkbox",
        content: "Which of the following are programming languages?",
        options: ["Python", "HTML", "CSS", "Java"],
        answer: ["Python", "Java"]
    },
    {
        type: "dropdown",
        content: "Select the largest continent in the world",
        options: ["Australia", "Africa", "Asia"],
        answer: "Asia"
    },
    {
        type: "radio",
        content: "Is 2 + 2 equal to 2 * 2?",
        options: ["Yes", "No"],
        answer: "Yes"
    },
    {
        type: "text",
        content: "Who is the current Prime Minister of India?",
        answer: "Narendra Modi"
    },
    {
        type: "radio",
        content: "Which one is a vegetable?",
        options: ["Apple", "Carrot", "Potato"],
        answer: "Carrot"
    },
    {
        type: "radio",
        content: "Which color is not present in a rainbow?",
        options: ["Violet", "Black", "Yellow"],
        answer: "Black"
    },
    {
        type: "text",
        content: "Number of states in India",
        answer: "29"
    },
    {
        type: "checkbox",
        content: "Which of the following are primary colors?",
        options: ["Red", "Orange", "Green", "Yellow", "Blue"],
        answer: ["Red", "Blue", "Yellow"]
    },
    {
        type: "text",
        content: "(10 + 11) - 20 / 2 is equal to",
        answer: "11"
    },
    {
        type: "radio",
        content: "Which is the national animal of India?",
        options: ["Peacock", "Tiger", "Camel"],
        answer: "Tiger"
    },
    {
        type: "checkbox",
        content: "Which of the following are Avengers?",
        options: ["Iron Man", "Batman", "Black Widow", "Superman", "Spider Man"],
        answer: ["Iron Man", "Black Widow", "Spider Man"]
    },
    {
        type: "dropdown",
        content: "Which country has the highest population?",
        options: ["China", "Russia", "India"],
        answer: "China"
    }
];

const Quiz = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(180); 
    const [userAnswers, setUserAnswers] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [timerId, setTimerId] = useState(null);

    useEffect(() => {
        setShuffledQuestions(shuffleArray(questions));
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);
        setTimerId(timer);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (timeRemaining <= 0 && !quizCompleted) {
            submitQuiz();
        }
    }, [timeRemaining]);

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const saveAnswer = (index, value) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [`q${index}`]: value,
        }));
    };

    const nextPage = () => {
        if (currentPage < Math.ceil(shuffledQuestions.length / 5) - 1) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const submitQuiz = () => {
        clearInterval(timerId);
        let score = 0;
        let answeredQuestions = 0;

        shuffledQuestions.forEach((question, index) => {
            const userAnswer = userAnswers[`q${index}`];
            if (userAnswer !== undefined) {
                answeredQuestions++;
                if (question.type === 'text' || question.type === 'dropdown') {
                    if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
                        score++;
                    }
                } else if (question.type === 'radio') {
                    if (userAnswer === question.answer) {
                        score++;
                    }
                } else if (question.type === 'checkbox') {
                    if (JSON.stringify(userAnswer.sort()) === JSON.stringify(question.answer.sort())) {
                        score++;
                    }
                }
            }
        });

        const timeTaken = 180 - timeRemaining;
        alert(`Your score is ${score} out of ${answeredQuestions}.\nTime taken: ${Math.floor(timeTaken / 60)} minutes ${timeTaken % 60} seconds`);
        setQuizCompleted(true);
    };

    const retakeQuiz = () => {
        setUserAnswers({});
        setCurrentPage(0);
        setTimeRemaining(180);
        setQuizCompleted(false);
        setShuffledQuestions(shuffleArray(questions));
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);
        setTimerId(timer);
    };

    const displayPage = () => {
        const start = currentPage * 5;
        const end = Math.min(start + 5, shuffledQuestions.length);

        return shuffledQuestions.slice(start, end).map((question, i) => (
            <div key={i + start} className="question">
                <label>{question.content}</label>
                {question.type === 'text' && (
                    <input
                        type="text"
                        name={`q${i + start}`}
                        value={userAnswers[`q${i + start}`] || ''}
                        onChange={(e) => saveAnswer(i + start, e.target.value)}
                    />
                )}
                {question.type === 'radio' &&
                    question.options.map((option) => (
                        <div key={option}>
                            <input
                                type="radio"
                                name={`q${i + start}`}
                                value={option}
                                checked={userAnswers[`q${i + start}`] === option}
                                onChange={(e) => saveAnswer(i + start, e.target.value)}
                            />
                            <label>{option}</label>
                        </div>
                    ))}
                {question.type === 'checkbox' &&
                    question.options.map((option) => (
                        <div key={option}>
                            <input
                                type="checkbox"
                                name={`q${i + start}`}
                                value={option}
                                checked={userAnswers[`q${i + start}`]?.includes(option) || false}
                                onChange={(e) => {
                                    const value = userAnswers[`q${i + start}`] || [];
                                    if (e.target.checked) {
                                        value.push(option);
                                    } else {
                                        value.splice(value.indexOf(option), 1);
                                    }
                                    saveAnswer(i + start, value);
                                }}
                            />
                            <label>{option}</label>
                        </div>
                    ))}
                {question.type === 'dropdown' && (
                    <select
                        name={`q${i + start}`}
                        value={userAnswers[`q${i + start}`] || ''}
                        onChange={(e) => saveAnswer(i + start, e.target.value)}
                    >
                        <option value="">Select an option</option>
                        {question.options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        ));
    };

    return (
        <div className="container quiz-container">
            <h2>Quiz</h2>
            {!quizCompleted ? (
                <div>
                    <div className="timer">Time remaining: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60 < 10 ? `0${timeRemaining % 60}` : timeRemaining % 60}</div>
                    {displayPage()}
                    <div className="navigation-buttons">
                        {currentPage > 0 && <button onClick={prevPage}>Previous</button>}
                        {currentPage < Math.ceil(shuffledQuestions.length / 5) - 1 && <button onClick={nextPage}>Next</button>}
                        {currentPage === Math.ceil(shuffledQuestions.length / 5) - 1 && <button onClick={submitQuiz}>Submit</button>}
                    </div>
                </div>
            ) : (
                <div>
                    <p>Thank you for completing the quiz!</p>
                    <button onClick={retakeQuiz}>Retake Quiz</button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
