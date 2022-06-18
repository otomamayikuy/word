import Quiz from '../modules/quiz.jsx';

function Word1(props) {
  const titleName = "単語帳"+(props.count+1);
  return (
    <Quiz title={titleName} link="/add" count={props.count}/>
  );
}

export default Word1;