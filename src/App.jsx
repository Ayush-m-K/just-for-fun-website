import { useEffect, useState } from 'react';
import options from './options';
import './index.css'

function App() {
  const [questionNo, setQuestionNo] = useState(0);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [selectedList, setSelectedList] = useState([]);
  const [person1, setPerson1] = useState(null);
  const [person2, setPerson2] = useState(null);
  const [currentPerson, setCurrentPerson] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (person2 !== null)
      calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person2])

  const calculate = () => {
    let [year1, month1, day1] = person1.dob.split('-');
    let [year2, month2, day2] = person2.dob.split('-');
    year1 = parseInt(year1, 10);
    year2 = parseInt(year2, 10);
    month1 = parseInt(month1, 10);
    month2 = parseInt(month2, 10);
    day1 = parseInt(day1, 10);
    day2 = parseInt(day2, 10);
    let percent = 42;
    if (Math.abs(year1 - year2) < 3) {
      if (year1 === year2)
        percent += 10;
      else
        percent += 7;
    } else if (Math.abs(year1 - year2) > 15) {
      percent = 0;
      setResult(`Love compatability ${percent}%,reason: The age seems sus 💀`);
      return;
    }
    if (month1 === month2) {
      if (day1 === day2)
        percent += 7;
      else
        if (Math.abs(day1 - day2) < 4)
          percent += 5;
        else
          percent += 3;
    } else
      if (Math.abs(month1 - month2) === 1 || Math.abs(month1 - month2) === 11) {
        const temp1 = ((month1 - 1) * 30) + day1;
        const temp2 = ((month2 - 1) * 30) + day2;
        let diff = Math.abs(temp1 - temp2);
        diff = Math.min(diff, 360 - diff)
        if (diff < 4)
          percent += 6;
        else
          percent += 3;
      }

    for (let i = 0; i < options.length; i++) {// options.length = 12
      if (person1.selectedList[i] === person2.selectedList[i])
        if (i == 5 || i == 9 || i == 10)
          percent += 5;
        else
          percent += 2;
    }
    if (day1 === day2 &&
      month1 === month2 &&
      year1 === year2 &&
      person1.selectedList.every((val, i) => val === person2.selectedList[i])
    )
      percent = 100;
    percent = Math.min(percent, 100)
    setResult(`Love compatability ${percent}%`);
  };

  const handleChoice = (choice) => {
    const updatedList = [...selectedList, choice];
    setSelectedList(updatedList);
    if (currentPerson === 1) {
      if (questionNo < options.length - 1) {
        setQuestionNo(questionNo + 1)
      }
      else {
        setPerson1({ name, dob, selectedList: updatedList });
        setSelectedList([]);
        setQuestionNo(0);
        setCurrentPerson(2);
        setName("");
        setDob("");
        window.alert("Now the other person's turn");
      }
    } else {
      if (questionNo < options.length - 1) {
        setQuestionNo(questionNo + 1)
      } else {
        setPerson2({ name, dob, selectedList: updatedList });
      }
    }
  }

  return <>
    <div className="maincontainer">
      <h2>Person {currentPerson}</h2>
      <label>What's your name:<input type="text" value={name} onChange={e => {
        setName(e.target.value);
      }} /></label> <br />
      <label>What's your DOB:<input type="date" value={dob} onChange={e => {
        setDob(e.target.value);
      }} /></label> <br />
      <span>Choose one</span>
      <div className="options">
        <button onClick={() => handleChoice(options[questionNo].one)}>{options[questionNo].one}</button>
        <button onClick={() => handleChoice(options[questionNo].two)}>{options[questionNo].two}</button>
      </div>
    </div>
    <div className="maincontainer">
      {result && (
        <div className="result">
          <h3>{result}</h3>
          <p>{person1.name} ❤️ {person2.name}</p>
        </div>
      )}
    </div>
  </>;
}

export default App;
