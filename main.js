const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));

const words=[[[],[]],[[],[]]]
//問題を追加する
app.post("/add", (request, response) => {
    const number = request.body.number;
    if(request.body.question && request.body.answer){
        const newQuestion = request.body.question;
        const newAnswer = request.body.answer;
        words[number][0].push(newQuestion);
        words[number][1].push(newAnswer);
    }
    response.json(words[number]);
});
//問題を編集する
app.post("/edit", (request, response) => {
    const number1 = request.body.pageNumber;
    const number2 = request.body.questionNumber;
    if(request.body.question && request.body.answer){
        const newQuestion = request.body.question;
        const newAnswer = request.body.answer;
        words[number1][0][number2]=newQuestion;
        words[number1][1][number2]=newAnswer;
    }
    response.json(words[number1]);
});
//単語帳の数を返す
app.post("/getLength", (request, response) => {
    const lengthList = new Array(0);
    for(let i = 0; i < words.length; i++){
        lengthList.push([i, "/word"+(i+1)])
    }
    response.json(lengthList)
});
//単語帳を追加する
app.post("/addList", (request, response) => {
    words.push([[],[]]);
    const lengthList = new Array(0);
    for(let i = 0; i < words.length; i++){
        lengthList.push([i, "/word"+(i+1)])
    }
    response.json(lengthList)
});
app.listen(3000);