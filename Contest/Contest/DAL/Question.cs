namespace Contest.DAL
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class Question
    {
        public int Answer { get; set; }

        public List<string> Options { get; set; }

        public string Text { get; set; }
    }
}

