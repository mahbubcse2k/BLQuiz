<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" EnableViewState="false" Inherits="Contest.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
    
    <link type="text/css" rel="stylesheet" href="styles/styles.css" />
      <script src="scripts/FBIntegration.js"></script>
    <style>
        label.error
        {
           display:block;
           color:red;
           font-style:italic;
           font-size:10px;
        }
        #signupForm input{
            width:99%;
           
        }

        #signupForm td
        {
            vertical-align:top;
        }

        .watermark {
   color: #999;
}

    </style>
</head>


<body>
  
    <div id="dvLiked" runat="server">
       
    <div id="fb-root"></div>
    
    <script>
        init();
    </script>

    <table style="width:100%;border-top:4px solid #ffd503" cellspacing="0" cellpadding="0" >
        <colgroup>
            <col width="0px" />
            <col />
            <col width="0px" />
        </colgroup>
        <tr>
            <td></td>
            <td>
                <div id="dvHeader" style="background-color: white; overflow: hidden; ">
                    <div id="dvLeftLogo">LOGO1</div>
                    <div id="dvRightLogo">LOGO2</div>

                </div>
            </td>
            <td></td>


        </tr>
        <tr>
            <td></td>
            <td style="height:400px;background-color:#BFCCD4">
                <div id="dvLogIn">
                    <div id="dvProfilePic" ></div>
                    <div style="margin-bottom: 10px;text-align:center">Welcome <span id="dvUserName">user</span>.<br /> Please provide following information.</div>
                   
                     <form id="signupForm" runat="server">
                     <table style="width:100%">
                         <colgroup>
                            <%-- <col width="0px;"/>--%>
                             <col />
                         </colgroup>
                        <tr>
                           <%-- <td>Customer ID</td>--%>
                            <td>
                                <input type="text" name="txtCustomerId" id="txtCustomerId" />
                            </td>
                        </tr>
                        <tr>
                            <%--<td>Phone</td>--%>
                            <td>
                                <input type="number" name="txtPhone" id="txtPhone" />
                            </td>
                        </tr>
                        <tr>
                           <%-- <td>Email</td>--%>
                            <td>
                                <input type="email" name="txtEmail"  id="txtEmail" />
                            </td>
                        </tr>
                        <tr>
                            
                            <td style="text-align:center"> <span class="button" onclick="$('#signupForm').submit();">Enter Quiz</span></td>
                        </tr>
                    </table>
</form>


                </div>


                 <div id="dvRules">
            <div style="white-space: pre;height:200px;">
          Rule 1: You have to answer seven questions. 
          Rule 2: You will get maximum 60 seconds to answer all questions. 
          Rule 3: Each question will carry 10 marks. 
          Rule 4:


            </div>
            <div style="text-align: center"><span class="button" onclick="startGame();">Start</span></div>

        </div>

                 <div id="dvContainer">
            <div id="resultPanel">
                <div id="dvResult">Your Score: 0</div>
                <div id="dvTimer">Remaining Time: 01:00</div>

            </div>

            <div id="txtQuestion">Question 1</div>
            <div>
                <div id="dvOptions">
                    <div>
                        <input name="ans" index="0" type="radio" />
                        <span id="ans1">Answer 1</span>
                    </div>
                    <div>
                        <input name="ans" index="1" type="radio" />
                        <span id="ans2">Answer 1</span>
                    </div>
                    <div>
                        <input name="ans" index="2" type="radio" />
                        <span id="ans3">Answer 1</span>
                    </div>
                    <div>
                        <input name="ans" index="3" type="radio" />
                        <span id="ans4">Answer 1</span>
                    </div>
                </div>
                <div style="text-align: center"><span class="button" id="btnNext">Next</span></div>
                  </div>
        </div>
        <div id="dvSubmit">
             <div id="dvScoreMsg" style="text-align: center"></div>
            <div style="text-align: center"><span style="display:none" class="button" onclick="sendRequest()" id="btnInvite">Invite your friends</span></div>
            
        </div>

            </td>
            <td></td>


        </tr>

    </table>
  
  
    <script src="scripts/jquery.plugin.min.js"></script>
    <script src="scripts/jquery.timer.min.js"></script>
    <script src="scripts/Board.min.js"></script>
    <script src="scripts/jquery.watermark.min.js"></script>
     <input id="hdInfo" type="hidden" runat="server" />
  
</div>
    <div id="dvNotLiked" runat="server">
  <h1>  Like our page to continue..........   </h1>
    </div>
    <script>

        $("#signupForm").validate({
            submitHandler : function(form) {
                showRules();
            },

            rules: {
               
                txtCustomerId: {
                    required: true,
                    minlength: 4
                },
                txtPhone: {
                    required: true,
                    minlength: 5
                },
               
                txtEmail: {
                    required: true,
                    email: true
                }
            },
            messages: {
               
                txtCustomerId: {
                    required: "Please enter your CustomerId",
                    minlength: "Please enter a valid CustomerId"
                },
                txtPhone: {
                    required: "Please provide your number",
                    minlength: "Please provide a valid number",
                    number: "Please provide a valid number"
                },
               
                txtEmail:
                    {
                        required: "Please enter your email address",
                        email: "Please enter your email address"
                    }
               
            }
        });


        $('#txtCustomerId').watermark('Customer ID');
        $('#txtPhone').watermark('Phone');
        $('#txtEmail').watermark('Email');


    </script>
</body>
</html>
