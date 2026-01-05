import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import QuizContextProvider from './context/QuizContext';
import Quiz from './components/quiz/Quiz';
import Review from './components/review/Review';

export default function App() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/quiz?question=1');
	}, []);

	return (
		<QuizContextProvider>
			<Routes>
				<Route path='/quiz' element={<Quiz />} />
				<Route path='/review' element={<Review />} />
			</Routes>
		</QuizContextProvider>
	);
}
