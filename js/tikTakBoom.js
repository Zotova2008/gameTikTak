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
		textFieldAnswer6
	) {
			

		this.preTime = 4;
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

		this.needRightAnswers = 5;
		this.maxWrongAnswers = 3;
		this.playersWrongAnswer = 0;
		this.playerNumber = 1;

		try {
			this.OneRight();
			this.questionOk();
			this.AnsANDquesOK();
			this.kolQues();
		  } catch(anyException) {
			console.warn(anyException.message);
			alert("Есть ошибки!");
		  }

	},


	showDom() {
		this.buttonStart.style.display = "none";
		this.buttonFinish.style.display = "block";
		this.timerField.style.display = "block";
		this.gameStatusField.style.display = "block";
	},

	startGame() {
		
		this.buttonStart.addEventListener('click', (event) => {
			tikTakBoom.countOfPlayers = parseInt(tikTakBoom.countOfPlayersField.value) || 2;
			tikTakBoom.boomTimer = (parseInt(tikTakBoom.countOfTimeField.value) + 1) || 31;

			tikTakBoom.stop = 1;
			tikTakBoom.players = null;
			tikTakBoom.players = [];
			tikTakBoom.createPlayers();
			console.log(tikTakBoom.players);
			tikTakBoom.showDom();
			tikTakBoom.gameStatusField.innerText = ``;
			tikTakBoom.gameStatusField.innerText = `Приготовьтесь...`;
			tikTakBoom.run();
			tikTakBoom.stopGame();
		}
		)
	},

	createPlayers() {
		this.playersWrongAnswer = 0;
		this.playerNumber = 1;

		while (this.players.length < this.countOfPlayers) {
			this.index = this.playerNumber - 1;
			this.players[this.index] = {};
			this.players[this.index].playerNumber = `${this.playerNumber}`;
			this.players[this.index].wrongAnswer = `${this.playersWrongAnswer}`;
			this.playerNumber += 1;
		};
	},

	stopGame() {
		this.buttonFinish.addEventListener('click', (event) => {
			debugger;
			tikTakBoom.players = null;
			tikTakBoom.players = [];
			tikTakBoom.result = 'lose';
			tikTakBoom.stop = 0;
			tikTakBoom.boomTimer = 0;
			tikTakBoom.preTime = 0;
			tikTakBoom.state = 0;
			tikTakBoom.playerNumber = 1;
			tikTakBoom.pretimer();
			tikTakBoom.timer();
			tikTakBoom.finish();
		}
		)
	},

	run() {
		this.state = 1;
		if (this.result) {
			tikTakBoom.boomTimer = (parseInt(tikTakBoom.countOfTimeField.value) + 1) || 31;
			this.preTime = 4;
			this.stop = 1;
		};
		this.rightAnswers = 0;
		this.pretimer();
		this.timer();
		this.turnOn();
	},

	turnOn() {
		if (this.stop == 0) {
			debugger;
			this.gameStatusField.innerText += ` Вопрос игроку №${this.players[`${this.state - 1}`].playerNumber}`;

			const taskNumber = randomIntNumber(this.tasks.length - 1);
			this.printQuestion(this.tasks[taskNumber]);
			this.tasks.splice(taskNumber, 1);
			this.stateLast = this.state;
			this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
		}
	},

	turnOff(value) {
		if (this.currentTask[value].result) {
			this.gameStatusField.innerText = 'Верно!';
			this.rightAnswers += 1;
			this.boomTimer += 5;
		} else {
			debugger;
			this.gameStatusField.innerText = 'Неверно!';
			this.boomTimer -= 5;
			this.playersWrongAnswer = parseInt(this.players[`${this.stateLast - 1}`].wrongAnswer);
			this.playersWrongAnswer += 1;
			this.players[`${this.stateLast - 1}`].wrongAnswer = `${this.playersWrongAnswer}`;
			console.log(this.players);
			if (this.playersWrongAnswer >= this.maxWrongAnswers) {
				debugger;
				this.gameStatusField.innerText += ` Игрок №${this.players[`${this.stateLast - 1}`].playerNumber} дал 3 неверных ответа и выбывает из игры!`;
				this.players.splice(`${this.stateLast - 1}`, 1);
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
					this.pretimer();
					this.timer();
					this.finish();
				} else {
					this.state -= 1;
					console.log(this.players);
				};
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
			console.log(this.players);
			this.result = 'won';
			this.stop = 0;
			this.boomTimer = 0;
			this.preTime = 0;
			this.state = 0;
			this.playerNumber = 1;
			this.players = null;
			this.players = [];
			this.pretimer();
			this.timer();
			this.finish('won');
		}
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
		this.textFieldQuestion.innerText = task.question;
		this.textFieldAnswer1.innerText = task.answer1.value;
		this.textFieldAnswer2.innerText = task.answer2.value;
		this.textFieldAnswer1.style.display = "block";
		this.textFieldAnswer2.style.display = "block";

		if (task.answer3 === undefined) {
			this.textFieldAnswer3.style.display = "none";
		} else {
			this.textFieldAnswer3.innerText = task.answer3.value;
			this.textFieldAnswer3.style.display = "block";
		};
		if (task.answer4 === undefined) {
			this.textFieldAnswer4.style.display = "none";
		} else {
			this.textFieldAnswer4.innerText = task.answer4.value;
			this.textFieldAnswer4.style.display = "block";
		};
		if (task.answer5 === undefined) {
			this.textFieldAnswer5.style.display = "none";
		} else {
			this.textFieldAnswer5.innerText = task.answer5.value;
			this.textFieldAnswer5.style.display = "block";
		};
		if (task.answer6 === undefined) {
			this.textFieldAnswer6.style.display = "none";
		} else {
			this.textFieldAnswer6.innerText = task.answer6.value;
			this.textFieldAnswer6.style.display = "block";
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
		this.buttonStart.style.display = "block";
		this.textFieldAnswer.style.display = "none";
		this.textFieldQuestion.style.display = "none";
		this.buttonStart.innerText = `Начать заново!`;
		this.buttonFinish.style.display = "none";

		if (result === 'lose') {
			this.gameStatusField.innerText = `Вы проиграли!`;

		}
		if (result === 'won') {
			this.gameStatusField.innerText = `Вы выиграли!`;
		}
	},

	timer() {
		debugger;
		if ((this.state) && (this.stop == 0)) {
			this.boomTimer -= 1;

			if (this.boomTimer > 0) {
				let sec = this.boomTimer % 60;
				let min = (this.boomTimer - sec) / 60;
				sec = (sec >= 10) ? sec : '0' + sec;
				min = (min >= 10) ? min : '0' + min;
				this.timerField.innerText = `${min}:${sec}`;
				var timer2 = setTimeout(
					() => {
						this.timer()
					},
					1000,
				);
			} else {
				this.timerField.innerText = `00:00`;
				this.state = 0;
				this.finish();
				setTimeout(
					() => clearTimeOut(timer2)
				);
			}
		}
	},

	pretimer() {
		if (this.stop == 1) {
			this.preTime -= 1;
			let sec = this.preTime % 60;
			this.timerField.innerText = `${sec}`;
			if (this.preTime > 0) {
				var timer1 = setTimeout(
					() => {
						this.pretimer()
					},
					1000,
				)
			} else {
				setTimeout(
					() => clearTimeout(timer1)
				);
				this.gameStatusField.innerText = ``;
				this.gameStatusField.innerText = `Игра идет...`;
				this.timerField.innerText = `0`;
				this.stop = 0;
				this.preTime = 4;
				this.textFieldQuestion.style.display = "block";
				this.textFieldAnswer.style.display = "block";
				this.turnOn();
				this.timer();

			}
		}
	},

	OneRight() {
//console.log(this.tasks.length);
		for (let i = 0; i < this.tasks.length; i++) {
			var OneRightOk = 0;
			for(let j = 1; j <= 10; j++){
				if(eval(`this.tasks[i].answer${j}`)){
					if(eval(`this.tasks[i].answer${j}.result`) == true) {OneRightOk++};
				}
			}
				//console.log(OneRightOk + " vopr: " + parseInt(i+1));
				if(OneRightOk > 1) throw new Error(`В вопросе ${i+1} больше одного верного ответа!`);
		}
	},

	questionOk() {
		for (let i = 0; i < this.tasks.length; i++) {
			if('question' in this.tasks[i]){}
			else throw new Error(`В вопросе ${i+1} отсутствует вопрос!`);
		}
	},

	AnsANDquesOK() {
		for (let i = 0; i < this.tasks.length; i++) {
			let ques = this.tasks[i].question;
			if(!ques.includes(" ")) {alert(`В вопросе ${i+1} отсутствует вопрос!`)}
			for(let j = 1; j <= 10; j++){
				if(eval(`this.tasks[i].answer${j}`)){
					if(eval(`this.tasks[i].answer${j}.value`) === "") throw new Error(`В вопросе ${i+1} отсутствует ответ!`);
				}
			}
		}
	},

	kolQues() {
		if(this.tasks.length < 30) throw new Error(`В игре мало вопросов!`);
	}

}
