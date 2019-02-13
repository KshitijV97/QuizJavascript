let questions; // 'Array of Questions'
let questionsCount; // Number of Questions
let currentQuestion; // Question user is on
let score = 0;  // Score of user

// The getElementById() method returns the element that has the ID attribute with the specified value.
let question_title_elem = document.getElementById("title");
let answers_elem = document.getElementById("answers");
let action_btn = document.getElementById("action_btn");

function getQuestions() {
    // The XMLHttpRequest object can be used to request data from a web server.
    let request = new XMLHttpRequest(); // We are using AJAX

    // onreadystatechange is a XMLHttpRequest Object property Defines a function to be called when the 'readyState' property changes

    /*readyState 	Holds the status of the XMLHttpRequest.
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready  */
    request.onreadystatechange = function () {
        /* status 	200: OK
                    404: Page not found*/
        if (this.readyState == 4 && this.status == 200) {

            /*A common use of JSON is to exchange data to/from a web server.
            When receiving data from a web server, the data is always a string.
            Parse the data with JSON.parse(), and the data becomes a JavaScript object. */
            
            questions = JSON.parse(this.responseText).questions; // This is an 'array of questions'

            questionsCount = questions.length; // Length of the array of Questions

            currentQuestion = 0; // We start from zero xD
        }
    }

    // GET request to fetch questions.json
    request.open("GET", "/questions.json", false); 
    request.send();
}

function displayQuestion(question) {
    // Initially let these fields be empty
    question_title_elem.innerHTML = "";
    answers_elem.innerHTML = "";

    /*All viewable HTML text in a page (except text in form elements or custom embedded objects) is in text nodes. 
    
    The page consists of a number of different types of nodes some of which can have child nodes and some of which cannot.

    A div is an ELEMENT node which can contain child nodes. 
    
    Those child nodes can be other ELEMENT nodes or they can be TEXT nodes or COMMENT nodes or other types of nodes.

    When you set the .innerHTML property of an element node, it creates the appropriate nodes and makes them child nodes of the element that you set the innerHTML property on. If there is text in the innerHTML you set, then text nodes will be created to hold it

     */
    let question_title = document.createTextNode(question.title); // question.title from json
    question_title_elem.appendChild(question_title); // Place the question text in question_title_elem

    // answers is inside question in json
    // array.forEach(function(currentValue, index, arr), thisValue)
    // function to be run for each element in array
    question.answers.forEach(answer => {
        let label = document.createElement("label"); // We are creating a label
        let answer_input = document.createElement("input");
        answer_input.setAttribute("type", "radio");
        answer_input.setAttribute("name", "answer"); 
        answer_input.setAttribute("value", answer.id); // answer is that 'answers' array
        answer_input.classList.add("answer");

        let answer_title = document.createTextNode(answer.answer);
        label.appendChild(answer_input);
        label.appendChild(answer_title);

        answers_elem.appendChild(label);
    });
}

action_btn.addEventListener("click", function () {
    let answers = document.getElementsByClassName("answer");
    for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        let question = questions[currentQuestion];

        if (answer.checked && answer.value == question.correct) {
            answer.parentNode.classList.add("correct");
            score++;
        } else if (answer.checked && answer.value != question.correct) {
            answer.parentNode.classList.add("incorrect");
        }

        //answer.disabled = true;
    }

    currentQuestion++;

    let next_btn = document.getElementById("next_btn");
    next_btn.classList.remove("hide");
    this.classList.add("hide");
});

next_btn.addEventListener("click", function () {
    if (currentQuestion == questionsCount) {
        document.getElementById("question").classList.add("hide");
        document.getElementById("scores").classList.remove("hide");
        document.getElementById("score").innerHTML = score + "/" + questionsCount;
        return;
    }

    displayQuestion(questions[currentQuestion]);
    action_btn.classList.remove("hide");
    this.classList.add("hide");
});

// Initialisation
getQuestions();
displayQuestion(questions[currentQuestion]);