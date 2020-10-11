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
		this.boomTimer = 30
		this.stop = 1;
		this.tasks = JSON.parse(tasks);
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
		this.buttonStart.classList.add('game-card__close');
		this.gameSetting.classList.add('game-card__close');
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
		});
		this.buttonFinish.addEventListener('click', (event) => {
			this.stopGame();
		});
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
		// debugger;
		this.players = null;
		this.players = [];
		this.gameMultiArr = [1];
		this.gameMultiIndex = 0;
		this.result = 'lose';
		this.stop = 0;
		this.state = 0;
		this.playerNumber = 1;
		this.finish();
		clearInterval(this.timeClear);
		clearTimeout(this.timerTimeout);
		this.gameStatusField.innerText = `Все проиграли!`;
		this.gameSetting.classList.remove('game-card__close');
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
			// debugger;
			this.beforeTimer();
			this.gameStatusField.innerText += ` Вопрос игроку №${this.players[this.state - 1].playerNumber}`;
			this.stateLast = this.state;
			this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
		}
	},

	turnOff(value) {
		if (value !== undefined && this.currentTask[value].result) {
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
				this.players[this.stateLast - 1].time += 5;
				clearTimeout(this.timerTimeout);
			}
		} else {
			// debugger;
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
				if (this.playersWrongAnswer >= this.maxWrongAnswers) {
					// debugger;
					this.gameStatusField.innerText += ` Игрок №${this.players[this.stateLast - 1].playerNumber} дал 3 неверных ответа и выбывает из игры!`;
					this.players.splice(this.stateLast - 1, 1);
					this.countOfPlayers -= 1;
					if (this.countOfPlayers === 1) {
						this.result = 'lose';
						this.stop = 0;
						this.boomTimer = 0;
						this.preTime = 0;
						this.state = 0;
						this.playerNumber = 1;
						this.players = null;
						this.players = [];
						this.finish();
					} else {
						this.state -= 1;
					};
				}
			}
		}
		if (this.rightAnswers < this.needRightAnswers) {
			if ((this.tasks.length === 0) || (this.countOfPlayers === 1)) {
				this.finish('lose');
			} else {
				this.turnOn();
			}
		} else {
			this.bubbleSort(this.players, this.comparationWrongAnswer);
			this.result = 'win';
			this.stop = 0;
			this.boomTimer = 0;
			this.preTime = 0;
			this.state = 0;
			this.playerNumber = 1;
			this.players = null;
			this.players = [];
			this.finish('win');
		}
		this.textFieldQuestion.innerHTML = '';
	},

	// функция сравнения двух элементов по цвету
	comparationWrongAnswer(wrongAnswer1, wrongAnswer2) {
		return (parseInt(wrongAnswer1) > parseInt(wrongAnswer2)) ? true : false;
	},

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


	printQuestion(task) {
		this.gameMultiIndex = randomIntNumber(this.gameMultiArr.length - 1, 0);

		if (this.gameMultiArr[this.gameMultiIndex] === 2) {
			this.textFieldQuestion.innerHTML = `<span class="red">Вопрос на миллион: </span>`;
		}

		if (this.gameMultiArr[this.gameMultiIndex] === 3) {
			this.textFieldQuestion.innerHTML = `<span class="red">Игра Восьмерка: </span>`;
		}

		this.textFieldQuestion.innerHTML += task.question;
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
		this.gameSetting.classList.remove('game-card__close');

		if (result === 'lose') {
			this.gameStatusField.innerText = `Все проиграли`;
		}
		if (result === 'win') {
			// this.gameStatusField.innerText = `Вы выиграли!`;
			this.gameStatusField.innerText = `Выиграл игрок №${this.playersWin}`;
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
			// this.finish('lose');
			this.stopGame();
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
			if (OneRightOk > 1) throw new Error(`В вопросе ${i+1} больше одного верного ответа!`);
		}
	},

	questionOk() {
		for (let i = 0; i < this.tasks.length; i++) {
			if ('question' in this.tasks[i]) {} else throw new Error(`В вопросе ${i+1} отсутствует вопрос!`);
		}
	},

	AnsANDquesOK() {
		for (let i = 0; i < this.tasks.length; i++) {
			let ques = this.tasks[i].question;
			if (!ques.includes(" ")) {
				alert(`В вопросе ${i+1} отсутствует вопрос!`)
			}
			for (let j = 1; j <= 10; j++) {
				if (eval(`this.tasks[i].answer${j}`)) {
					if (eval(`this.tasks[i].answer${j}.value`) === "") throw new Error(`В вопросе ${i+1} отсутствует ответ!`);
				}
			}
		}
	},

	kolQues() {
		if (this.tasks.length < 30) throw new Error(`В игре мало вопросов!`);
	}

}