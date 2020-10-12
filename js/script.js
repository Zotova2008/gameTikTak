window.onload = function () {
	tikTakBoom.init(
		tasks,
		document.getElementById('buttonStart'),
		document.getElementById('buttonFinish'),
		document.getElementById('countOfPlayersField'),
		document.getElementById('countOfTimeField'),
		document.getElementById('timerField'),
		document.getElementById('gameStatusField'),
		document.getElementById('questionField'),
		document.getElementById('answerField'),
		document.getElementById('answer1'),
		document.getElementById('answer2'),
		document.getElementById('answer3'),
		document.getElementById('answer4'),
		document.getElementById('answer5'),
		document.getElementById('answer6'),
		document.getElementById('cardPlayers'),
		document.getElementById('cardTimer'),
		document.querySelector('.game-quest'),
		document.querySelector('#game8'),
		document.querySelector('#gameMillion'),
		document.querySelector('.game__setting')
	)

	tikTakBoom.startGame();

}