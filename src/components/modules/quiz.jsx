import React, { useEffect, useState } from 'react';
import './quiz.css';

//問題と答えを表示する部分
function Quiz(props){
    const [pageNumber, setPageNumber] = useState(props.count)
    setInterval(
        pageNumber===props.count || setPageNumber(props.count)
    , 500);
    //初期状態に戻す
    async function set(){
        const body = new URLSearchParams({ number: pageNumber});
        const response1 = await fetch(props.link, {method: "post", body:body});
        const json1 = await response1.text();
        const wordList = JSON.parse(json1);
        setQuestions(wordList[0]);
        setAnswers(wordList[1]);
        setLookAnswer(false);
        setNumber(0);
        setButton(false);
    }
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        set()
    }, [pageNumber])
    const [number, setNumber] = useState(0);
    const [lookAnswer, setLookAnswer] = useState(false);
    const [onclick, setButton] = useState(false);
    const [questionText, setQuestion] = useState("");
    const [answerText, setAnswer] = useState("");
    const question = questions[number];
    const answer = answers[number];
    //問題を追加する
    async function add(){
        if(!(questionText==="" || answerText==="")){
            const body = new URLSearchParams({ question: questionText, answer: answerText, number: pageNumber});
            const response = await fetch(props.link, { method: "post", body: body });
            const json = await response.text();
            const word = JSON.parse(json);
            setQuestions(word[0]);
            setAnswers(word[1]);
            setQuestion("");
            setAnswer("");
        }
    }
    //戻る
    function back(){
        if(questions[number-1]){
            setNumber(number-1);
        }
        if(lookAnswer===true){
            setLookAnswer(!lookAnswer)
        }
    }
    //次へ進む
    function next(){
        if(lookAnswer===true){
            if(questions[number+1]){
                setNumber(number+1);
            }
            setLookAnswer(!lookAnswer);
        }else{
            setLookAnswer(!lookAnswer);
        }
    }
    return(
        <div className="main">
            <div className="title">
                <h1>{props.title}</h1>
            </div>
            <div className="body">
                <div id="questionAnswer">
                    <div id="question">問題{number+1}<p id="answerText">{question}</p></div>
                    <div id="answer">答え<p id="answerText" className={lookAnswer ? "block" : "none"}>{answer}</p></div>
                    <button onClick={() => back()} id="backButton">戻る</button>
                    <button onClick={() => next()} id="questionButton">{lookAnswer ? "次へ" : "答えを見る"}</button>
                </div>
            </div>
            <button onClick={() => setButton(!onclick)}>問題を追加する</button>
            <div className={onclick ? "block" : "none"} id="add">
                <div id="addField">
                    問題<textarea id="questionBox" value={questionText} onChange={(e) => {
                        setQuestion(e.target.value)
                    }}></textarea>
                    答え<textarea id="answerBox" value={answerText} onChange={(e) => {
                        setAnswer(e.target.value)
                    }}></textarea>
                    <button onClick={() => add()}>追加</button>
                </div>
            </div>
        </div>
    );
}

export default Quiz;