import React, { useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

//ヘッダー部分
function Header(props) {
    const [open, setOpen] = useState(false);
    return(
        <header>
            <div id="title">
                <div id="title_text">単語帳</div>
                <button onClick={() => setOpen(!open)} id="menubutton">{open ? "閉じる" : "メニュー"}</button>
            </div>
            <div className={open ? "block" : "none"} id="header_links">
                <ul>
                <li><Link to="/" id="home" onClick={() => setOpen(!open)}>ホーム</Link></li>
                {props.length.map((list) => <li><Link key={list[0]} to={list[1]} onClick={() => setOpen(!open)}>単語帳{list[0]+1}</Link></li>)}
                </ul>
            </div>
        </header>
    )
}

export default Header;