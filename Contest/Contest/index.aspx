<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" EnableViewState="false" Inherits="Contest.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
     <script src="https:http://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.min.js"></script>
   
    <link type="text/css" rel="stylesheet" href="styles/styles.min.css" />
      <script src="scripts/FBIntegration.js"></script>
    <style>
        label.error
        {
           display:block;
           color:red;
           font-style:italic;
           font-size:10px;
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

    <table style="width:100%;" cellspacing="0" cellpadding="0" >
        <colgroup>
            <col width="0px" />
            <col />
            <col width="0px" />
        </colgroup>
       <%-- <tr>
            <td></td>
            <td>
                <div id="dvHeader" style="background-color: white; overflow: hidden;position:relative;top:2px; ">
                    <div id="dvLeftLogo"></div>
                    <div id="dvRightLogo"></div>

                </div>
            </td>
            <td></td>


        </tr>--%>
        <tr>
            <td></td>
            <td style="height:400px;">
                <div id="dvLogIn">
                    <div id="dvProfilePic" ></div>
                  <%--<div style="margin-bottom: 10px;text-align:center">Welcome <span id="dvUserName">user</span>.<br /> Please provide following information.</div>--%>
                   
                     <form id="signupForm" runat="server">
                          <input type="text" class="loginInput" name="txtCustomerId" id="txtCustomerId" />
                          <input type="number" class="loginInput" name="txtPhone" id="txtPhone" />
                          <input type="email" class="loginInput" name="txtEmail"  id="txtEmail" />
               <span class="button" id="spanQuiz" onclick="showRules();"></span>
                       
</form>


                </div>


                 <div id="dvRules">
            
            <div style="text-align: center"><span id="spanStart" onclick="startGame();"></span></div>

        </div>

                 <div id="dvContainer">
           
                <div id="dvResult">0</div>
                <div id="dvTimer">01:00</div>

         

                 <div id="txtQuestion">Question 1</div>
           
                    <div id="dvOpt1" class="dvOption">
                        <input name="ans" index="0" type="radio" />
                        <span id="ans1">Answer 1</span>
                    </div>
                     <div id="dvOpt2" class="dvOption">
                        <input name="ans" index="1" type="radio" />
                        <span id="ans2">Answer 1</span>
                    </div>
                    <div id="dvOpt3" class="dvOption">
                        <input name="ans" index="2" type="radio" />
                        <span id="ans3">Answer 1</span>
                    </div>
                     <div id="dvOpt4" class="dvOption">
                        <input name="ans" index="3" type="radio" />
                        <span id="ans4">Answer 1</span>
                    </div>
               
                <span  id="btnNext"></span>
                </div>
                  
        <div id="dvSubmit">
             <div id="dvScoreMsg" style="text-align: center"></div>
            <div style="text-align: center; display:none "><span style="display:none" class="button" onclick="sendRequest()" id="btnInvite">Invite your friends</span></div>
            
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
  
    </div>
    <script>
        /*
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

        */
        //$('#txtCustomerId').watermark('Customer ID');
        //$('#txtPhone').watermark('Phone');
        //$('#txtEmail').watermark('Email');


    </script>
</body>
</html>
