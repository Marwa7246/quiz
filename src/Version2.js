import React, {useState} from 'react';
import classnames from "classnames";

import './App.css';

function Version2() {

  const initialState = { 
    score: 0,
    currentQuestion: 0,
    showScore: false,
		classSubmit: 'hide',
		classReveal: '',
		classNext: 'next:disabled',
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
      setState({...state,  score: newScore, classSubmit: "correct", classNext: 'next', classReveal: 'correct'});                 
    } else {
      setState({...state, classSubmit: "incorrect", classReveal: 'correct'});           
    }  
  }

  const handleReset = ()=> {
    setState(initialState)
	}
	const handleNext = () => {
		const nextQuestion = state.currentQuestion + 1;
		if (nextQuestion < questions.length) {
      setState({...state,  currentQuestion: nextQuestion, classSubmit: "hide", classReveal: ''});          
    } else {
      setState({...state, showScore: true});           
    }  
	}

  const resetClass = state.currentQuestion ? "reset" : "hide";
  
  

  return (
    <div>

    <h1>Version 2</h1>

		<div className='app'>

			{state.showScore ? (
				<div className='score-section'>You scored {state.score} out of {questions.length}</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {state.currentQuestion+1}</span>/{questions.length}
						</div>
            <div className='question-text'>{questions[state.currentQuestion].questionText}</div>

            <div className="answer-section">{questions[state.currentQuestion].answerOptions.map((answerOption, index)=> {
              return <button className={answerOption.isCorrect  && state.classReveal}
                  key={index} 
                  onClick={()=>handleOnClick(answerOption, index)}    
                  >
                    {answerOption.answerText}
                    </button>})}

            </div>
					</div>
	
				</>
			)}
		</div>
      <button className={state.classSubmit} >{state.classSubmit}</button>
      <button className={resetClass} onClick={handleReset} >RESET</button>
			<button className={state.classNext} onClick={handleNext} >NEXT</button>


    </div>
    

	);
}

export default Version2;
