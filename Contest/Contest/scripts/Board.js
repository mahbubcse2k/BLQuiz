
          String.prototype.format = function() {
              var formatted = this;
              for( var arg in arguments ) {
                  formatted = formatted.replace("{" + arg + "}", arguments[arg]);
              }
              return formatted;
          };

             
          var time;
$("#dvContainer").timer({
    autostart: false,
    repeat: 61,
    callback: function (index) {
         time = 60-index;
         if (time < 0) {
             time = 0;
            onNext(true);
           
            return;
        }
        var timeStr = time > 9 ? time.toString() : "0" + time;
        $("#dvTimer").text("00:" + timeStr);
                      
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

function showTopList()
{
    $('#resultTemplate').tmpl(standing).appendTo("#dvPoint");
   
        $("#dvSubmit").hide();
        $("#dvList").show();
   
}



function validateForm()
{
    
    $('#dvError').text('');

    var z = $('#txtCustomerId').val();
    z = $.trim(z);
    if (z == '')
    {
        $('#dvError').text('Please provide a your Customer Id.');
        return false;
    }




    var y = $('#txtPhone').val();
    y= $.trim(y);
    if (y.indexOf('+') == 0)
    {
        y = y.split('+')[1];
    }
    if (isNaN(y)||y=='') {
        $('#dvError').text('Please provide a valid phone number.');
        return false;
    }
   

  
        var x = $('#txtEmail').val();
        var atpos = x.indexOf("@");
        var dotpos = x.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
            $('#dvError').text('Please provide a valid email address.');
           
            return false;
        }
        $('#dvError').text('');
        showRules();
   
}




function submit()
{
    $("#dvContainer").timer('stop');
    $("#dvContainer").hide();
    $("#dvSubmit").show();

    score = board.CorrectAnswerCount * 10;
    $("#dvScoreMsg").text("{0}".format(score));
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
                
       
    }
  
           
}

var score = 0;

function updateResult() {
    $("#dvResult").text("{0}".format(board.CorrectAnswerCount*10));

}
        
function showRules()
{
    $("#dvLogIn").hide();
    $("#dvRules").show();
   
}

function startGame() {
    $("#dvRules").hide();
    $("#dvContainer").show();
    poulateQuestion(0);
    $("#dvContainer").timer('start');
    $(".dvOption ").click(function fn() {
        $(".selected").removeClass("selected");
        $(this).addClass("selected").find("input").prop("checked", true);
    });
    $("#btnNext").click(function () { onNext(false); });
}
  
var standing = null;

function saveResult() {
    var result = new Object();
    result.UserId = userId;
    result.UserName = userName;
    result.CustomerId = $('#txtCustomerId').val();
    result.Phone = $('#txtPhone').val();
    result.Email = $('#txtEmail').val();
    result.Score = score;
    result.Time = 60 - parseInt(time);
    result.Token = $("#Hidden1").val();
    
    var str = json.stringify(result);

    var dataObj = JSON.stringify({ result: str });


    $.ajax({
        type: "POST",
        url: "Index.aspx/AddResult",
        data: dataObj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
           
            setTimeout(sendRequest, 1000);
            standing = json.parse(msg.d);
        },
        error: function (msg)
        {
           // alert(msg);
        }
    });
}


function getInfo() {
   

    var data = $("#hdInfo").val();
               var questionList = new Array();
            var list = json.parse(data);
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
var json = {
    stringify: function (input) {
        return btoa(JSON.stringify(input));
    },
    parse: function (s) {
        return JSON.parse(atob(s));
    }

}
