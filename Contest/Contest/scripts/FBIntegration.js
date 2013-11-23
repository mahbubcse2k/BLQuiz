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
    FB.api('me?fields=id,name,picture', function (response) {
        $("#dvUserName").text(response.name);
        $("#dvProfilePic").css('background-image', 'url({0})'.format(response.picture.data.url));
        userId = response.id;
        $("#dvLogIn").show();
    });
    FB.Canvas.setSize({ height: 500 });
}

function share() {

    var params = {};
    params['message'] = 'I have scored. You can try..';
    params['name'] = 'Play to Win!!!!';
    params['description'] = 'Description';
    params['link'] = 'https://www.facebook.com/shanta123sdsfdsfsfs/app_1412746732291492';
    params['caption'] = 'WIN WIN';
  //  FB.api('/me/feed', 'post', params);
}


function sendRequest()
{
    FB.ui({
        method: 'apprequests',
        message: 'Hi, You can try it!!!'
    });
}