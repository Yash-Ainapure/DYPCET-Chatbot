import { HumanloopStream } from '@/lib/humanloop-stream'
import { OpenAIStream, StreamingTextResponse } from "ai";
import { HumanloopClient } from 'humanloop'
import Groq from "groq-sdk";

export const runtime = 'nodejs';


import mysql from "mysql2/promise";
// export const runtime = 'edge'

const HUMANLOOP_API_KEY = process.env.GROQ_API_KEY

const groq = new Groq({ apiKey: "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" });

const client = new HumanloopClient({
  apiKey: HUMANLOOP_API_KEY || ''
})

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'collegedb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function get_attendance({ roll_number }: any) {
  console.log("parameters: " + roll_number)
  try {
    const [rows]: any = await db.execute("SELECT attendance_percentage FROM students WHERE id = ?", [roll_number]);
    if (rows.length > 0) {
      console.log("tool response: " + rows[0].attendance_percentage)
      return `Your attendance is ${rows[0].attendance_percentage}%.`;
    } else {
      return "Roll number not found. Please check and try again.";
    }
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return "Error retrieving attendance. Please try again later.";
  }
}

// Function to fetch timetable by year and department
async function get_timetable({ year, branch }: any) {

  console.log("parameters: " + year + "  " + branch)
  try {
    const [rows]: any = await db.execute(
      "SELECT day, time_slot, subject FROM timetable WHERE year = ? AND branch = ? ORDER BY FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'), time_slot",
      [year, branch]
    );

    if (rows.length > 0) {
      let timetableText = `Here is the timetable for ${year} year, ${branch} branch:\n\n`;
      let currentDay = "";

      rows.forEach(({ day, time_slot, subject }: any) => {
        if (day !== currentDay) {
          timetableText += `📅 ${day}:\n`;
          currentDay = day;
        }
        timetableText += `  ⏰ ${time_slot} - ${subject}\n`;
      });

      console.log("tool respose: " + timetableText)
      return timetableText;
    } else {
      return "Timetable not found for the given year and branch.";
    }
  } catch (error) {
    console.error("Error fetching timetable:", error);
    return "Error retrieving timetable. Please try again later.";
  }
}

const tools = [
  {
    type: "function" as const,
    function: {
      name: "get_attendance",
      description: "Fetch student attendance based on roll number.",
      parameters: {
        type: "object",
        properties: {
          roll_number: {
            type: "string",
            description: "The student's roll number."
          }
        },
        required: ["roll_number"]
      }
    }
  },
  {
    type: "function" as const,
    function: {
      name: "get_timetable",
      description: "Fetch the class timetable based on year and branch.",
      parameters: {
        type: "object",
        properties: {
          year: {
            type: "int",
            description: "The academic year (e.g., 1,2,3)."
          },
          branch: {
            type: "string",
            description: "The branch name (e.g., CSE,MECH,CIVIL)."
          }
        },
        required: ["year", "branch"]
      }
    }
  }
];


const systemMessage = {
  role: "system",
  content: ` You are DYPCET AI Assistant, a helpful, polite, and knowledgeable virtual assistant for Dr. D. Y. Patil College of Engineering & Technology (DYPCET).
    Your job is to assist students by providing accurate and relevant information about the college.
    You have access to certain tools to fetch student-specific data such as attendance and class timetable.

🧠 Personality & Behavior Guidelines

    Always be polite, respectful, and professional.

    Maintain a friendly and approachable tone, suitable for interacting with college students.

    If a user asks for personal data like attendance or timetable, guide them to provide the required info (e.g., roll number, department, year).

    If a tool call is needed, extract the required information clearly and use the appropriate tool.

    If the user input is unclear, ask clarifying questions before using any tool.

    Avoid making up answers—use tool results wherever applicable.

    If a question is unrelated to the college or your capabilities, politely decline to answer and guide the user accordingly.

    Do not share or assume private data unless explicitly provided by the user.

    Stay concise, but helpful.

    Try to strictly generate the response in proper markdown format so that it would render properly on frontend UI.
    you can decide the markdown style/design according to the scenario such as generating table,bold heading,etc.
    Try to make the chat interactive with adding some imojis and icons as you want.

🛠️ Available Tools

You have access to the following tools:

    get_attendance
    Use this to fetch a student’s attendance by roll number.
    Required: roll_number (string)

    get_timetable
    Use this to fetch the class timetable based on the academic year and department.
    Required: year (int) and branch (string)
    example format: year:{1,2,3,4} branch:{CSE,MECH,CIVIL,AIML} the parameters should be strictly in this format.

💬 Example User Inputs and Expected Behavior

    User: “What’s my attendance?”
    You: “Sure! Could you please share your roll number so I can check your attendance?”

    User: “Can you show me the timetable for Second year Computer Science?”
    You: [Call get_timetable with year="2", department="CSE"]

`,
};



// also try to respond in proper html format so that the response would render on frontend properly
// such as if you are responding a time table,you can create a html table UI suitable for a dark Unser Interface.
// when returning html try to be as creative as possible in generating attractive html UI.

const availableFunctions: Record<string, Function> = {
  get_attendance,
  get_timetable,
};


export async function POST(req: Request) {

  const { messages } = await req.json()

  const updatedMessages = [systemMessage, ...messages];

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: updatedMessages,
    tools: tools,
    tool_choice: "auto",
    max_tokens: 4096,
  });

  const responseMessage = response.choices[0].message
  const toolCalls = responseMessage.tool_calls;
  console.log("First LLM Call (Tool Use) Response:", responseMessage)

  if (toolCalls && toolCalls.length > 0) {
    // Add assistant's tool call message
    updatedMessages.push({
      role: "assistant",
      tool_calls: toolCalls.map((toolCall) => ({
        id: toolCall.id,
        function: {
          name: toolCall.function.name,
          arguments: toolCall.function.arguments,
        },
        type: toolCall.type,
      })),
    });

    // Call each tool and push results
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const func = availableFunctions[functionName];
      if (!func) continue;

      const functionArgs = JSON.parse(toolCall.function.arguments);
      const functionResponse = await func(functionArgs);

      updatedMessages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        name: functionName,
        content: functionResponse,
      });
    }

    // Final call to let the LLM incorporate the function results
    const secondResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: updatedMessages,
    });

    console.log("Second LLM Call Response:", secondResponse.choices[0].message);

    const functionObj = { ...secondResponse.choices[0].message, role: "function", tool_used: toolCalls[0].function.name }

    return new Response(
      JSON.stringify({ message: functionObj }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  // If no tool calls, just return original response
  return new Response(
    JSON.stringify({ message: responseMessage }),
    { headers: { "Content-Type": "application/json" } }
  );





  // IMP: stream code response code
  // const stream = new ReadableStream({
  //   async start(controller) {
  //     for await (const chunk of response) {
  //       const content = chunk.choices?.[0]?.delta?.content;
  //       if (content) {
  //         controller.enqueue(new TextEncoder().encode(content));
  //       }
  //     }
  //     controller.close();
  //   },
  // });
  // return new StreamingTextResponse(stream);
}


