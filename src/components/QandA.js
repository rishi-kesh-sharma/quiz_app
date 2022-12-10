import React,{useEffect,useState} from 'react'
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css"
import "./QandA.css"
import { ADD_Q_AND_A, SWITCH_TO_SETUP_MODE } from '../actions/actionVariables';
import LoadingPage from './LoadingPage';
const QandA = () => {


      
    
    // getting  useDispatch

    const dispatch=useDispatch();

    // state to manage the current index of the incoming arrray

    const [currentIndex,setCurrentIndex]=useState(0);

    // state to manage the score secured by player

    const [score,setScore]=useState(0);

    //acquiring the setup  setup state value kept in store

    const data=useSelector((state)=>state.addSetUpReducer);
 
    // acquiring the quiz data from store

    const QandAData=useSelector((state)=>state.addQandAReducer);

    // reassigning the numerical values to the categories

    var {amount,category,difficultyLevel}=data;
    if(category="sports")
    {
        category=21;
    }
    if(category="history")
    {
        category=23;
    }
    if(category="politics")
    {
        category=24;
    }
   
    // api endpoint

    const API_ENDPOINT = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficultyLevel}&type=multiple`;

    // fetch data function declaration 

    const fetchData=async()=>{
        //try block
        try{
                const  res= await fetch(API_ENDPOINT);
                const   data=await res.json();
            
                dispatch({
                        type:ADD_Q_AND_A,
                        data:data.results
                    })
           }
            //catch block
            catch(err)
            { 
                console.log(err);
                   return(
                    <div>
                        <p> Sorry !!! try again</p>
                    </div>
                )
            }
        }

        // checking whether the quiz data is available 

    if(QandAData.length!=0&&currentIndex<QandAData.length)
    {
              //getting the data from the current indexed data array

        var {question,correct_answer,incorrect_answers}=QandAData[currentIndex];

        //generating the random index for correct answer

        const correctAnswerRandomIndex=Math.trunc(Math.random()*4);

        //function to merge answers 
        
        const mergeAnswers=()=>{
            incorrect_answers.splice(correctAnswerRandomIndex,0,correct_answer);
        } 

        // calling to merge answers function

         mergeAnswers();
}

    //click handle function for the next question button, answer click button

    const clickHandle=(e)=>{
        if(e.target.classList.contains("option"))
        {
            if(e.target.innerText==correct_answer)
            {
                setScore((prev)=>{
                    return ++prev;
                })
            }
        }

          //setting the new increased index

        setCurrentIndex((prev)=>{
            if((prev<QandAData.length-1))
            return prev+1;
        })
    }  

    //use effect hook that fetch the data from api

    useEffect(()=>{
        
        fetchData();
    },[])


    // handler for click on play again button

    const playAgainClickHandle=()=>{

        // dispatching the switch setup mode
        
            dispatch(
                {
                    type:SWITCH_TO_SETUP_MODE
                }
            )
    }
    console.log(QandAData);

    return (
        <div className="QandA-container">   

        { 
        
        //will render the the question and answer modal if the data is existent
        (QandAData.length!=0&&currentIndex<QandAData.length)?  
         <div >
                  
                <div className="score-container">
                   score: <span className="score">{score}/{currentIndex}</span>
                </div> 
                <div className="question-container">
                    <h2 className="question">{question}</h2>

                </div> 
                <div className="option-container">
                    <p onClick={clickHandle} className="option">{incorrect_answers[0]}</p>
                    <p onClick={clickHandle} className="option">{incorrect_answers[1]}</p>
                    <p onClick={clickHandle} className="option">{incorrect_answers[2]}</p>
                    <p onClick={clickHandle} className="option">{incorrect_answers[3]}</p>
                </div>
                <div className='btn-container'>
                    <button  onClick={clickHandle} className="next-question-btn ">next question</button>
                </div>
            </div>

            :
            //else this will be rendered

            //further will render the loading page if the game is in starting phase

            QandAData.length<=0?<LoadingPage/>

            :
            //else the following will be rendered that the game has ended and the modal is rendered

            <div>
                <div className="game-end-modal">
                    {
                        // even inside the game over modal the if the one-third answers are correct then the following is displayed 
                    score<QandAData.length/3?
                    <div>

                        <p>OOPS!!!</p>
                        <p>you only answered {Math.trunc ((score*100)/QandAData.length)}% of questions correctly</p>
                    </div>
                    :
                    // if not then the following is displayed
                    <div>

                        <p> CONGRATULATIONS!!!</p>
                        <p>you answered {Math.trunc ((score*100)/QandAData.length)}% of questions correctly</p>
                    </div>
                    }
                </div>
                {/* the button below will redirect to the setup  */}
                <button onClick={playAgainClickHandle} className="play-again-btn">playAgain</button>
            </div>
            }
              
        </div>
    )
}


export default QandA
