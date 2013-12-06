namespace Contest.DAL
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Web.Configuration;

    public class DataMapper
    {
        private static string connectionString = WebConfigurationManager.AppSettings["connectionString"].ToString();

        public static List<Standing> AddResult(ResultInfo info)
        {

            List<Standing> list= new List<Standing>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command2 = new SqlCommand("AddResult", connection) {
                    CommandType = CommandType.StoredProcedure
                };
                using (SqlCommand command = command2)
                {
                    connection.Open();
                    command.Parameters.Add(new SqlParameter("@UserId", info.UserId));
                    command.Parameters.Add(new SqlParameter("@CustomerId", info.CustomerId));
                    command.Parameters.Add(new SqlParameter("@Score", info.Score));
                    command.Parameters.Add(new SqlParameter("@Phone", info.Phone));
                    command.Parameters.Add(new SqlParameter("@Email", info.Email));
                    command.Parameters.Add(new SqlParameter("@UserName", info.UserName));
                    command.Parameters.Add(new SqlParameter("@Time", info.Time));
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Standing item = new Standing
                            {
                                Name = reader["name"].ToString(),
                                Score = Convert.ToInt32(reader["score"]),
                            };
                          
                            list.Add(item);
                        }
                    }
                }
            }

            return list;
        }

        public static List<Question> GetQuestions(string userId)
        {
            List<Question> list = new List<Question>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command2 = new SqlCommand("GetQuestions", connection) {
                    CommandType = CommandType.StoredProcedure
                };
                using (SqlCommand command = command2)
                {
                    connection.Open();
                    command.Parameters.Add(new SqlParameter("@UserId", userId));
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Question item = new Question {
                                Text = reader["Text"].ToString(),
                                Answer = Convert.ToInt32(reader["Ans"]),
                                Options = new List<string>()
                            };
                            item.Options.Add(reader["Op1"].ToString());
                            item.Options.Add(reader["Op2"].ToString());
                            item.Options.Add(reader["Op3"].ToString());
                            item.Options.Add(reader["Op4"].ToString());
                            list.Add(item);
                        }
                    }
                    return list;
                }
            }
        }
    }
}


