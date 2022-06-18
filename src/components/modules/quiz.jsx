import React, { useEffect, useState } from 'react';

//問題と答えを表示する部分
function Quiz(props){
    const [pageNumber, setPageNumber] = useState(props.count)
    setInterval(
        pageNumber===props.count || setPageNumber(props.count)
    , 500);
    //初期状態に戻す
    async function set(){
        const body = new URLSearchParams({ number: pageNumber});
        const response1 = await fetch("/add", {method: "post", body:body});
        const json1 = await response1.text();
        const wordList = JSON.parse(json1);
        setQuestions(wordList[0]);
        setAnswers(wordList[1]);
        setLookAnswer(false);
        setNumber(0);
        setButton(false);
        setEditQuestion(wordList[0][number]);
    }
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        set()
    }, [pageNumber])
    const [number, setNumber] = useState(0);
    const [lookAnswer, setLookAnswer] = useState(false);
    const [onclick, setButton] = useState(false);
    const [onclick2, setButton2] = useState(false);
    const [questionText, setQuestion] = useState("");
    const [answerText, setAnswer] = useState("");
    const [editQuestion, setEditQuestion] = useState("");
    const [editAnswer, setEditAnswer] = useState("");
    const question = questions[number];
    const answer = answers[number];
    //問題を追加する
    async function add(){
        if(!(questionText==="" || answerText==="")){
            const body = new URLSearchParams({ question: questionText, answer: answerText, number: pageNumber});
            const response = await fetch("/add", { method: "post", body: body });
            const json = await response.text();
            const word = JSON.parse(json);
            setQuestions(word[0]);
            setAnswers(word[1]);
            setQuestion("");
            setAnswer("");
            setEditQuestion(word[0][number]);
            setEditAnswer(word[1][number]);
        }
    }
    //編集する
    async function edit(){
        if(!(editQuestion==="" || editAnswer==="")){
            const body = new URLSearchParams({ question: editQuestion, answer: editAnswer, pageNumber: pageNumber, questionNumber: number});
            const response = await fetch("/edit", { method: "post", body: body });
            const json = await response.text();
            const word = JSON.parse(json);
            setQuestions(word[0]);
            setAnswers(word[1]);
            setQuestion("");
            setAnswer("");
            setEditQuestion(word[0][number]);
            setEditAnswer(word[1][number]);
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
        setEditQuestion(questions[number-1]);
        setEditAnswer(answers[number-1]);
    }
    //次へ進む
    function next(){
        if(lookAnswer===true){
            if(questions[number+1]){
                setNumber(number+1);
                setEditQuestion(questions[number+1]);
                setEditAnswer(answers[number+1]);
            }else{
                setEditQuestion(questions[number]);
                setEditAnswer(answers[number]);
            }
            setLookAnswer(!lookAnswer);
        }else{
            setEditQuestion(questions[number]);
            setEditAnswer(answers[number]);
            setLookAnswer(!lookAnswer);
        }
    }
    function changeButton(){
        setButton(!onclick)
        if(onclick2){
            setButton2(!onclick2)
        }
    }
    function changeButton2(){
        setButton2(!onclick2)
        if(onclick){
            setButton(!onclick)
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
            <button onClick={() => changeButton()}>問題を追加する</button><br />
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
            <button onClick={() => changeButton2()}>問題を編集する</button>
            <div className={onclick2 ? "block" : "none"} id="edit">
                <div id="editField">
                    問題<textarea id="editQuestion" value={editQuestion} onChange={(e) => {
                        setEditQuestion(e.target.value)
                    }}></textarea>
                    答え<textarea id="editAnswer" value={editAnswer} onChange={(e) => {
                        setEditAnswer(e.target.value)
                    }}></textarea>
                    <button onClick={() => edit()}>決定</button>
                </div>
            </div>
        </div>
    );
}

export default Quiz;