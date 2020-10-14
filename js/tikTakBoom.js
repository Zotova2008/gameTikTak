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
		gameQuest,
		game8,
		gameMillion,
		gameSetting
	) {


		this.preTime = 3;
		this.boomTimer = 30;
		this.stop = 1;
		this.tasks = JSON.parse(tasks);
		this.answers = [];

		// 1 обычная игра, 2 - вопрос на миллион, 3 - восьмерка
		this.gameMultiArr = [1];
		this.gameMultiIndex = 0;

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
		this.game8 = game8;
		this.gameMillion = gameMillion;
		this.gameSetting = gameSetting;

		this.needRightAnswers = 19;
		this.maxWrongAnswers = 3;
		this.playersWrongAnswer = 0;
		this.playerNumber = 1;

		this.num = 1;
		this.penalti = false;

		try {
			this.OneRight();
			this.questionOk();
			this.AnsANDquesOK();
			this.kolQues();
			this.trueOK();
		} catch (anyException) {
			this.showDom();
			alert("Игру невозможно продолжить, игра содержит ошибки!");
			console.warn(anyException.message);
		}
	},

	rightAnswer() {
		let rightAnswer = [];
		this.answers.forEach(function (el) {
			if (el.result === true) {
				rightAnswer = el
			}
		});
		return rightAnswer
	},

	showDom() {
		this.buttonStart.classList.add('game-card__close');
		this.gameSetting.classList.add('game-card__close');
		this.buttonFinish.classList.remove('game-card__close');
		this.timerField.classList.remove('game-card__close');
		this.gameStatusField.classList.remove('game-card__close');
	},

	startGame() {

		this.buttonStart.addEventListener('click', (event) => {
			this.countOfPlayers = parseInt(this.countOfPlayersField.value) || 2;
			this.totalCountofPlayers = this.countOfPlayers;
			this.boomTimer = (parseInt(this.countOfTimeField.value) + 1) || 31;

			this.stop = 1;
			this.players = null;
			this.players = [];
			this.gameMultiArr = [1];
			this.gameMultiIndex = 0;

			if (this.gameMillion.checked) {
				this.gameMultiArr.push(+this.gameMillion.value);
			}

			if (this.game8.checked) {
				this.gameMultiArr.push(+this.game8.value);
			}

			this.createPlayers();
			this.showDom();
			this.gameStatusField.innerText = `Приготовьтесь...`;
			this.run();
			this.buttonFinish.addEventListener('click', () => {
				this.stopGame();
			});
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

	//создание массива из ответов
	createAnswers(taskNumber) {
		for (j = 0; j < (Object.keys(this.tasks[taskNumber]).length - 1); j++) {
			this.answers[j] = eval(`this.tasks[${taskNumber}].answer${j + 1}`);
		}
	},

	// перемешивание ответов
	shuffleAnswers() {
		let result = [];
		while (this.answers.length > 0) {
			let randomIndex = randomIntNumber(this.answers.length - 1, 0);
			let randomElement = this.answers.splice(randomIndex, 1);
			result.push(randomElement[0]);
		};
		this.answers = result;
		return this.answers;
	},

	stopGame() {
		this.players = null;
		this.players = [];
		this.gameMultiArr = [1];
		this.gameMultiIndex = 0;
		this.result = 'lose';
		this.stop = 0;
		this.penalti = false;
		this.state = 0;
		this.playerNumber = 1;
		clearInterval(this.timeClear);
		clearTimeout(this.timerTimeout);
		this.gameStatusField.innerText = `Все проиграли!`;
		this.buttonStart.classList.remove('game-card__close');
		this.gameQuest.classList.add('game-card__close');
		this.buttonStart.innerText = `Начать заново!`;
		this.buttonFinish.classList.add('game-card__close');
		this.gameSetting.classList.remove('game-card__close');
		this.textFieldQuestion.innerHTML = '';
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
		if (this.stop !== 0) {
			this.beforeTimer();
			this.gameStatusField.innerText += ` Вопрос игроку №${this.players[this.state - 1].playerNumber}`;
			this.stateLast = this.state;
			this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
		}
	},

	turnOff(value) {
		// if (value !== undefined && this.currentTask[value].result)
		if (value !== undefined && this.answers[value].result) {
			this.gameStatusField.innerText = 'Верно!';
			this.playersWin = this.players[this.stateLast - 1].playerNumber;

			if (this.gameMultiArr[this.gameMultiIndex] === 2) {
				this.stop = 0;
				this.result = 'win';
				this.finish('win');
				clearInterval(this.timeClear);
				clearTimeout(this.timerTimeout);
			} else {
				this.rightAnswers += 1;
				(this.penalti) ? (this.players[this.stateLast - 1].time = 5) :
					(this.players[this.stateLast - 1].time += 5);
				clearTimeout(this.timerTimeout);
			}
		} else {
			this.gameStatusField.innerText = 'Неверно!';
			this.playersLose = this.players[this.stateLast - 1].playerNumber;

			if (this.gameMultiArr[this.gameMultiIndex] === 3) {
				this.stopGame();
			} else {
				this.players[this.stateLast - 1].time -= 5;
				clearTimeout(this.timerTimeout);
				this.playersWrongAnswer = this.players[this.stateLast - 1].wrongAnswer;
				this.playersWrongAnswer += 1;
				this.players[this.stateLast - 1].wrongAnswer = this.playersWrongAnswer;
			}

			if (this.playersWrongAnswer >= this.maxWrongAnswers) {
				this.deleteLosePlayers();
			}
		}

		this.checkRightAns();
		this.textFieldQuestion.innerHTML = '';
	},

	checkRightAns() {
		if (this.rightAnswers < this.needRightAnswers) {
			if ((this.tasks.length === 0) || (this.countOfPlayers === 1)) {
				if ((this.countOfPlayers === 1) && (this.totalCountofPlayers != 1)) {
					this.penalti ? (this.result = 'win') : (this.result = 'lose');
					this.finish(this.result);
				} else {
					this.turnOn();
				}
			} else {
				this.turnOn();
			}
		} else {
			if (!this.penalti) {
				this.bubbleSort(this.players, this.comparationWrongAnswer);
				this.winOrPenalti();
			} else {
				this.result = 'win';
				this.finish(this.result);
			}
		}
	},

	deleteLosePlayers() {
		if (this.totalCountofPlayers != 1) {
			this.gameStatusField.innerText += ` Игрок №${this.players[this.stateLast - 1].playerNumber} выбывает из игры!`;

			this.players.splice(this.stateLast - 1, 1);
			this.countOfPlayers -= 1;
		};
		if (this.countOfPlayers === 1) {
			if (this.penalti) {
				this.result = 'win';
			} else {
				this.result = 'lose';
			}
			this.finish(this.result);
		} else {
			this.state -= 1;
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
		this.TempTextForPenalti = `Игра в пенальти для игроков №`;

		for (let i = 0; i < n - 1; i++) {
			// сравниваем элементы
			if (tikTakBoom.comparationWrongAnswer(this.players[1].wrongAnswer, this.players[0].wrongAnswer)) {
				// объявляем одного победителя
				this.resultPlayer = 'win';
				this.gameStatusField.innerText = `Игрок №${this.players[i].playerNumber},`;
				i = n - 1;
				this.playersWin = this.players[i].playerNumber;
				this.finish('win');
			} else {
				if (tikTakBoom.comparationWrongAnswer(this.players[i + 1].wrongAnswer, this.players[i].wrongAnswer)) {
					// игра в пенальти
					this.playersForPenalti.push(this.players[i]);
					this.players = this.playersForPenalti;
					this.gameStatusField.innerText = '';
					this.gameStatusField.innerText += `${this.TempTextForPenalti}${this.players[i].playerNumber}!`;
					i = n - 1;
					if (!this.penalti) {
						this.penaltiGame();
					};
				} else {
					if (this.players[i].wrongAnswer === this.players[n - 1].wrongAnswer) {
						this.gameStatusField.innerText = '';
						this.gameStatusField.innerText += `${this.TempTextForPenalti}1-${this.players[n - 1].playerNumber}!`;
						i = n - 1;
						if (!this.penalti) {
							this.penaltiGame();
						};
					} else {
						this.playersForPenalti.push(this.players[i]);
						this.TempTextForPenalti += `${this.players[i].playerNumber}, `;
					}
				}
			}
		}
	},

	penaltiGame() {
		this.playerWrongAnswerNULL();
		this.playerTimeNULL();
		this.boomTimer = 5;
		this.playerNewTime();
		this.stop = 1;
		this.state = 0;
		this.playersWrongAnswer = 0;
		this.maxWrongAnswers = 0;
		this.needRightAnswers = 3;
		this.countOfPlayers = this.players.length;
		clearInterval(this.timeClear);
		clearTimeout(this.timerTimeout);
		this.run();
		this.gameStatusField.innerText += `. Приготовьтесь...`;
		this.penalti = true;
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

	//Генерация случайного количества ответов от 2 до 5
	answersRandom() {
		this.createAnswers(this.taskNumber);
		this.rightAnswer2 = this.rightAnswer(); //вырезаем ответ с true
		this.answers.splice(this.answers.indexOf(this.rightAnswer2), 1); //формируем ответы без true
		this.shuffleAnswers(); //перемешивание ответов без true
		this.answers.splice(randomIntNumber(this.answers.length, 1)); //вырезаем до случайной длины перемешанные ответы без true
		this.answers.push(this.rightAnswer2); //вставляем ответ true
		this.shuffleAnswers(); //перемешивание ответов c true
	},

	printQuestion(task) {

		this.answersRandom();
		this.gameMultiIndex = randomIntNumber(this.gameMultiArr.length - 1, 0);
		if (this.gameMultiArr[this.gameMultiIndex] === 3) {
			this.textFieldQuestion.innerHTML = `<span class="red">Игра Восьмерка: </span>`;
		}

		if (this.gameMultiArr[this.gameMultiIndex] === 2) {
			this.textFieldQuestion.innerHTML = `<span class="red">Вопрос на миллион: </span>`;
		}

		this.textFieldQuestion.innerHTML += task.question;
		this.gameQuest.classList.remove('game-card__close');

		if (this.answers[0] === undefined) {
			this.textFieldAnswer1.classList.add('game-card__close');
		} else {
			this.textFieldAnswer1.innerText = this.answers[0].value;
			this.textFieldAnswer1.classList.remove('game-card__close');
		};
		if (this.answers[1] === undefined) {
			this.textFieldAnswer2.classList.add('game-card__close');
		} else {
			this.textFieldAnswer2.innerText = this.answers[1].value;
			this.textFieldAnswer2.classList.remove('game-card__close');
		};
		if (this.answers[2] === undefined) {
			this.textFieldAnswer3.classList.add('game-card__close');
		} else {
			this.textFieldAnswer3.innerText = this.answers[2].value;
			this.textFieldAnswer3.classList.remove('game-card__close');
		};
		if (this.answers[3] === undefined) {
			this.textFieldAnswer4.classList.add('game-card__close');
		} else {
			this.textFieldAnswer4.innerText = this.answers[3].value;
			this.textFieldAnswer4.classList.remove('game-card__close');
		};
		if (this.answers[4] === undefined) {
			this.textFieldAnswer5.classList.add('game-card__close');
		} else {
			this.textFieldAnswer5.innerText = this.answers[4].value;
			this.textFieldAnswer5.classList.remove('game-card__close');
		};
		if (this.answers[5] === undefined) {
			this.textFieldAnswer6.classList.add('game-card__close');
		} else {
			this.textFieldAnswer6.innerText = this.answers[5].value;
			this.textFieldAnswer6.classList.remove('game-card__close');
		};
		this.textFieldAnswer1.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff(0);
		});
		this.textFieldAnswer2.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff(1);
		});
		this.textFieldAnswer3.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff(2);
		});
		this.textFieldAnswer4.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff(3);
		});
		this.textFieldAnswer5.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff(4);
		});
		this.textFieldAnswer6.addEventListener('click', (event) => {
			event.stopImmediatePropagation();
			this.turnOff(5);
		});

		this.currentTask = task;
	},

	finish(result = 'lose') {
		this.buttonStart.classList.remove('game-card__close');
		this.gameQuest.classList.add('game-card__close');
		this.buttonStart.innerText = `Начать заново!`;
		this.buttonFinish.classList.add('game-card__close');
		this.gameSetting.classList.remove('game-card__close');

		if (result === 'lose') {
			this.stopGame();
		}

		if (result === 'win') {
			this.gameStatusField.innerText = `Выиграл игрок №${this.playersWin}`;
			this.stop = 0;
		}
	},

	beforeTimer() {
		this.gameQuest.classList.add('game-card__close');
		var i = this.preTime;
		this.timeClear = setInterval(() => {
			this.timerField.innerText = i;
			i--;
			if (i < 0) {
				clearInterval(this.timeClear);
				this.timer();
				this.taskNumber = randomIntNumber(this.tasks.length - 1);
				this.printQuestion(this.tasks[this.taskNumber]);
				this.tasks.splice(this.taskNumber, 1);
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
			this.gameStatusField.innerText = 'Игрок не дал ответ!';
			this.deleteLosePlayers();
			this.checkRightAns();
			this.textFieldQuestion.innerHTML = '';
		}
	},

	OneRight() {
		for (let i = 0; i < this.tasks.length; i++) {
			var OneRightOk = 0;
			for (let j = 1; j <= 10; j++) {
				if (eval(`this.tasks[i].answer${j}`)) {
					if (eval(`this.tasks[i].answer${j}.result`) == true) {
						OneRightOk++;
					};
				}
			}
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
	},

	trueOK() {
		for (let i = 0; i < this.tasks.length; i++) {
			var res = "not";
			for (let j = 1; j <= 10; j++) {
				if (eval(`this.tasks[i].answer${j}`)) {
					if (eval(`this.tasks[i].answer${j}.result`) === true) {
						res = "OK"
					}
				}
			}
			if (res === "not") throw new Error(`В вопросе ${i + 1} отсутствует верный ответ!`);
		}
	}

}