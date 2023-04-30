const questions = [
	{
		question: "Which is the largest animal in the world?",
		answers: [
			{text: "Shark", correct: false},
			{text: "Blue Whale", correct: true},
			{text: "Elephant", correct: false},
			{text: "Giraffe", correct: false},
		]
	},
	
	{
		question: "Which is the smallest continent in the world?",
		answers: [
			{text: "Asia", correct: false},
			{text: "Australia", correct: true},
			{text: "Artic", correct: false},
			{text: "Africa", correct: false},
		]
	},

	{
		question: "Which of the following is not an organ in the human body?",
		answers: [
			{text: "Pancreas", correct: false},
			{text: "GallBladder", correct: false},
			{text: "Eye", correct: false},
			{text: "Ulna", correct: true},
		]
	},

	{
		question: "What is the main ingredient of mince pie?",
		answers: [
			{text: "Dried Fruit", correct: true},
			{text: "Cherries", correct: false},
			{text: "Rhubarb", correct: false},
			{text: "Pork", correct: false},
		]
	},

	{
		question: "Which of the following is not a literary bear?",
		answers: [
			{text: "Clifford", correct: true},
			{text: "Winnie the Pooh", correct: false},
			{text: "Corduroy", correct: false},
			{text: "Paddington", correct: false},
		]
	},

	{
		question: "What artist has the most streams on Spotify?",
		answers: [
			{text: "Bad Bunny", correct: false},
			{text: "Micheal Jackson", correct: false},
			{text: "Drake", correct: true},
			{text: "Taylor Swift", correct: false},
		]
	},

	{
		question: "Which type of cookie usually predicts your future with a sheet of paper inside it?",
		answers: [
			{text: "Sugar Cookie", correct: false},
			{text: "Ice Cream Cookie", correct: false},
			{text: "Fortune Cookie", correct: true},
			{text: "Pizzelle", correct: false},
		]
	},

	{
		question: "The art of paper folding is called:",
		answers: [
			{text: "Creasing", correct: false},
			{text: "Origami", correct: true},
			{text: "Mixed Media", correct: false},
			{text: "Collage", correct: false},
		]
	},


	{
		question: "How many ghosts chase Pac-Man at the start of each game?",
		answers: [
			{text: "3", correct: false},
			{text: "4", correct: true},
			{text: "5", correct: false},
			{text: "2", correct: false},
		]
	},
	
	{
		question: "Which planet has the most moons?",
		answers: [
			{text: "Saturn", correct: true},
			{text: "Earth", correct: false},
			{text: "Jupiter", correct: false},
			{text: "Neptune", correct: false},
		]
	},

];

const questionElement = document.getElementById("question");

const answerButtons = document.getElementById("answer-buttons");

const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0; 

function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion(){
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
	
	currentQuestion.answers.forEach(answer => {
	const button = document.createElement("button");
	button.innerHTML = answer.text; 
	button.classList.add("btn");
	answerButtons.appendChild(button);
	if(answer.correct){
		button.dataset.correct = answer.correct;
		}
	button.addEventListener("click", selectAnswer);
		});
}

function resetState(){
	nextButton.style.display ="none";
	while(answerButtons.firstChild){
	answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e) {
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if (isCorrect){
	selectedBtn.classList.add("correct");
	score++;
	} else {
	selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button => {
		if (button.dataset.correct === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function showScore(){
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";
}

function handleNextButton() {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		showQuestion();
	} else {
		showScore();
	}
}

nextButton.addEventListener("click", ()=> {
	if(currentQuestionIndex < questions.length){
		handleNextButton();
	} else {
		alert("Congratulations! You have finished the quiz!");
		startQuiz();
	}
});

startQuiz();