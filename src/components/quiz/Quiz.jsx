import Header from '../Header';
import Question from './Question';
import Footer from './Footer';

import './Quiz.css';

export default function Quiz() {
  return (
	<section className='quiz'>
		<Header />
		<Question />
		<Footer />
	</section>
  );
}
