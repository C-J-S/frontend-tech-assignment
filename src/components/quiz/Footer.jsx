import { useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { QuizContext } from '../../context/QuizContext';

import './Footer.css';

export default function Footer() {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	
	const questionNumber = parseInt(searchParams.get('question'));

	const [data] = useContext(QuizContext);
	const { questions } = data;	

	function handlePrev() {
		if (questionNumber - 1 === 0) { return; }
		setSearchParams({ question: questionNumber - 1});
	}

	function handleNext() {
		if (questionNumber < questions.length) {
			setSearchParams({ question: questionNumber + 1});
		} else {
			navigate('/review', { relative: 'path' });
		}
	}

	return (
		<footer className='footer'>
			<div className='nav-buttons-container'>
				<button 
					className='prev' 
					type='button' 
					onClick={handlePrev}
					disabled={questionNumber - 1 === 0}
				>&lt;</button>
				<button 
					className='next' 
					type='button' 
					onClick={handleNext} 
				>&gt;</button>
			</div>

			<button type='submit' form='question-form' >Submit</button>
		</footer>
	);
}
