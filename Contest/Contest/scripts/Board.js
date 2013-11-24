
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
    result.UserName = $("#dvUserName").text();
    result.CustomerId = $('#txtCustomerId').val();
    result.Phone = $('#txtPhone').val();
    result.Email = $('#txtEmail').val();
    result.Score = score;
    result.Time = 60 - parseInt(time);
    
    var str = json.stringify(result);

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
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    stringify: function (input) {
        input = JSON.stringify(input);
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = json._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            json._keyStr.charAt(enc1) + json._keyStr.charAt(enc2) +
            json._keyStr.charAt(enc3) + json._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    parse: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = json._keyStr.indexOf(input.charAt(i++));
            enc2 = json._keyStr.indexOf(input.charAt(i++));
            enc3 = json._keyStr.indexOf(input.charAt(i++));
            enc4 = json._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = json._utf8_decode(output);
        return JSON.parse(output);
       

    },
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }
        return string;
    }

}
