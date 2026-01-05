## Steps To Run Locally ##
1. Clone repo
2. run `npm install` to install all dependencies
3. Run `npm run dev`

## Time Spent ##
3 hours (I just set a timer for 3 hours and used all the time available)

## Trade-offs / Improvements ##
- I used [pico css](https://picocss.com/) to give me some styling and responsiveness out of the box. It added some unused styles though, and in some places forced me to use wrap things in uneccessary html tags to get certain styles, e.g. wrapping the fieldset in an article in order to get the card styles. Using utility classes to apply common styles would have been preferable.
- There are a few places where I'm doing the same thing with `useNavigate` to navigate around the app. I could improve this by extracting the navigation logic into its own custom hook that returns `handleNext` and `handlePrev` and adjusts the navigation behaviour based on the current url and quiz state, making it easier to implement that behaviour across the app. 
- I used react context for the state management to avoid prop drilling and to use something more lightweight than an external library. To improve this, I would avoid using local state in `Question.jsx` and rely on the state in `QuizContext` being the single source of truth. I would also pre-process the questions to augment them and add some additional properties (expanded below). 
- I copied the JSON response from [The Open Trivia Database](https://opentdb.com/api_config.php). I could have improved the response by adding ids to each question, which also would have made managing the selected answers for each question easier. Using the question itself as a key feels clunky. 
- The right answer is always the last one. I would augment `questions` in the store and add an `options` key, which is a shuffled array of all the options. I did initially shuffle the array in `Questions.jsx`, however the order of the options changed when navigating back and forth so I opted to leave it out for now. 