tikTakBoom = {

	init(
		tasks,
		buttonStart,
		buttonFinish,
		countOfPlayersField,
		countOfTimeField,
		timerField,
		gameStatusField,
		textFieldQuestion,
		textFieldAnswer,
		textFieldAnswer1,
		textFieldAnswer2,
		textFieldAnswer3,
		textFieldAnswer4,
		textFieldAnswer5,
		textFieldAnswer6,
		cardPlayers,
		cardTimer,
		gameQuest
	) {


		this.preTime = 3;
		this.boomTimer = 30
		this.stop = 1;
		this.tasks = JSON.parse(tasks);

		this.buttonStart = buttonStart;
		this.buttonFinish = buttonFinish;
		this.countOfPlayersField = countOfPlayersField;
		this.countOfTimeField = countOfTimeField;
		this.timerField = timerField;
		this.gameStatusField = gameStatusField;
		this.textFieldQuestion = textFieldQuestion;
		this.textFieldAnswer = textFieldAnswer;
		this.textFieldAnswer1 = textFieldAnswer1;
		this.textFieldAnswer2 = textFieldAnswer2;
		this.textFieldAnswer3 = textFieldAnswer3;
		this.textFieldAnswer4 = textFieldAnswer4;
		this.textFieldAnswer5 = textFieldAnswer5;
		this.textFieldAnswer6 = textFieldAnswer6;
		this.gameQuest = gameQuest;
		this.cardPlayers = cardPlayers;
		this.cardTimer = cardTimer;

		this.needRightAnswers = 19;
		this.maxWrongAnswers = 3;
		this.playersWrongAnswer = 0;
		this.playerNumber = 1;
		this.penalti = 0;

		try {
			this.OneRight();
			this.questionOk();
			this.AnsANDquesOK();
			this.kolQues();
		} catch (anyException) {
			console.warn(anyException.message);
			alert("Есть ошибки!");
		}

	},


	showDom() {
		debugger;
		this.buttonStart.classList.add('game-card__close');
		this.cardPlayers.classList.add('game-card__close');
		this.cardTimer.classList.add('game-card__close');
		this.buttonFinish.classList.remove('game-card__close');
		this.timerField.classList.remove('game-card__close');
		this.gameStatusField.classList.remove('game-card__close');
	},

	startGame() {

		this.buttonStart.addEventListener('click', (event) => {
			this.countOfPlayers = parseInt(this.countOfPlayersField.value) || 2;
			this.boomTimer = (parseInt(this.countOfTimeField.value) + 1) || 31;

			this.stop = 1;
			this.players = null;
			this.players = [];
			this.createPlayers();
			console.log(this.players);
			this.showDom();
			this.gameStatusField.innerText = ``;
			this.gameStatusField.innerText = `Приготовьтесь...`;
			this.run();
			this.stopGame();
		})
	},

	createPlayers() {
		this.playersWrongAnswer = 0;
		this.playerNumber = 1;

		while (this.players.length < this.countOfPlayers) {
			this.index = this.playerNumber - 1;
			this.players[this.index] = {};
			this.players[this.index].playerNumber = this.playerNumber;
			this.players[this.index].wrongAnswer = this.playersWrongAnswer;
			this.players[this.index].time = this.countOfTimeField.value;
			this.playerNumber += 1;
		};
	},

	stopGame() {
		this.buttonFinish.addEventListener('click', (event) => {
			// debugger;
			this.players = null;
			this.players = [];
			this.result = 'lose';
			this.stop = 0;
			// this.boomTimer = 0;
			// this.preTime = 0;
			this.state = 0;
			this.playerNumber = 1;
			this.finish();
			clearInterval(this.timeClear);
			clearTimeout(this.timerTimeout);
			this.gameStatusField.innerText = `Все проиграли!`;
		})
	},

	run() {
		this.state = 1;
		if (this.result) {
			this.stop = 1;
		};
		this.rightAnswers = 0;
		this.turnOn();
	},

	turnOn() {
		debugger;
		if (this.stop !== 0) {
			debugger;
			this.beforeTimer();
			this.gameStatusField.innerText += ` Вопрос игроку №${this.players[this.state - 1].playerNumber}`;
			this.stateLast = this.state;
			this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
		}
	},

	turnOff(value) {
		if (this.currentTask[value].result) {
			this.gameStatusField.innerText = 'Верно!';
			this.rightAnswers += 1;
			debugger;
			(this.penalti != 1) ? (this.players[this.stateLast - 1].time += 5) :
				(this.players[this.stateLast - 1].time = 5);
			debugger;
			clearTimeout(this.timerTimeout);
		} else {
			debugger;
			this.gameStatusField.innerText = 'Неверно!';
			this.players[this.stateLast - 1].time -= 5;
			clearTimeout(this.timerTimeout);
			this.playersWrongAnswer = this.players[this.stateLast - 1].wrongAnswer;
			this.playersWrongAnswer += 1;
			this.players[this.stateLast - 1].wrongAnswer = this.playersWrongAnswer;
			if (this.playersWrongAnswer >= this.maxWrongAnswers) {
				debugger;
				this.gameStatusField.innerText += ` Игрок №${this.players[this.stateLast - 1].playerNumber} выбывает из игры!`;
				this.players.splice(this.stateLast - 1, 1);
				console.log(this.players);
				this.countOfPlayers -= 1;
				if (this.countOfPlayers === 1) {
					this.penalti ? (this.result = 'won') : (this.result = 'lose');
					this.stopGame();
					this.finish(this.result);
				} else {
					this.state -= 1;
				};
			}
		}
		if (this.rightAnswers < this.needRightAnswers) {
			debugger;
			if ((this.tasks.length === 0) || (this.countOfPlayers === 1)) {
				if (this.countOfPlayers === 1) {
					this.penalti ? (this.result = 'won') : (this.result = 'lose');
					this.finish(this.result);
				}
			} else {
				this.turnOn();
			}
		} else {
			debugger;
			if (this.penalti != 1) {
				this.bubbleSort(this.players, this.comparationWrongAnswer);
				console.log(this.players);
				this.winOrPenalti();
			} else {
				debugger;
				this.result = 'won';
				this.stopGame();
				this.finish(this.result);
			}
		}
	},

	// функция сравнения двух элементов по цвету
	comparationWrongAnswer(wrongAnswer1, wrongAnswer2) {
		return (parseInt(wrongAnswer1) > parseInt(wrongAnswer2)) ? true : false;
	},
	//
	//функция сортировки пузырьком
	bubbleSort(players, comparationWrongAnswer) {
		const n = players.length;
		// внешняя итерация по элементам
		for (let i = 0; i < n - 1; i++) {
			// внутренняя итерация для перестановки элемента в конец массива
			for (let j = 0; j < n - 1 - i; j++) {
				// сравниваем элементы
				if (comparationWrongAnswer(players[j].wrongAnswer, players[j + 1].wrongAnswer)) {
					// делаем обмен элементов
					let temp = players[j + 1];
					players[j + 1] = players[j];
					players[j] = temp;
				}
			}
		}
	},

	winOrPenalti() {
		const n = this.players.length;
		this.playersForPenalti = [];
		//this.playersForPenalti.push(this.players[0]);
		this.TempTextForPenalti = `Игра в пенальти для игроков №`;

		for (let i = 0; i < n - 1; i++) {
			// сравниваем элементы
			if (tikTakBoom.comparationWrongAnswer(this.players[1].wrongAnswer, this.players[0].wrongAnswer)) {
				// объявляем одного победителя
				debugger;
				this.resultPlayer = 'won';
				this.gameStatusField.innerText = `Игрок №${this.players[i].playerNumber},`;
				i = n - 1;
				this.stopGame();
				this.finish('won');
			} else {
				debugger;
				if (tikTakBoom.comparationWrongAnswer(this.players[i + 1].wrongAnswer, this.players[i].wrongAnswer)) {
					// игра в пенальти
					this.playersForPenalti.push(this.players[i]);
					//this.players = [];
					//this.players = this.playersForPenalti;
					this.players = this.playersForPenalti;
					this.gameStatusField.innerText = '';
					this.gameStatusField.innerText += `${this.TempTextForPenalti}${this.players[i].playerNumber}!`;
					i = n - 1;
					debugger;
					if (this.penalti != 1) {
						debugger;
						this.penalTi();
					};
				} else {
					if (this.players[i].wrongAnswer === this.players[n - 1].wrongAnswer) {
						this.gameStatusField.innerText = '';
						this.gameStatusField.innerText += `${this.TempTextForPenalti}1-${this.players[n - 1].playerNumber}!`;
						i = n - 1;
						debugger;
						if (this.penalti != 1) {
							debugger;
							this.penalTi();
						};
					} else {
						this.playersForPenalti.push(this.players[i]);
						this.TempTextForPenalti += `${this.players[i].playerNumber}, `;
						console.log(this.playersForPenalti);
						console.log(this.players);
					}
				}
			}
		}
	},

	penalTi() {
		this.playerWrongAnswerNULL();
		this.playerTimeNULL();
		this.boomTimer = 5;
		this.playerNewTime();
		debugger;
		this.stop = 1;
		this.state = 0;
		this.playersWrongAnswer = 0;
		this.maxWrongAnswers = 0;
		this.needRightAnswers = 19;
		this.countOfPlayers = this.players.length;
		clearInterval(this.timeClear);
		clearTimeout(this.timerTimeout);
		this.run();
		this.stopGame();
		this.gameStatusField.innerText += `. Приготовьтесь...`;
		this.penalti = 1;
	},

	playerWrongAnswerNULL() {
		this.players.forEach(el =>
			el.wrongAnswer = 0
		);
	},

	playerTimeNULL() {
		this.players.forEach(el =>
			el.time = 0
		);
	},

	playerNewTime() {
		this.players.forEach(el =>
			el.time = this.boomTimer
		);
	},

	printQuestion(task) {
		this.textFieldQuestion.innerText = task.question;
		this.textFieldAnswer1.innerText = task.answer1.value;
		this.textFieldAnswer2.innerText = task.answer2.value;
		this.gameQuest.classList.remove('game-card__close');

		if (task.answer1 === undefined) {
			this.textFieldAnswer1.classList.add('game-card__close');
		} else {
			this.textFieldAnswer1.innerText = task.answer1.value;
			this.textFieldAnswer1.classList.remove('game-card__close');
		};
		if (task.answer2 === undefined) {
			this.textFieldAnswer2.classList.add('game-card__close');
		} else {
			this.textFieldAnswer2.innerText = task.answer2.value;
			this.textFieldAnswer2.classList.remove('game-card__close');
		};
		if (task.answer3 === undefined) {
			this.textFieldAnswer3.classList.add('game-card__close');
		} else {
			this.textFieldAnswer3.innerText = task.answer3.value;
			this.textFieldAnswer3.classList.remove('game-card__close');
		};
		if (task.answer4 === undefined) {
			this.textFieldAnswer4.classList.add('game-card__close');
		} else {
			this.textFieldAnswer4.innerText = task.answer4.value;
			this.textFieldAnswer4.classList.remove('game-card__close');
		};
		if (task.answer5 === undefined) {
			this.textFieldAnswer5.classList.add('game-card__close');
		} else {
			this.textFieldAnswer5.innerText = task.answer5.value;
			this.textFieldAnswer5.classList.remove('game-card__close');
		};
		if (task.answer6 === undefined) {
			this.textFieldAnswer6.classList.add('game-card__close');
		} else {
			this.textFieldAnswer6.innerText = task.answer6.value;
			this.textFieldAnswer6.classList.remove('game-card__close');
		};
		this.textFieldAnswer1.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff('answer1');
		});
		this.textFieldAnswer2.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff('answer2');
		});
		this.textFieldAnswer3.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff('answer3');
		});
		this.textFieldAnswer4.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff('answer4');
		});
		this.textFieldAnswer5.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff('answer5');
		});
		this.textFieldAnswer6.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff('answer6');
		});

		this.currentTask = task;
	},

	finish(result = 'lose') {
		this.buttonStart.classList.remove('game-card__close');
		this.gameQuest.classList.add('game-card__close');
		this.buttonStart.innerText = `Начать заново!`;
		this.buttonFinish.classList.add('game-card__close');

		if (result === 'lose') {
			this.gameStatusField.innerText = `Вы проиграли!`;

		}
		if (result === 'won') {
			debugger;
			if (this.penalti) {
				debugger;
				(this.stop === 1) ? (this.gameStatusField.innerText += ` Игрок №${this.players[this.stateLast - 1].playerNumber} выиграл!`) :
					(this.gameStatusField.innerText += ` Игрок №${this.players[this.stateLast - 2].playerNumber} выиграл!`);
			} else {
				if (this.resultPlayer = 'won') {
					this.gameStatusField.innerText += ` вы выиграли!`;
				} else {
					this.gameStatusField.innerText = `Вы выиграли!`;
				}
			}
		}
	},

	beforeTimer() {
		debugger;
		this.gameQuest.classList.add('game-card__close');
		var i = this.preTime;
		this.timeClear = setInterval(() => {
			this.timerField.innerText = i;
			i--;
			if (i < 0) {
				clearInterval(this.timeClear);
				this.timer();
				const taskNumber = randomIntNumber(this.tasks.length - 1);
				this.printQuestion(this.tasks[taskNumber]);
				this.tasks.splice(taskNumber, 1);
				this.gameQuest.classList.remove('game-card__close');
			}
		}, 1000);

	},

	timer() {
		this.boomTimer = this.players[this.stateLast - 1].time;
		this.boomTimer -= 1;
		this.players[this.stateLast - 1].time = this.boomTimer;
		let sec = this.boomTimer % 60;
		let min = (this.boomTimer - sec) / 60;
		sec = (sec >= 10) ? sec : '0' + sec;
		min = (min >= 10) ? min : '0' + min;
		this.timerField.innerText = `${min}:${sec}`;
		if (this.boomTimer > 0) {
			this.timerTimeout = setTimeout(() => {
				this.timer();
			},
				1000,
			);
		} else {
			this.finish('lose');
		}
	},

	OneRight() {
		//console.log(this.tasks.length);
		for (let i = 0; i < this.tasks.length; i++) {
			var OneRightOk = 0;
			for (let j = 1; j <= 10; j++) {
				if (eval(`this.tasks[i].answer${j}`)) {
					if (eval(`this.tasks[i].answer${j}.result`) == true) {
						OneRightOk++;
					};
				}
			}
			//console.log(OneRightOk + " vopr: " + parseInt(i+1));
			if (OneRightOk > 1) throw new Error(`В вопросе ${i + 1} больше одного верного ответа!`);
		}
	},

	questionOk() {
		for (let i = 0; i < this.tasks.length; i++) {
			if ('question' in this.tasks[i]) { } else throw new Error(`В вопросе ${i + 1} отсутствует вопрос!`);
		}
	},

	AnsANDquesOK() {
		for (let i = 0; i < this.tasks.length; i++) {
			let ques = this.tasks[i].question;
			if (!ques.includes(" ")) {
				alert(`В вопросе ${i + 1} отсутствует вопрос!`)
			}
			for (let j = 1; j <= 10; j++) {
				if (eval(`this.tasks[i].answer${j}`)) {
					if (eval(`this.tasks[i].answer${j}.value`) === "") throw new Error(`В вопросе ${i + 1} отсутствует ответ!`);
				}
			}
		}
	},

	kolQues() {
		if (this.tasks.length < 30) throw new Error(`В игре мало вопросов!`);
	}

}