const containerHeading = document.getElementById("c-heading");
const containerBody = document.getElementById("c-body");
const button = document.getElementById("submit");
const display = document.getElementById("display")

const url = "https://opentdb.com/api.php?amount=10";

let currentQuestionIndex = 0;
let questions = [];
let selectedOption = ""; 
let score = 0;

//fetching and storing the data in questions[]

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    const data = res.results;
    questions = data.map((element) => {
      const options = [element.correct_answer, ...element.incorrect_answers];
      return {
        category: element.category,
        type: element.type,
        difficulty: element.difficulty,
        question: element.question,
        options: shuffleArray(options),
        correct_answer: element.correct_answer,
      };
    });

//calling displayQuestion to display the first question

    displayQuestion(currentQuestionIndex);

//adding button event for iterating through the questions[] and also checking wheather the selected answer is right
 
    button.addEventListener("click", () => {
      currentQuestionIndex++;
      console.log(questions[currentQuestionIndex-1].correct_answer)
      if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
        if (selectedOption == questions[currentQuestionIndex - 1].correct_answer) {
          display.textContent=`Correct Answer `
          score++;
        } else {
          display.textContent=`Wrong Answer : ${questions[currentQuestionIndex-1].correct_answer} is correct`
        }
      } else {
        containerHeading.innerHTML = "Quiz completed!";
        containerBody.innerHTML = `YourScore : ${score}`;
        button.style.display = "none";
      }
    });
  });

//display question function

function displayQuestion(index) {
  const questionData = questions[index];
  containerHeading.innerHTML = `Category: ${questionData.category}<br/>Type: ${questionData.type}<br/>Difficulty: ${questionData.difficulty}`;
  containerBody.innerHTML = `Question: ${questionData.question}<br/>Options:<br/>`;

  questionData.options.forEach((opt, id) => {
    const radio = document.createElement("input");
    radio.name = "options";
    radio.type = "radio";
    radio.className = "options";
    radio.id = `option-${id + 1}`;
    radio.value = opt;
    const label = document.createElement("label");
    label.htmlFor = `option-${id + 1}`;
    label.innerHTML = `Option ${id + 1}: ${opt}`;
    containerBody.appendChild(radio);
    containerBody.appendChild(label);
    const separator = document.createElement("br");
    containerBody.appendChild(separator);
  });

// Add an event listener to check the selected option when a radio button is clicked

  const radioButtons = document.querySelectorAll(".options");
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        selectedOption = radio.value;
        console.log(`Selected option: ${selectedOption}`);
      }
    });
  });
}

//function to shuffle the given options

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
