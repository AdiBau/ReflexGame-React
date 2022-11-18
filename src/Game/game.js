// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./game.css";

const Game = () => {
	const [missed, setMissed] = useState(0);
	const [score, setScore] = useState(0);
	const [time, setTime] = useState(15);
	const table = [];

	const speed = 400;
	const Time = 15000;
	// table length
	for (let i = 0; i <= 69; i++) {
		table.push(i);
	}

	const minusMissed = () => setMissed((missed) => missed + 1);
	const plusScore = () => setScore((score) => score + 1);

	const drawTable = () =>
		table.map((element, index) => (
			<div className="element" key={index} onClick={handlerClick}>
				{" "}
			</div>
		));
	drawTable();

	const resultBox = (view) => {
		if (view) {
			const box = document.querySelector(".resultBox");
			box.classList.remove("result_none");
			box.classList.add("result");
		} else {
			const box = document.querySelector(".resultBox");
			box.classList.add("result_none");
			box.classList.remove("result");
		}
	};

	function handlerStart() {
		const intervalTime = setInterval(() => {
			setTime((time) => {
				if (time === 0) {
					clearInterval(intervalTime);
					clearInterval(intervalColor);
					return 0;
				} else {
					return time - 1;
				}
			});
		}, 1000);
		const intervalColor = setInterval(() => {
			const el = document.querySelectorAll(".element");
			const number = Math.floor(Math.random() * (table.length - 1));
			[...el][number].classList.add("green");
		}, speed);
	}

	useEffect(() => {
		if (time === 0) {
			const el = document.querySelectorAll(".element");
			[...el].map((el) => el.removeEventListener("click", handlerClick));
			resultBox(true);
		}
	}, [time]);

	const handlerReset = () => {
		resultBox(false);
		const el = document.querySelectorAll(".element");
		[...el].map((el) => el.classList.remove("green"));
		setMissed(0);
		setTime(15);
		setScore(0);
	};

	function handlerClick(e) {
		if (time !== 0) {
			if (e.target.classList.contains("green")) {
				e.target.classList.remove("green");
				plusScore();
			} else {
				minusMissed();
			}
		}
	}

	return (
		<>
			<section className="section">
				<div className="missed ">Missed: {missed}</div>
				<div className="score">Score: {score}</div>
				<div className="name">REFLEX Game</div>
				<div className="time">Time: {time} sek</div>
			</section>
			<section className="tableSection">{drawTable()} </section>
			<section className="startSection">
				<button type="button" className="start" onClick={handlerStart}>
					{" "}
          START{" "}
				</button>
				<button type="button" className="reset" onClick={handlerReset}>
					{" "}
          RESET{" "}
				</button>
			</section>
			<div className="result_none resultBox">
				<h3 className="text">
          Maximal score to get: {(Time / speed).toFixed()}{" "}
				</h3>
				<h3 className="text">Missed: {missed}</h3>
				<h2 className="text">your score: {score}</h2>

				<button type="button" onClick={handlerReset}>
          -- OK --
				</button>
			</div>
		</>
	);
};

export default Game;
