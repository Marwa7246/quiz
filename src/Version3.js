import React, {useState} from 'react';
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
		classFace: ''
		}

  const [state, setState] = useState(initialState);
	console.log(state);		


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
    console.log(index, answerOption.isCorrect);
		const newScore = state.score + 1;
		
   	if (answerOption.isCorrect) {
      setState({...state,  score: newScore, classSubmit: "correct", classFace: "fas fa-smile", classNext: false, classReveal: 'show-answer'});                 
    } else {
      setState({...state, classSubmit: "incorrect", classFace: "fas fa-frown", classNext: false, classReveal: 'show-answer'});           
    }  
  }

  const handleReset = ()=> {
    setState(initialState)
	}
	const handleNext = () => {
		const nextQuestion = state.currentQuestion + 1;
		if (nextQuestion < questions.length) {
      setState({...state,  currentQuestion: nextQuestion, classSubmit: "hide", classNext: true, classReveal: ''});          
    } else {
      setState({...state, showScore: true, classNext: true, });           
    }  
	}

  const resetClass = state.currentQuestion || !state.classNext? false : true;
  
  

  return (
  <div>

    <h1>Version 3</h1>

		<div className='app'>

			{state.showScore ? (
				<div className='score-section'>You scored {state.score} out of {questions.length}</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {state.currentQuestion+1}</span>/{questions.length}
						</div>
            <div className='question-text'>{questions[state.currentQuestion].questionText}
						<button className={state.classSubmit} disabled>{state.classSubmit}! <i class={state.classFace}></i></button>

						</div>

            <div className="answer-section">{questions[state.currentQuestion].answerOptions.map((answerOption, index)=> {
              return <button className={answerOption.isCorrect  && state.classReveal}
                  key={index} 
									onClick={()=>handleOnClick(answerOption, index)} 
									disabled={!state.classNext}   
                  >
                    {answerOption.answerText}
                    </button>})}

            </div>
					</div>
	
				</>
			)}
		</div>
		<div className='app'>

      <button className='reset' onClick={handleReset} disabled={resetClass}>RESET</button>
			<button className='next' onClick={handleNext} disabled={state.classNext}>NEXT</button>
		</div>


  </div>
    

	);
}

export default Version3;
