import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Button = (props) => {
  return <button className={props.className} onClick={props.onClick}>{props.text}</button>;
};

const TablesDates = (props) => {
  return (
    <tr className={props.className}>
      <td>{props.textTb}</td>
      <td>{props.valueTb}</td>
    </tr>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);

  const calculateAverage = (newGood, newNeutral, newBad, newTotal) => {
    const goodAvg = newGood * 1;
    const neutralAvg = newNeutral * 0;
    const badAvg = newBad * -1;
    const avg = newTotal === 0 ? 0 : (goodAvg + neutralAvg + badAvg) / newTotal;
    setAverage(avg);
  };

  const nextAnecdote = () => {
    const large = anecdotes.length
    let random = Math.floor(Math.random() * large)
    setSelected(random)
  }

  const handleClickGood = () => {
    const newGood = good + 1;
    const newTotal = total + 1;
    setGood(newGood);
    setTotal(newTotal);
    calculateAverage(newGood, neutral, bad, newTotal);
  };

  const handleClickNeutral = () => {
    const newNeutral = neutral + 1;
    const newTotal = total + 1;
    setNeutral(newNeutral);
    setTotal(newTotal);
    calculateAverage(good, newNeutral, bad, newTotal);
  };

  const handleClickBad = () => {
    const newBad = bad + 1;
    const newTotal = total + 1;
    setBad(newBad);
    setTotal(newTotal);
    calculateAverage(good, neutral, newBad, newTotal);
  };

  return (
    <div className='bg-dark container-fluid text-center'>
      <h2 className=' display-6 text-white'>give feedback</h2>
      <Button className={"btn btn-primary me-2"} onClick={handleClickGood} text={'good'} />
      <Button className={"btn btn-secondary me-2"} onClick={handleClickNeutral} text={'neutral'} />
      <Button className={"btn btn-danger"} onClick={handleClickBad} text={'bad'} />
      <h2 className='text-white display-6'>statistics</h2>
      <table className='d-flex justify-content-center'>
        <tbody>
          <TablesDates className={"text-white bg-dark"} textTb={"good"} valueTb={good}/>
          <TablesDates className={"text-white bg-dark"} textTb={"neutral"} valueTb={neutral}/>
          <TablesDates className={"text-white bg-dark"} textTb={"bad"} valueTb={bad}/>
          <TablesDates className={"text-white bg-dark"} textTb={"all"} valueTb={total}/>
          <TablesDates className={"text-white bg-dark"} textTb={"average"} valueTb={average}/>
          <TablesDates className={"text-white bg-dark"} textTb={"positive"} valueTb={`${good === 0 ? 0 :(good / total) * 100}%`}/>
        </tbody>
      </table>
      <div className='bg-dark-subtle text-center p-4'>{anecdotes[selected]}</div>
      <Button className={"btn btn-primary"} onClick={nextAnecdote} text={"next anecdote"}/>
    </div>
  );
};

export default App;