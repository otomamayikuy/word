import Home from '../modules/home.jsx';

function HomePage(props) {
  return (
    <Home title="単語帳１" link="add1" length={props.length} function={props.function}/>
  );
}

export default HomePage;