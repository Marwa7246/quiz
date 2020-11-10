import React, {useState, useEffect} from 'react';
import classnames from "classnames";

import './App.css';
import data from './Data.json'

function Version3() {

	console.log(data)

  const initialState = { 
    score: 0,
    currentQuestion: 0,
    showScore: false,
		classSubmit: 'hide',
		classReveal: '',
		classNext: true,
		classFace: '',
		randomArray: [],
		}



	const [state, setState] = useState(initialState);
	const [reset, setReset] = useState(0)
	console.log(state);	
 let shuffledData = [];

	useEffect ( () => {
		function randomArrayNumbers() {
			const arr =[];
			while (arr.length < 10) {
				const num = Math.floor(Math.random() * 21);
				if (arr.indexOf(num) === -1) {
					arr.push(num);
				}
			}
			return arr;
		}
		const arr = randomArrayNumbers();
		function shuffle(array) {
			return array.sort(() => Math.random() - 0.5);
		}  
		shuffledData = data.map((ele)=>{
			return ({...ele, incorrect: shuffle(ele.incorrect)})
		});
		

			setState({...state, randomArray: arr});
	}, [reset]);
	
	console.log(data[0])





  const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
  ];
  
  const handleOnClick = (answerOption, index) => {      
    // console.log(index, answerOption.isCorrect);
		const newScore = state.score + 1;
		
   	if (answerOption) {
      setState({...state,  score: newScore, classSubmit: "correct", classFace: "fas fa-smile", classNext: false, classReveal: 'show-answer'});                 
    } else {
      setState({...state, classSubmit: "incorrect", classFace: "fas fa-frown", classNext: false, classReveal: 'show-answer'});           
    }  
  }

  const handleReset = ()=> {
		const newReset = reset+1;
		setReset(newReset);
    setState(initialState);
	}
	const handleNext = () => {
		const nextQuestion = state.currentQuestion + 1;
		if (nextQuestion < state.randomArray.length) {
      setState({...state,  currentQuestion: nextQuestion, classSubmit: "hide", classNext: true, classReveal: ''});          
    } else {
      setState({...state, showScore: true, classNext: true, });           
    }  
	}

  const resetClass = state.currentQuestion || !state.classNext? false : true;
  
  // console.log(data[state.randomArray[state.currentQuestion]].question)

  return (
  <div>

    <h1>Version 3</h1>

		<div className='app'>

			{state.showScore ? (
				<div className='score-section'>You scored {state.score} out of {state.randomArray.length}</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {state.currentQuestion+1}</span>/{state.randomArray.length}
						</div>
            <div className='question-text'>{state.randomArray.length && data[0].question}
						<button className={state.classSubmit} disabled>{state.classSubmit}! <i class={state.classFace}></i></button>

						</div>

            <div className="answer-section">{state.randomArray.length && data[0].incorrect.map((answerOption, index)=> {
              return <button 
                  key={index} 
									onClick={()=>handleOnClick(answerOption, index)} 
									disabled={!state.classNext}   
                  >
                    {answerOption}
                    </button>})}

            </div>
					</div>
	
				</>
			)}
		</div>
		<div className='app'>

      <button className='reset' onClick={handleReset} disabled={false}>RESET</button>
			<button className='next' onClick={handleNext} disabled={state.classNext}>NEXT</button>
		</div>


  </div>
    

	);
}

export default Version3;
