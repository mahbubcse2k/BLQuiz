using Contest.DAL;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Contest
{
    public partial class Index : System.Web.UI.Page
    {

        [WebMethod]
        public static string AddResult(string result)
        {
           byte[] data = Convert.FromBase64String(result);
           string decodedString = Encoding.UTF8.GetString(data);
           var list = DataMapper.AddResult(JsonConvert.DeserializeObject<ResultInfo>(decodedString));
           return EncodeTo64(JsonConvert.SerializeObject(list));
        }

       
        public static JObject GetSignedRequestJsonObject()
        {
            string storedSignedRequest = HttpContext.Current.Request["signed_request"];
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


         

           try
           {
              JObject signedRequestJsonObject = GetSignedRequestJsonObject();
              if (signedRequestJsonObject["page"] != null)
              {
                  if ((bool)signedRequestJsonObject.SelectToken("page.liked"))
                  {

                      string userId = "";

                     try
                     {
                         userId = (string)signedRequestJsonObject.SelectToken("user_id");

                     }
                     catch
                     {

                     }

                    dvLiked.Visible = true;
                    dvNotLiked.Visible = false;
                    var list = DataMapper.GetQuestions(userId);
                      while(list.Count==0)
                      {
                          Thread.Sleep(60 * 1000);
                          list = DataMapper.GetQuestions(userId);
                      }


                    hdInfo.Value = EncodeTo64(JsonConvert.SerializeObject(list));
                   }
                   else
                   {
                       dvLiked.Visible = false;
                       dvNotLiked.Visible = true;
                   }

               }
               else
               {
                   base.Response.Redirect("redirect.html");
               }
           }
           catch
           {
           }

           
           
        }


        static public string EncodeTo64(string toEncode)
        {
          
            byte[] toEncodeAsBytes

                  = Encoding.UTF8.GetBytes(toEncode);

            string returnValue

                  = System.Convert.ToBase64String(toEncodeAsBytes);

            return returnValue;

        }

    }
}