namespace Contest
{
    using Newtonsoft.Json.Linq;
    using System;
    using System.Text;
    using System.Web;
    using System.Web.UI;
    using System.Web.UI.HtmlControls;

    public class Index : Page
    {
       

        public static JObject GetSignedRequestJsonObject()
        {
            string storedSignedRequest = StoredSignedRequest;
            if (string.IsNullOrEmpty(storedSignedRequest))
            {
                return null;
            }
            string str2 = storedSignedRequest.Split(new char[] { '.' })[1];
            UTF8Encoding encoding = new UTF8Encoding();
            string str3 = str2.Replace("=", string.Empty).Replace('-', '+').Replace('_', '/');
            byte[] bytes = Convert.FromBase64String(str3.PadRight(str3.Length + ((4 - (str3.Length % 4)) % 4), '='));
            return JObject.Parse(encoding.GetString(bytes));
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            JObject signedRequestJsonObject = GetSignedRequestJsonObject();
            if (signedRequestJsonObject["page"] != null)
            {
                if ((bool) signedRequestJsonObject.SelectToken("page.liked"))
                {
                    base.Server.Transfer("index1.aspx");
                }
            }
            else
            {
                base.Server.Transfer("redirect.html");
            }
        }

        public static string ReadCookie(string strCookieName)
        {
            foreach (string str in HttpContext.Current.Response.Cookies.AllKeys)
            {
                if (str == strCookieName)
                {
                    return HttpContext.Current.Response.Cookies[str].Value;
                }
            }
            foreach (string str2 in HttpContext.Current.Request.Cookies.AllKeys)
            {
                if (str2 == strCookieName)
                {
                    return HttpContext.Current.Request.Cookies[str2].Value;
                }
            }
            return null;
        }

        public static void WriteCookie(string strCookieName, string strCookieValue)
        {
            HttpCookie cookie = new HttpCookie(strCookieName, strCookieValue);
            HttpContext.Current.Response.Cookies.Set(cookie);
        }

        public static string StoredSignedRequest
        {
            get
            {
                string str = HttpContext.Current.Request["signed_request"];
                if (!string.IsNullOrEmpty(str))
                {
                    WriteCookie("fb-app-signed-request", str);
                    return str;
                }
                return ReadCookie("fb-app-signed-request");
            }
        }
    }
}

