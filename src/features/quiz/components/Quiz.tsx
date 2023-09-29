import { ILanguage } from "@/features/leaderboard/types";
import {
    Button,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import getQuestions from "../api/getQuestions";
import { IQuestion, ISolution, QuestionInputProps } from "../types";
import postScore from "../api/postScore";
import { NotificationType } from "@/features/notification/types";

const Quiz = ({
    languages,
    addNotification,
}: {
    languages: ILanguage[];
    addNotification: (message: string, type: NotificationType) => void;
}) => {
    const [language, setLanguage] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(1);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [countQuestions, setCountQuestions] = useState(0);
    const [startQuiz, setStartQuiz] = useState(false);
    const [solutions, setSolutions] = useState<ISolution[]>([]);
    const [totalScore, setScore] = useState<number>(0);

    const resetPage = () => {
        setLanguage("");
        setDifficulty(1);
        setQuestions([]);
        setCountQuestions(0);
        setStartQuiz(false);
        setSolutions([]);
        setScore(0);
    };

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await getServerQuestions();
        setStartQuiz(true);
    };

    const getServerQuestions = async () => {
        const ques = await getQuestions(language, difficulty);
        setQuestions(ques);
        setCountQuestions(countQuestions + ques.length);
        const tempSolutions = ques.map((que) => {
            return {
                answer: que.answerIndex,
                userAnswer: 0,
            };
        });

        setSolutions(tempSolutions);
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.getAttribute("data-question"));
        const tempSolutions = [...solutions];
        tempSolutions[value] = {
            ...tempSolutions[value],
            userAnswer: Number(e.target.value),
        };

        setSolutions(tempSolutions);
    };

    const getScore = () => {
        let correctAnswer: number = 0;
        switch (difficulty) {
            case 1:
                correctAnswer = 1;
                break;
            case 2:
                correctAnswer = 5;
                break;
            case 3:
                correctAnswer = 10;
                break;
            default:
                break;
        }

        const wrongAnswer = correctAnswer / 2;
        const expectedScore = questions.length * correctAnswer;
        let score = 0;
        solutions.forEach((solution) => {
            if (solution.answer === solution.userAnswer) score += correctAnswer;
            else score -= wrongAnswer;
        });

        return {
            score,
            expectedScore,
        };
    };

    const getNextQuestionSet = async () => {
        const score = getScore();
        let tempDifficulty = difficulty;
        if (score.score >= 0.7 * score.expectedScore)
            tempDifficulty = increaseDifficulty();
        else if (score.score <= 0.3 * score.expectedScore)
            tempDifficulty = decreaseDifficulty();
        if (difficulty === tempDifficulty) await getServerQuestions();
        else setDifficulty(tempDifficulty);
        setScore(totalScore + score.score);
    };

    const increaseDifficulty = () => {
        let newDifficulty = 1;
        switch (difficulty) {
            case 1:
                newDifficulty = 2;
                break;
            case 2:
                newDifficulty = 3;
                break;
            case 3:
                break;
            default:
                break;
        }

        return newDifficulty;
    };

    const decreaseDifficulty = () => {
        let newDifficulty = 1;
        switch (difficulty) {
            case 1:
                newDifficulty = 1;
                break;
            case 2:
                newDifficulty = 1;
                break;
            case 3:
                newDifficulty = 2;
                break;
            default:
                break;
        }

        return newDifficulty;
    };

    useEffect(() => {
        getServerQuestions();
    }, [difficulty]);

    const quizSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const score = getScore();
        const tempScore = totalScore + score.score;
        try {
            await postScore(tempScore, language, difficulty);
            addNotification("Quiz Complete", "success");
            resetPage();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
            >
                Quiz
            </Typography>
            {!startQuiz && (
                <form onSubmit={onFormSubmit}>
                    <Select
                        label="Select Language for quiz"
                        value={language}
                        onChange={(e) => {
                            setLanguage(e.target.value);
                        }}
                        sx={{
                            minWidth: "200px",
                        }}
                        required
                    >
                        {languages.length != 0 &&
                            languages.map((lang) => (
                                <MenuItem
                                    key={lang.language}
                                    value={lang.language}
                                >
                                    {lang.language}
                                </MenuItem>
                            ))}
                    </Select>
                    <Button
                        variant="contained"
                        sx={{ marginLeft: "20px" }}
                        type="submit"
                    >
                        Start Quiz
                    </Button>
                </form>
            )}
            {startQuiz && (
                <form onSubmit={quizSubmit}>
                    {questions.map((question, index) => {
                        return (
                            <div key={question.question}>
                                <FormLabel id={`question_${index + 1}`}>
                                    {index + 1}&#41; {question.question}
                                </FormLabel>
                                <RadioGroup
                                    name={`${index}`}
                                    id={`question_${index + 1}`}
                                    row
                                    value={solutions[index].userAnswer}
                                    onChange={handleRadioChange}
                                >
                                    {question.options.map(
                                        (option, optIndex) => {
                                            return (
                                                <FormControlLabel
                                                    value={`${optIndex}`}
                                                    label={`${option}`}
                                                    control={
                                                        <Radio
                                                            inputProps={
                                                                {
                                                                    "data-question":
                                                                        index,
                                                                } as QuestionInputProps
                                                            }
                                                        />
                                                    }
                                                    key={option}
                                                    required
                                                />
                                            );
                                        },
                                    )}
                                </RadioGroup>
                            </div>
                        );
                    })}
                    {countQuestions >= 10 || questions.length == 0 ? (
                        <>
                            {questions.length == 0 && (
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                >
                                    No more questions. Click Submit{" "}
                                </Typography>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </>
                    ) : (
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={getNextQuestionSet}
                        >
                            Next
                        </Button>
                    )}
                </form>
            )}
        </>
    );
};

export default Quiz;
