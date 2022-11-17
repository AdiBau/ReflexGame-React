import React, { useState, useEffect } from 'react';
import './game.css';

const Game = () => {

  const [missed, setMissed] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState('15');
  const table = [];

  // table length
  for (let i = 0; i <= 69; i++) {
    table.push(i);
  }

  const minusMissed = () => setMissed(missed => missed + 1);
  const plusScore = () => setScore(score => score + 1);

  const drowTable = () => table.map((element, index) => <div className='element' key={index} onClick={handlerClick}> </div>)
  drowTable();

  const resultBox = (view) => {
    if (view) {
      const box = document.querySelector('.resultBox');
      box.classList.remove('result_none');
      box.classList.add('result');
    } else {
      const box = document.querySelector('.resultBox');
      box.classList.add('result_none');
      box.classList.remove('result');
    }
  }

  function handlerStart() {
    const intervalTime = setInterval(() => {
      setTime(time => {
        if (time === 0) {
          clearInterval(intervalTime);
          clearInterval(intervalColor);
          return time = 0;
        } else {
          return time - 1;
        }
      });
    }, 1000);
    const intervalColor = setInterval(() => {
      const el = document.querySelectorAll('.element');
      const liczba = Math.floor(Math.random() * (table.length - 1));
      [...el][liczba].classList.add('green');
    }, 400);
  }

  useEffect(() => {
    if (time === 0) {
      const el = document.querySelectorAll('.element');
      [...el].map(el => el.removeEventListener('click', handlerClick));
      resultBox(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  const handlerReset = () => {
    resultBox(false);
    const el = document.querySelectorAll('.element');
    [...el].map(el => el.classList.remove('green'));
    setMissed(0);
    setTime(15);
    setScore(0);
  }

  function handlerClick(e) {
    console.log(time);
    if (time !== 0) {
      if (e.target.classList.contains('green')) {
        e.target.classList.remove('green');
        plusScore();
      } else {
        minusMissed();
      }
    }
  }

  return (
    <>
      <section className='section'>
        <div className='missed '>Missed:  {missed}</div>
        <div className='score'>Score:  {score}</div>
        <div className='name' >REFLEX Game</div>
        <div className='time'>Time: {time} sek</div>
      </section>
      <section className='tableSection'>{drowTable()} </section>
      <section className='startSection'>
        <button type='button' className='start' onClick={handlerStart}> START </button>
        <button type='button' className='reset' onClick={handlerReset}> RESET </button>
      </section>
      <div className='result_none resultBox'>
        <h3 className='text'>Missed: {missed}</h3>
        <h2 className='text'>your score: {score}</h2>
        <button type='button' onClick={handlerReset}>-- OK --</button>
      </div>
    </>
  )
}

export default Game;

