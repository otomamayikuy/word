import React from 'react';
import { Link } from 'react-router-dom';

//ホーム画面
function Home(props){
    //新しい単語帳を作る
    async function newWordList(){
        const response = await fetch("/addList", {method: "post"});
        const json = await response.text();
        const list = JSON.parse(json);
        props.function(list);
    }
    return (
        <div id="home_links">
        {props.length.map((list) => <div><Link to={list[1]} key={list[0]}>単語帳{list[0]+1}へ</Link></div>)}
        <button onClick={() => {
            newWordList()
        }}>新しい単語帳を作る</button>
        </div>
    );
}

export default Home;