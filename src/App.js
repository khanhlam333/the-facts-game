import React from 'react';
import "./App.css";

import Header from './Header';
import Rules from './Rules';
import Content from "./Content";

import animalsData from "./animalsData";
import colorsData from "./colorsData";
import flowersData from "./flowersData";

export default function App () {
  const [flip, setFlip] = React.useState(true);
  const [inputs, setInputs] = React.useState({
    category: "",
    guess: "",
    randomWord: [],
    randomWordSp: []
  });

  const [visibility, setVisibility] = React.useState(false);
  const [rules, setRules] = React.useState(true);
  const [factsNum, setFactsNum] = React.useState(3);

  const [win, setWin] = React.useState(false);
  const [lose, setLose] = React.useState(false);

  const [wrong, setWrong] = React.useState("");

  const [objectNow, setObjectNow] = React.useState();

  const [hints, setHints] = React.useState([]);
  const [factsArray, setFactsArray] = React.useState([]);

  const [index, setIndex] = React.useState(0);

  const [correctOne, setCorrectOne] = React.useState(0);

  const [misses, setMisses] = React.useState([])

  function handleChange(event) {
    const {name, value} = event.target;
    setInputs(prevInputs => {
      return {
        ...prevInputs,
        [name]: value
      }
    })
    setRules(false);
  }

  function randomChoice (array) {
    const random = Math.floor(Math.random() * array.length);
    const randomWordSpan = [...array[random].name].map(span => {
      return <span className="span" style={{color: "white"}}>{span}</span>
    })
    setInputs(prevInputs => {
      return {
        ...prevInputs,
        randomWord: [...array[random].name],
        randomWordSp: randomWordSpan
      }
    })

    setHints(prevHints => {
      return [...prevHints, array[random].hints[0]]
    })

    setObjectNow(array[random])
  }

  React.useEffect(() => {
    if(inputs.category == "") {
      setVisibility(false)
    }else if(inputs.category == "flowers") {
      setVisibility(true)
      randomChoice(flowersData)
    }else if(inputs.category == "colors") {
      setVisibility(true)
      randomChoice(colorsData)
    }else if(inputs.category == "animals") {
      setVisibility(true)
      randomChoice(animalsData)
    }
  }, [inputs.category])

  function handleKeyPress (e) {
    let key = e.key;
    const stringArray = Array.from(inputs.guess);

    if(key == "Enter") {
      if(stringArray.length == 1) {
        setWrong("");
        if(inputs.randomWord.includes(stringArray[0])) {
          for(let i = 0; i < inputs.randomWord.length; i++) {
            if(inputs.randomWord[i] == stringArray[0]) {
              inputs.randomWordSp[i] = <span className="span">{stringArray[0]}</span>
              setFactsNum(prevFactsNum => prevFactsNum + 1)
              setCorrectOne(prevCorrectOne => prevCorrectOne + 1)
            }
          }
        }else{
          setMisses(prevMisses => {
            return [...prevMisses, stringArray[0]]
          });
          setFactsNum(prevFactsNum => prevFactsNum - 1);
        }
      }else if(stringArray.length == inputs.randomWord.length) {
        setWrong("");
        let correctTwo = 0;

        for(let i = 0; i < inputs.randomWord.length; i++) {
          if(inputs.randomWord[i] == stringArray[i]) {
            inputs.randomWordSp[i] = <span className="span">{stringArray[i]}</span>
            correctTwo += 1;
          }
        }
        if(correctTwo == inputs.randomWord.length) {
          setVisibility(false);
          setWin(true);
          if(hints.length == 1 && factsNum == 3) {
            setFactsNum(prevFactsNum => prevFactsNum + 5);
          }else if(hints.length == 1 && factsNum > 3) {
            setFactsNum(prevFactsNum => prevFactsNum + 3);
          }else if(hints.length > 1 && factsNum > 3) {
            setFactsNum(prevFactsNum => prevFactsNum + 2);
          }else {
            setFactsNum(prevFactsNum => prevFactsNum + 2);
          }
        }else {
          setFactsNum(prevFactsNum => prevFactsNum - 2);
        }
      }else if (stringArray.length > 1 && stringArray.length < inputs.randomWord.length) {
        setWrong("You can only enter either 1 letter at a time or the full word")
      }else if(stringArray.length > inputs.randomWord.length) {
        setWrong("You entered more than the characters required")
      }
    }
  }

  React.useEffect(() => {
    if(correctOne >= 1) {
      if(correctOne == inputs.randomWord.length) {
        setVisibility(false);
        setWin(true);
      }
    }
  }, [correctOne])

  React.useEffect(() => {
    if(factsNum <= 0) {
      setVisibility(false);
      setLose(true);
    }
  }, [factsNum])

  function provideHints  () {
    if(hints.length < 3) {
      setHints (prevHints => {
        return [...prevHints, objectNow.hints[hints.length]]
      })
    }
  }

  function seeFacts () {
    setFlip(false);
    setLose(false);
    setWin(false);
    const array = objectNow.facts;
    for (let i = 0; i < factsNum; i++) {
      const random = Math.floor(Math.random() * array.length);
      const value = array[random];
      array.splice(random, 1);
      setFactsArray(prevFactsArray => {
        return [...prevFactsArray, value]
      })
    }
  }

  function next() {
    if(index == factsArray.length - 1) {
      setIndex(0)
    }else{
      setIndex(prevIndex => prevIndex + 1)
    }
  }

  function previous() {
    if(index == 0) {
      setIndex (factsArray.length - 1)
    }else{
      setIndex(prevIndex => prevIndex - 1)
    }
  }

  let hintsArray = hints.map(hint => {
    return <li>{hint}</li>
  })

  let missesArray = misses.map(miss => {
    return <span>{miss}</span>
  })

  function playAgain () {
    setFlip(true);
    setInputs({
      category: "",
      guess: "",
      randomWord: [],
      randomWordSp: []
    })

    setVisibility(false);
    setRules(true);
    setFactsNum(3);

    setWin(false);
    setLose(false);

    setWrong("");
    setObjectNow();
    setHints([]);

    setFactsArray([]);

    setIndex(0);

    setCorrectOne(0);

    setMisses([]);
  }

  return(
    <div className="app">
      {flip && <Header />}
      {flip && 
      <div className="game">
        <label htmlFor="category" style={{marginLeft: "1rem"}}>Choose Your Category</label>
        <br/>
        <br/>
        <select
        style={{marginLeft: "1rem"}}
        id="category"
        name="category"
        value={inputs.category}
        onChange={handleChange}
        >
          <option value="">--- Category ---</option>
          <option value="flowers">Flowers</option>
          <option value="colors">Colors</option>
          <option value="animals">Animals</option>
        </select>
        {rules && <Rules />}
        {visibility && <div className="inner-game">
          <div className="factsNumUnit">
            <p className="fact">Number of Facts</p>
            <div className="factsNum">{factsNum}</div>
          </div>

        <div className="showcase">
          <div className="flex">{inputs.randomWordSp}</div>

          <div className="misses">
            <p id="miss">Misses</p>
            <div className="flexMiss">{missesArray}</div>
          </div>

          <div className="input">
            <label htmlFor="input" id="label">Your Guess</label>
            <br/>
            <input
            id="input"
            type="text"
            name="guess"
            value={inputs.guess}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            />
            <p>{wrong}</p>
          </div>

          <div className="hints">
            <p id="hint">Hints</p>
            <button onClick={provideHints}>More Hints</button>
            <br/>
            <ol>{hintsArray}</ol>
          </div>
        </div>
       </div>}
      </div>}

      {win && 
      <div className="win">
        <div className="factsNumUnit">
            <p className="fact">Number of Facts</p>
            <div className="factsNum">{factsNum}</div>
        </div>
        <div className="flex" style={{justifyContent: "center"}}>{inputs.randomWordSp}</div>
        <p id="win">Congratulations! You Win! Read interesting facts about {objectNow.plural}</p>
        <button onClick={seeFacts} className="buttonAnnounce">Read Facts</button>
      </div>}

      {lose && 
      <div className="lose">
        <p id="lose">You Lose! Play Again</p>
        <button onClick={playAgain} className="buttonAnnounce">Play Again</button>
      </div>}

      {!flip && 
      <div className="factsBoard">
        <h1 id="title">{index + 1}/{factsNum} Facts About {objectNow.plural}</h1>
        <div className="facts">
          <button onClick={previous} id="previous">previous</button>
          <Content
          info = {factsArray[index]}
          />
          <button onClick={next} id="next">next</button>
        </div>
        <button onClick={playAgain} id="buttonPlayAgain">Play Again</button>
      </div>}
    </div>
  )
}