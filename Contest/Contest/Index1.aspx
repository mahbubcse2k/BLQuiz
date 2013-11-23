<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index1.aspx.cs" Inherits="Contest.Index1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="scripts/FBIntegration.js"></script>
    <link type="text/css" rel="stylesheet" href="styles/styles.css" />
     
</head>
<body>
    <form id="form1" runat="server"></form>
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
                    <div id="dvProfilePic" style="height:50px;"></div>
                    <div style="margin-bottom: 20px">Welcome <span id="dvUserName">user</span>.<br /> Please provide following information.</div>
                    <table>
                        <tr>
                            <td>Customer ID</td>
                            <td>
                                <input type="text" id="txtCustomerId" />
                            </td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>
                                <input type="text" id="txtPhone" />
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>
                                <input type="text" id="txtEmail" />
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td style="padding-left:4px;"> <span class="button" onclick="showRules();">Enter Quiz</span></td>
                        </tr>
                    </table>



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
             <div id="dvScoreMsg" style="text-align: center"><span class="button" id="btnInvite">Invite Friends</span></div>
            <div style="text-align: center"><span class="button" onclick="sendRequest()" id="btnInvite">Invite Friends</span></div>
            
        </div>

            </td>
            <td></td>


        </tr>

    </table>
  
  
    <script src="scripts/jquery.plugin.min.js"></script>
    <script src="scripts/jquery.timer.min.js"></script>
    <script src="scripts/Board.min.js"></script>
    <script>
       

    </script>




</body>
</html>
