# 🎓 Agentic AI Chatbot for College Automation

A smart, AI-powered assistant built with **Next.js**, **Groq AI API**, **TypeScript**, **Tailwind CSS**, and **MySQL**, designed to help students seamlessly check their attendance and access timetables via natural language conversations.

---

## 🚀 Features

- 🤖 **Conversational Interface** – Ask your queries naturally and get smart responses.
- 🎯 **Attendance Checker Tool** – Securely fetches attendance from the MySQL database using the roll number.
- 🗓️ **Timetable Fetcher Tool** – Retrieves the correct timetable based on the user's year and department.
- ⚡ **Fast & Scalable** – Built with Groq API for ultra-fast inference and Next.js for SSR performance.
- 💅 **Modern UI** – Clean, responsive UI built using Tailwind CSS.

---

## 🛠️ Tech Stack

| Technology    | Role                              |
|--------------|-----------------------------------|
| Next.js      | Fullstack React Framework         |
| TypeScript   | Type Safety                        |
| Tailwind CSS | Styling                            |
| Groq AI API  | LLM-based Natural Language Engine  |
| MySQL        | Data storage for attendance, etc. |

---

## ⚙️ How It Works

1. **User Interaction**  
   The user opens the chatbot and asks a question like:  
   _"Check my attendance"_

2. **AI Responds**  
   The LLM understands the intent and replies:  
   _"Please provide your roll number to proceed."_

3. **User Input**  
   The user provides their roll number.

4. **Tool Invocation (Backend)**  
   The backend uses a custom tool called `get_attendance(roll_no)` to query the MySQL DB.

5. **Response Delivery**  
   The chatbot returns the exact attendance percentage to the user.

### 🧠 Tool: `get_attendance(roll_no: string)`

- **Description:** Fetches the attendance from the database using the roll number.
- **Returns:** JSON with attendance percentage or appropriate error message.

### 📘 Tool: `get_timetable(year: string, department: string)`

- **Description:** Retrieves the correct timetable from the database.
- **Returns:** JSON containing the full weekly timetable.

---

## 🖼️ Screenshots & Outputs

![Screenshot from 2025-04-10 17-13-45](https://github.com/user-attachments/assets/4ffd4dc0-33c6-4264-852f-bcd97d59e469)


![Screenshot from 2025-04-10 17-14-03](https://github.com/user-attachments/assets/08bb04ef-b06a-4ce4-bb58-698d73e2a516)


![Screenshot from 2025-04-10 17-14-09](https://github.com/user-attachments/assets/a79e33fc-9eab-4b88-8f79-84db26d65d78)












      
