function init() {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '1412746732291492',                        // App ID from the app dashboard
            status: true,                                 // Check Facebook Login status
            xfbml: true,                                 // Look for social plugins on the page
            oauth  : true,
            channelUrl: '//shanta.fwd.wf/channel.html'
        });
       
        FB.getLoginStatus(fbLoginStatus);
        //FB.Event.subscribe('auth.authResponseChange', fbLoginStatus);
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
        $("#dvProfilePic").css('background-image', 'url(http://graph.facebook.com/{0}/picture?type=large)'.format(userId));
       
        $("#dvLogIn").show();
        getInfo();
    });
    FB.Canvas.setSize({ height: 418 });
}

function share() {

    var params = {};
    params['name'] = '{0} played Banglalion Quiz Master to win special gifts!'.format(userName);
    params['description'] = 'Banglalion Wimax is providing free gifts to lucky winners. ';
    params['link'] = 'https://www.facebook.com/Brand00717/app_1412746732291492';
   
    FB.api('/me/feed', 'post', params);
}


function sendRequest()
{
    FB.ui({
        method: 'apprequests',
        message: 'Hi, You can try it!!!'
    });
}