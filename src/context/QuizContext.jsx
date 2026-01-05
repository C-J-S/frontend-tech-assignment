import { createContext, useState, useEffect } from 'react';

import questions from '../data';

export const QuizContext = createContext();

export default function QuizContextProvider({ children }) {
	const [data, setData] = useState({
		questions,
		answers: Object.fromEntries(questions.map((val) => [val.question, new Set()])),
	});

	return (
		<QuizContext.Provider value={[data, setData]}>
			{children}
		</QuizContext.Provider>
	)
}