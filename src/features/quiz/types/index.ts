import { InputHTMLAttributes } from "react";

export interface IQuestion {
    question: string;
    options: string[];
    answerIndex: number;
}

export interface ISolution {
    answer: number;
    userAnswer: number;
}

export interface QuestionInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    "data-question"?: number;
}
