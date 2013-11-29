function init() {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '1412746732291492',                        // App ID from the app dashboard
            status: true,                                 // Check Facebook Login status
            xfbml: true,                                 // Look for social plugins on the page
            oauth  : true,
            channelUrl: '//sorolayon.azurewebsites.net/channel.html'
        });
       
        FB.getLoginStatus(fbLoginStatus);
       
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=1412746732291492";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

}


function fbLoginStatus(response)
{
    if (response.status === 'connected') {
        checkPermission();
    }
    else {
        requestForLogIn();
    }
}

var userId = 0;
var userToken = '';
var userName = '';
function requestForLogIn() {
    FB.login(function (response) {
        if (response.authResponse) {
            userToken = response.authResponse.accessToken;
            checkPermission();
        }
    }, { scope: 'publish_stream' });
}


function checkPermission() {
    FB.api('/me/permissions', function (response) {
        var perms = response.data[0];
        if (perms.publish_stream) {
            showLogIn();
        } else {
            requestForLogIn();
        }
    });

}



function showLogIn() {
    FB.api('me?fields=id,name', function (response) {
        $("#dvUserName").text(response.name);
        userName = response.name;
        userId = response.id;
        $("#dvWelcome1").text('Welcome ' + userName+'.');

        $("#dvProfilePic").css('background-image', 'url(http://graph.facebook.com/{0}/picture?type=large)'.format(userId));
       
        $("#dvLogIn").show();
        getInfo();
    });
    FB.Canvas.setSize({ height: 418 });
}

function share() {

    var params = {};
    params['caption'] = '{0} scored {1}.'.format(userName,score);
    params['description'] = 'Banglalion Wimax is providing free gifts to lucky winners. ';
    params['link'] = 'https://apps.facebook.com/sorolayon/';
    FB.api('/me/feed', 'post', params);
}


function sendRequest()
{
    FB.ui({
        method: 'apprequests',
        message: 'Play to win special gifts!!'
    });
}