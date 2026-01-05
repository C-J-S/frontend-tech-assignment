import { useContext, useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { QuizContext } from '../../context/QuizContext';

import './Question.css';

export default function Question() {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const [data, setData] = useContext(QuizContext);
	const { questions, answers } = data || {};

	const questionNumber = parseInt(searchParams.get('question'));
	const currQuestion = questions[questionNumber - 1];

	const [selectedAnswers, setSelectedAnswers] = useState(answers[currQuestion.question] ?? new Set());

	const options = [...currQuestion.incorrect_answers, currQuestion.correct_answer];

	useEffect(() => {
		setSelectedAnswers(answers[currQuestion.question] ?? new Set());
	}, [currQuestion]);

	function handleChange(e) {
		const { checked, value } = e.target;
		
		setSelectedAnswers((prev) => {
			const newState = new Set(prev);

			if (checked) {
				newState.add(value);
			} else {
				newState.delete(value);
			}

			return newState;
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		
		setData(((prev) => {
			return {
				...prev,
				answers: {
					...answers,
					[currQuestion.question]: selectedAnswers,
				}
			}
		}));

		if (questionNumber < questions.length) {
			setSearchParams({ question: questionNumber + 1 });
		} else {
			navigate('/review');
		}
	}

	return (
		<form onSubmit={handleSubmit} id='question-form' className='question-form grid'>
			<article className='question-info'>
				<h2>{currQuestion.question}</h2>
				<div className='question-meta-data'>
					<span>Type: {currQuestion.type}</span>
					<span>Category: {currQuestion.category}</span>
					<span>Difficulty: {currQuestion.difficulty}</span>
				</div>
				<span className='submit-info'>Click submit button to save selection</span>
			</article>
			<article>
				<fieldset className='question-options'>
					{ options.map((option) => {
						return (
							<label key={option}>
								<input 
									type='checkbox' 
									value={option} 
									onChange={handleChange} 
									checked={selectedAnswers.has(option)} 
								/>
								{option}
							</label>
						)
					})}
				</fieldset>
			</article>
		</form>
	)
}
