// When start button is clicked it will begin the game and hide the start button
$(".btn-dark").on("click", function () {
    // remove homepage from view 
    $(".card").hide();
    console.log("user clicked start");
    //Get the first question
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time: 75")
    $(".highScore").html("View Highscores");
    $(".question-display").show();
    $("#button-display").show();
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctGuesses = 0;
    quizQuestion.incorrectGuesses = 0;
    quizQuestion.getQuestion();
    document.getElementById('userInput').value = " ";
})

// Reset button, resets game
$(".btn-secondary").on("click", function () {
    console.log("user clicked Restart");
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time: 75")
    $(".highScore").html("View Highscores");
    $(".question-display").show();
    $("#button-display").show();
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctGuesses = 0;
    quizQuestion.incorrectGuesses = 0;

    quizQuestion.getQuestion();
})
//Intitials for High scores
$("#submitInitials").on("click", function () {
    console.log("user clicked submit initials for high scores");
    $(".highScorePage").show();
    quizQuestion.highScorePage();
})
//console log for resetting high scores
$("#resetScores").on("click", function () {
    console.log("user clicked reset high scores");
    localStorage.clear();
    $("#hsArray").hide();
})
//Returns user from high scores "go back button"
$("#goBack").on("click", function () {
    console.log("user clicked to return from high scores high scores");
    clearInterval(quizQuestion.countDownTimer);
    $(".question-display").hide();
    $("#button-display").hide();
    $(".highScorePage").hide();
    $(".card").show();
    $(".timer").show();
    $(".timer").html("Time: 75");

    $(".highScore").show();
    $("#hsArray").empty();

})


//Determines which high scores are replaced 
$(".highScore").on("click", function () {
    console.log("user clicked highScore");
    quizQuestion.counter = 0;
    quizQuestion.highScorePage();
})


// Click event for answer buttons
$("#button-display").on("click", ".answerButton", function (e) {
    // Click target for answers 
    var selectedAnswer = $(e.target).attr("data-name");
    console.log(e);
    console.log(e.target);
    console.log(e.target.data);
    console.log($(e.target).attr("data-name"));
    quizQuestion.checkAnswer(selectedAnswer);
})

// Global Variables
var Counter = 0;
var hrLine = document.createElement("hr");
var highScore = 0;
var quizQuestion = {
    // current question
    currentQuestion: "",
    // correct answers 
    correctGuesses: 0,
    // incorrect answers 
    incorrectGuesses: 0,
    // counter 
    counter: 0,
    countDownTimer: null,
    // question number 
    questionNumber: 0,

//questions from https://www.w3schools.com/quiztest/quiztest.asp?qtest=HTML
// https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
    questions: [
        {
            // question text
            questionText: "What does HTML stand for?",
            // question answers array
            questionAnswer: ["Hyperlinks and Text Markup language", "Home Tool Markup Language", "Hypertext Markup Language"],
            // correct answer 
            answer: "<Hyper Text Markup Language>"
        },
        {
            questionText: "Choose the correct HTML element for the largest heading:",
            questionAnswer: ["<h6>", "<h1>", "<body>", "<heading>"],
            answer: "<h1>"
        },
        {
            questionText: "Inside which HTML element do we put the JavaScript?",
            questionAnswer: ["<scripting>", "<javascript>", "<js>", "<script>"],
            answer: "<script>"
        },
        {
            questionText: "Where is the correct place to insert a JavaScript?",
            questionAnswer: ["The <head> section", "Both the <head> section and the <body> section are correct", "The <body> section", "The <footer> section"],
            answer: "The <body> section",
        },

        {
            questionText: 'What is the correct syntax for referring to an external script called "xxx.js"?',
            questionAnswer: ["<script href='xxx,js'>", "<script src='xxx.js'>", "<script name='xxx.js>"],
            answer: "<script src='xxx.js'>",
        },

    ],
//countdown timer
    run: function () {
        clearInterval(this.countDownTimer);
        this.countDownTimer = setInterval(this.decrement, 1000);
        //10 seconds decrement
        quizQuestion.counter = 75;
    },
//decrement fucntion 
    decrement: function () {
        quizQuestion.counter--;
        $(".timer").html("Time: " + quizQuestion.counter);
        if (quizQuestion.counter <= 0) {
            $("#timeout")[0].play();
            quizQuestion.counter = 0;
            clearInterval(quizQuestion.countDownTimer);
            quizQuestion.finalPage();
            
            //$("#initials").html("Sorry!  You timed out.")
            $(".question-display").hide();
            $("#button-display").hide();
        }
    },

    // get question method
    getQuestion: function () {
        
        // clear and hides objects when the question loads
        $(".question-display").empty();
        $(".areYouRight").empty();
        $(".ready").empty();
        // display question 
        $(".question-display").html("<p>" + this.questions[this.questionNumber].questionText + "</p>");
        this.buttonGenerator();
    },

    //button generator method 
    buttonGenerator: function () {
        //empty buttons 
        $("#button-display").empty();
        // for loop to display answer buttons on the screen 
        
        for (var i = 0; i < this.questions[this.questionNumber].questionAnswer.length; i++) {
            $("#button-display").append("<li>");
            var a = $("<button>");
            a.addClass("answerButton");
            a.attr("data-name", this.questions[this.questionNumber].questionAnswer[i]);
            a.text(this.questions[this.questionNumber].questionAnswer[i]);
            //display button
            $("#button-display").append(a);  
            $("#button-display").append("</li>");          
        };
    },

    // Checks if answer is wrong or correct
    checkAnswer: function (selectedAnswer) {
        //determine if the answer is correct 
        console.log(this.questions[this.questionNumber]);

        if (selectedAnswer === this.questions[this.questionNumber].answer) {
            console.log("win");
            $("#win")[0].play();
            // increment the number correct 
            this.correctGuesses++;
            console.log(this.correctGuesses);
            // display win message 
            $(".areYouRight").html("<hr id='win'/>Correct!");
            // next question 
            this.questionNumber++;
        }
        else {
            $("#lose")[0].play();
            console.log("lose");
            // increment incorrect guess 
            this.incorrectGuesses++;
            console.log(this.incorrectGuesses);
            //Deduct 5 seconds for incorrect answer
            quizQuestion.counter = quizQuestion.counter - 10;
            // display lose message with red hr
            $(".areYouRight").html("<hr id='lose'/> Wrong!");
            // next question   
            this.questionNumber++;
        }
        this.answerPage();
    },
 
    answerPage: function () {
        // check for last question
        setTimeout(function () {
            if (quizQuestion.questionNumber < quizQuestion.questions.length) {
                quizQuestion.getQuestion();
            }
            else {
                quizQuestion.finalPage();
            }
        }, 1000
        )
    },

    viewHighScore: function () {
        $(".highScore").html("Highscore: " + highScore);
    },

    // Display stats page 
    finalPage: function () {
        // empty and hide divs
        $(".question-display").empty();
        
        $("#button-display").empty();
        $(".areYouRight").empty();
        $(".timer").hide();
        $(".final-page").show();
        $("#message").html("<h2>All done!</h2><p>Here are your results:</p>");
        $("#score").html("Your final score is " + quizQuestion.counter);
        $("#correct").html("Correct Guesses: " + this.correctGuesses);
        $("#incorrect").html("Incorrect Guesses: " + this.incorrectGuesses);
        clearInterval(quizQuestion.countDownTimer);
    },
    highScorePage: function () {
        // Hide elements on page for highScorePage Element
        clearInterval(quizQuestion.countDownTimer);
        
        $(".card").hide();
        $(".final-page").hide();
        $(".timer").hide();
        $(".timer").html("Time: 75")
        $(".highScore").hide();
        $(".question-display").hide();
        $("#button-display").hide();
        $(".highScorePage").show();
        $("#hsArray").show();
        

        console.log("completed highScore Page");

        //Assign boxValue to equal the submitted initials
        var boxValue = document.getElementById('userInput').value.toUpperCase().substring(0, 4); 
        if (boxValue == false){
            console.log("no value entered for initials:" + boxValue);
            boxValue = "***";
        };
        
        // Create object to hold high score data
        const scoreValues = {
            score: quizQuestion.counter,   // Time left on clock assigned to 
            initials: boxValue   //The variable hold the initials submitted by the user
        };

        const MAX_HIGH_SCORES = 5;

        console.log(scoreValues);
        //Create array to store high scores
        const highScoresArray = JSON.parse(localStorage.getItem("highScoresArray")) || [];
        console.log(highScoresArray);

        //add new score to highScoreArray
        highScoresArray.push(scoreValues);
        console.log(highScoresArray);

        //sort scores high to low
        highScoresArray.sort((a, b) => b.score - a.score);
        console.log(highScoresArray);

        // Narrow to top 5 scores
        highScoresArray.splice(5);

        //Update local storage with revised highScoresArray
        localStorage.setItem('highScoresArray', JSON.stringify(highScoresArray));
        console.log(highScoresArray);

        // Create the list
        const highScoresList = document.getElementById("#hsArray");
        const highScores = JSON.parse(localStorage.getItem("highScoresArray")) || [];

            // Use .map to sort out initials and score from the highScoresArray
            highScoresArray.map(scoreValues => {
                if(scoreValues.score !=0){
                console.log(scoreValues.initials + " --- " + scoreValues.score);
                $("#hsArray").append('<li>' + scoreValues.initials + " --- " + scoreValues.score + '</li>');
                }
            });
    }
}


