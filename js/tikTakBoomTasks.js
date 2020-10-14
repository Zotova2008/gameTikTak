const tasks = `

    [
        {
            "question": "Какой символ используется для однострочных комментариев в Javascript?",
            "answer1": { "result": true, "value": "//" },
				"answer2": { "result": false, "value": "<-- --!>" },
				"answer3": { "result": false, "value": "/" },
				"answer4": { "result": false, "value": "/**/" }
        },
        {
            "question": "Как правильно написать if условие в JavaScript?",
            "answer1": { "result": false, "value": "if i = 5" },
				"answer2": { "result": true, "value": "if (i == 5)" },
				"answer3": { "result": false, "value": "if i = 5 then" },
				"answer4": { "result": false, "value": "if i == 5 then" }
        },
        {
            "question": "Является ли элемент «else» обязательным в конструкции условия",
            "answer1": { "result": false, "value": "Да" },
				"answer2": { "result": true, "value": "Нет" },
				"answer3": { "result": false, "value": "Зависит от версии JavaScript" },
				"answer4": { "result": false, "value": "В разных браузерах по-разному" }
        },
        {
            "question": "Как вы можете преобразовать строку любой базы в целое число в JavaScript?",
            "answer1": { "result": false, "value": "Integer.convertTo()" },
				"answer2": { "result": false, "value": "Stringify()" },
				"answer3": { "result": false, "value": "Integer.revert()" },
				"answer4": { "result": true, "value": "parseInt()" }
			},
        {
			"question": "Как правильно написать начало while цикла?",
			"answer1": { "result": false, "value": "while i = 1 to 10" },
			"answer2": { "result": true, "value": "while (i <= 10)" },
			"answer3": { "result": false, "value": "while (i <= 10; i++)" },
			"answer4": { "result": false, "value": "while (i from 1 to 10)" }
		},
	  {
		"question": "Как правильно написать начало for цикла?",
		"answer1": { "result": false, "value": "for (i = 0; i <= 5)" },
		"answer2": { "result": true, "value": "for (i = 0; i <= 5; i++)" },
		"answer3": { "result": false, "value": "for i = 1 to 5" },
		"answer4": { "result": false, "value": "for (i <= 5; i++)" }
  },
  {
	"question": "Как заблокировать поведение браузера по умолчанию на событии? Например, заблокировать перенаправление со ссылки.",
	"answer1": { "result": true, "value": "event.preventDefault ()" },
	"answer2": { "result": false, "value": "event.stopPropagation ()" },
	"answer3": { "result": false, "value": "event.stop ()" },
	"answer4": { "result": false, "value": "event.default = false" }
},
{
	"question": "Как сгенерировать случайное число от 1 до 10?",
	"answer1": { "result": false, "value": "Math.random(10)+1;" },
	"answer2": { "result": false, "value": "Math.random() * 10+1;" },
	"answer3": { "result": false, "value": "Math.floor(Math.random(10)+1);" },
	"answer4": { "result": true, "value": "Math.floor((Math.random() * 10) + 1);" }
},
{
	"question": "Какой из указанных методов добавляет элемент в конец массива?",
	"answer1": { "result": true, "value": ".push()" },
	"answer2": { "result": false, "value": ".pop()" },
	"answer3": { "result": false, "value": ".shift()" },
	"answer4": { "result": false, "value": ".unshift()" }
},
{
	"question": "С каких из указанных знаков не может начинаться название переменной?",
	"answer1": { "result": false, "value": "$" },
	"answer2": { "result": false, "value": "A" },
	"answer3": { "result": false, "value": "a" },
	"answer4": { "result": false, "value": "_" },
	"answer5": { "result": true, "value": "2" }
},
{
	"question": "Какой метод удаляет последний элемент массива?",
	"answer1": { "result": false, "value": ".push()" },
	"answer2": { "result": true, "value": ".pop()" },
	"answer3": { "result": false, "value": ".shift()" },
	"answer4": { "result": false, "value": ".unshift()" }
},
{
	"question": "Можете ли вы передать функцию в качестве аргумента другой функции?",
	"answer1": { "result": false, "value": "В некоторых случаях ДА" },
	"answer2": { "result": false, "value": "В некоторых случаях НЕТ" },
	"answer3": { "result": true, "value": "ДА" },
	"answer4": { "result": false, "value": "НЕТ" }
},
{
	"question": "Сколько разных ключевых слов для описания циклов доступно в javascript?",
	"answer1": { "result": false, "value": "Одно: for" },
	"answer2": { "result": false, "value": "Два: for и while" },
	"answer3": { "result": false, "value": "for, while и do...while" },
	"answer4": { "result": true, "value": "Четыре: for, while, do...while и foreach" }
},
{
	"question": "Что из нижеуказанного не относится к примитивам?",
	"answer1": { "result": true, "value": "NaN" },
	"answer2": { "result": false, "value": "Null" },
	"answer3": { "result": false, "value": "Boolean" },
	"answer4": { "result": false, "value": "String" }
},
{
	"question": "Как правильно написать IF конструкцию, чтобы выполнялся некоторый код, когда i не равно 5.",
	"answer1": { "result": false, "value": "if (i  5)" },
	"answer2": { "result": false, "value": "if i  5" },
	"answer3": { "result": false, "value": "if i =! 5 then" },
	"answer4": { "result": true, "value": "if (i != 5)" }
},
{
	"question": "Как правильно объявить объект?",
	"answer1": { "result": true, "value": "var object = {};" },
	"answer2": { "result": false, "value": "var object = [];" },
	"answer3": { "result": false, "value": "var object = new Array();" },
	"answer4": { "result": false, "value": "Неправильные варианты 1 и 3." }
},
{
	"question": "Каким методом можно получить данные, введенные пользователем?",
	"answer1": { "result": false, "value": "alert()" },
	"answer2": { "result": false, "value": "confirm()" },
	"answer3": { "result": true, "value": "prompt()" },
	"answer4": { "result": false, "value": "message()" }
},
{
	"question": "Укажите имя функции округления вверх.",
	"answer1": { "result": false, "value": "ceil" },
	"answer2": { "result": false, "value": "math.ceil" },
	"answer3": { "result": true, "value": "math.ceil()" },
	"answer4": { "result": false, "value": "ceil()" }
},
{
	"question": "Как объявить функцию в JS?",
	"answer1": { "result": false, "value": "def fh = function(){};" },
	"answer2": { "result": true, "value": "function fh(){};" },
	"answer3": { "result": false, "value": "let function fh(){};" }
},
{
	"question": "Какая компания разработала JavaScript?",
	"answer1": { "result": false, "value": "JSDevs" },
	"answer2": { "result": true, "value": "Netscape" },
	"answer3": { "result": false, "value": "Green Space" },
	"answer4": { "result": false, "value": "Proscape" }
},
{
	"question": "Какое из следующих утверждений используется для объявления переменной в JavaScript?",
	"answer1": { "result": false, "value": "Assignment Statement" },
	"answer2": { "result": false, "value": "Conditional Statement" },
	"answer3": { "result": false, "value": "Executable Statement" },
	"answer4": { "result": true, "value": "Declaration Statement" }
},
{
	"question": "Какие имена переменных являются валидными?",
	"answer1": { "result": true, "value": "var, let, const" },
	"answer2": { "result": false, "value": "_, $, someVariable" },
	"answer3": { "result": false, "value": "foo, _foo, 1foo" },
	"answer4": { "result": false, "value": "ba-r, _bar, foo_bar" }
},
{
	"question": "Поддерживает ли JavaScript автоматическое преобразование типов?",
	"answer1": { "result": false, "value": "нет" },
	"answer2": { "result": false, "value": "не полностью" },
	"answer3": { "result": true, "value": "да" },
	"answer4": { "result": false, "value": "зависит от фреймворка" }
},
{
	"question": "Что делает оператор «<<» (например, в выражении: a << b)?",
	"answer1": { "result": false, "value": "Проверяет, строго ли a меньше, чем b" },
	"answer2": { "result": false, "value": "Проверяет, намного ли а меньше б" },
	"answer3": { "result": false, "value": "Поднимает а к области б" },
	"answer4": { "result": true, "value": "Сдвигает биты a влево на количество битов, указанное в b" },
	"answer5": { "result": false, "value": "Проверяет, наследует ли объект a объект b" },
	"answer6": { "result": false, "value": "Удлиняет объект а из объекта б" }
},
{
	"question": "Как получить элемент по идентификатору из документа?",
	"answer1": { "result": false, "value": "document.getElementsById(id);" },
	"answer2": { "result": true, "value": "document.getElementById(id);" },
	"answer3": { "result": false, "value": "getElementById(document, id);" },
	"answer4": { "result": false, "value": "getElementsById(document, id);" }
},
{
	"question": "Что позволяет назначить набор обратных вызовов на желаемое событие?",
	"answer1": { "result": false, "value": "Element.onEvent" },
	"answer2": { "result": false, "value": "Element.events" },
	"answer3": { "result": false, "value": "Element.addEventCaller" },
	"answer4": { "result": true, "value": "Element.addEventListener" },
	"answer5": { "result": false, "value": "Element.prototype.onclick" }
},
{
	"question": "Что вернет следующий код? console.log(typeof typeof 1);",
	"answer1": { "result": false, "value": "number" },
	"answer2": { "result": true, "value": "string" },
	"answer3": { "result": false, "value": "function" },
	"answer4": { "result": false, "value": "ParseError" }
},
{
	"question": "Что такое V8 в JavaScript?",
	"answer1": { "result": true, "value": "Имя движка с открытым исходным кодом JavaScript" },
	"answer2": { "result": false, "value": "Название популярной библиотеки, такой как jQuery" },
	"answer3": { "result": false, "value": "Это не имеет отношения к JS. Это название двигателя, используемого в автомобилях" },
	"answer4": { "result": false, "value": "Зарезервированное слово" }
},
{
	"question": "Выберите способ получить ключи объекта.",
	"answer1": { "result": false, "value": "Array.prototype.keys()" },
	"answer2": { "result": false, "value": "None of above" },
	"answer3": { "result": true, "value": "Object.keys()" },
	"answer4": { "result": false, "value": "Object.prototype.getKeys()" },
	"answer5": { "result": false, "value": "Array.getKeys()" }
},
{
	"question": "Какое значение имеет объявленная переменная (например, var a;)?",
	"answer1": { "result": true, "value": "undefined" },
	"answer2": { "result": false, "value": "null" },
	"answer3": { "result": false, "value": "0" },
	"answer4": { "result": false, "value": "empty" },
	"answer5": { "result": false, "value": "var" }
}
    ]
`;
