using Contest.DAL;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Contest
{
    public partial class Index : System.Web.UI.Page
    {

        [WebMethod]
        public static void AddResult(string result)
        {
            DataMapper.AddResult(JsonConvert.DeserializeObject<ResultInfo>(result));
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
                        dvLiked.Visible = true;
                        dvNotLiked.Visible = false;
                        dvInfo.InnerText = JsonConvert.SerializeObject(DataMapper.GetQuestions());
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

    }
}