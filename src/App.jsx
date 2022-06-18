import React, { useEffect, useState } from 'react';
import Header from './components/modules/header.jsx';
import Word1 from './components/pages/word1.jsx';
import HomePage from './components/pages/home.jsx';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  const [reload, setReload] = useState(0);
  //単語帳の数を調べる
  async function getLength() {
    const response = await fetch("/getLength", { method: "post" });
    const json = await response.text();
    const list = JSON.parse(json);
    list.length===reload || setReload(list.length)
    setList(list);
  }
  //最初の一回だけ単語帳の数を調べる
  useEffect(() => {
    getLength()
  },[]);
  const [lengthList, setList] = useState([])
  return (
    <Router>
      <Header length={lengthList} />
      <Routes>
      <Route path="/" element={<HomePage length={lengthList} function={setList}/>} />
        {lengthList.map((list) => 
          <Route key={list[0]} path={list[1]} element={<Word1 count={list[0]}/>} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
