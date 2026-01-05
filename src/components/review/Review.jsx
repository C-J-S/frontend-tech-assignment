import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { QuizContext } from '../../context/QuizContext';

import './Review.css';

export default function Review() {
	const navigate = useNavigate();
	const [data] = useContext(QuizContext);
	const { questions, answers } = data;

	function handleBack() {
		navigate(`/quiz?question=${questions.length}`);
	}

	function handleSubmit() {
		if(window.confirm('Are you sure you want to submit the quiz?')) {
			console.log('submit quiz');
		} else {
			console.log('do not submit quiz');
		}
	}

	return (
		<section className='review'>
			<article>
				<h2>Answers: </h2>
				<ul>
					{
						Object.entries(answers).map(([question, selectedAnswers]) => {
							const answersArr = Array.from(selectedAnswers);
							return (
								<li key={question} >
									<strong>Question: </strong>{question}
									{ 
										answersArr.length !== 0 ? (
											<ul>
												{
													Array.from(selectedAnswers).map((answer) => {
														return <li key={answer}><strong>Your Answer(s):</strong> {answer}</li>
													})
												}
											</ul>
										) : <p>No answers selected</p>
									}
								</li>
							)
						})
					}
				</ul>
			</article>
			<footer className='review-footer'>
				<button type='button' onClick={handleBack}>Back to quiz</button>
				<button type='button' onClick={handleSubmit}>Submit answers</button>
			</footer>
		</section>
	)
}