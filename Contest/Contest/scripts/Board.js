
          String.prototype.format = function() {
              var formatted = this;
              for( var arg in arguments ) {
                  formatted = formatted.replace("{" + arg + "}", arguments[arg]);
              }
              return formatted;
          };

             

$("#dvContainer").timer({
    autostart: false,
    repeat: 61,
    callback: function (index) {
        var time = 60-index;
        if (time < 0) {
            onNext(true);
            return;
        }
        var timeStr = time > 9 ? time.toString() : "0" + time;
        $("#dvTimer").text(" Remaining Time: 00:" + timeStr);
                      
    }
});
      


function Question(text,options,answer)
{
    this.Text = text;
    this.Options = options;
    this.answer = answer;

}

function Option(text,value)
{
    this.Text = text;
    this.Value = value;
}

function Board(questionList)
{
    this.QuestionList = questionList;
    this.currentQuestionIndex = 0;
    this.CorrectAnswerCount = 0;
}
/*
var options = new Array();
options[0] = new Option("Misisipi", 1);
options[1] = new Option("Nile", 2)
options[2] = new Option("Tigris", 3)
options[3] = new Option("Yangsikiang", 4)

var questionList = new Array();
questionList[0] = new Question("Which is the Largest river in Asia?", options, 4);


options = new Array();
options[0] = new Option("Dhaka", 1);
options[1] = new Option("Tokoyo", 2)
options[2] = new Option("Mumbai", 3)
options[3] = new Option("Khulna", 4)
questionList[1] = new Question("Which is the capital of Bangladesh?", options, 1);


options = new Array();
options[0] = new Option("Ghandi", 1);
options[1] = new Option("Obama", 2)
options[2] = new Option("Zia", 3)
options[3] = new Option("Ershad", 4)
questionList[2] = new Question("Who is the president of USA?", options, 2);

options = new Array();
options[0] = new Option("58", 1);
options[1] = new Option("85", 2)
options[2] = new Option("13", 3)
options[3] = new Option("3", 4)
questionList[3] = new Question("5+8=", options, 3);


options = new Array();
options[0] = new Option("Burz al khalifa", 1);
options[1] = new Option("Empire states", 2)
options[2] = new Option("Dhaka Bank", 3)
options[3] = new Option("White House", 4)
questionList[4] = new Question("Tallest tower on earth:", options, 1);
*/

var board = null;

function poulateQuestion(index)
{
    var question = board.QuestionList[index];
    $("input:checked").prop("checked", false);
    $(".selected").removeClass("selected");
    $("#txtQuestion").text("Q{0}. {1}".format(index+1, question.Text));
    $("#ans1").text(question.Options[0].Text);
    $("#ans2").text(question.Options[1].Text);
    $("#ans3").text(question.Options[2].Text);
    $("#ans4").text(question.Options[3].Text);
            
   
}


function submit()
{
    $("#dvContainer").timer('stop');
    $("#dvContainer").hide();
    $("#dvSubmit").show();

    score = board.CorrectAnswerCount * 10;
    $("#dvScoreMsg").text("Congratulation!! Your have scored: {0}".format(score));
    saveResult();
    share();
}

function onNext(forceSubmit)
{
   
    var pending = board.QuestionList.length - board.currentQuestionIndex - 1;
   

                
    var currentQuestion = board.QuestionList[board.currentQuestionIndex];
    var userChecked = $("input:checked");
    var userAnswer = 0;
    if (userChecked.length > 0) {
        userAnswer =parseInt(userChecked.attr("index")) + 1;
    }
    if(userAnswer == currentQuestion.answer)
    {
        board.CorrectAnswerCount++;
                
    }

    if (pending == 0 || forceSubmit) {
        submit();
    }

    else  {
        board.currentQuestionIndex++;
        updateResult();
        poulateQuestion(board.currentQuestionIndex);
                
        if (pending==1)
        {
            $("#btnNext").text("Submit");
                    
        }
    }
  
           
}

var score = 0;

function updateResult() {
    $("#dvResult").text("Your Score: {0}".format(board.CorrectAnswerCount*10));

}
        
function showRules()
{
    $("#dvLogIn").hide();
    $("#dvRules").show();
    getInfo();
}

function startGame() {
    $("#dvRules").hide();
    $("#dvContainer").show();
    poulateQuestion(0);
    $("#dvContainer").timer('start');
    $("#dvOptions").find("div").click(function fn() {
        $(".selected").removeClass("selected");
        $(this).addClass("selected").find("input").prop("checked", true);
    });
    $("#btnNext").click(function () { onNext(false); });
}
  


function saveResult() {
    var result = new Object();
    result.UserId = userId;
    result.CustomerId = $('#txtCustomerId').val();
    result.Phone = $('#txtPhone').val();
    result.Email = $('#txtEmail').val();
    result.Score = score;
    
    var str = JSON.stringify(result);

    var dataObj = JSON.stringify({ result: str });


    $.ajax({
        type: "POST",
        url: "Index.aspx/AddResult",
        data: dataObj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
           
        }
    });
}


function getInfo() {
   

            var data = $("#dvInfo").text();
            var questionList = new Array();
            var list = JSON.parse(data);
            for (var i = 0; i < list.length; i++)
            {
                var question = list[i];
                var options = new Array();
                for (var j = 0; j < question.Options.length; j++)
                {
                    options[j] = new Option(question.Options[j], j+1);
                }

                questionList[i] = new Question(question.Text, options, question.Answer);

            }
            board = new Board(questionList);
      
}

