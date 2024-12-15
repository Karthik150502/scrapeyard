import { ExecutionEnvironment } from "@/types/executor";
import { extractDataWithAiTask } from "../task/extractDataWithAi";
import prisma from "@/lib/prisma";
import { symmetricDecryption } from "@/lib/encryption";
import OpenAI from "openai";
import { extractWholePageDataTask } from "../task/extractWholePageDataWithAI";
export async function extractWholePageDataWithAiExecutor(
    environment: ExecutionEnvironment<typeof extractWholePageDataTask>
): Promise<boolean> {
    try {
        const credentials = environment.getInput("Credentials");
        if (!credentials) {
            environment.log.error("Input -> credentials is not defined.")
        }
        const content = environment.getInput("Content");
        if (!content) {
            environment.log.error("Input -> Content is not defined.")
        }

        // Get credentials from database;
        const cred = await prisma.credential.findUnique({
            where: {
                id: credentials
            }
        })
        if (!cred) {
            environment.log.error("Credential not found");
            return false;
        }

        const plainCredentialValue = await symmetricDecryption(cred.value);
        if (!plainCredentialValue) {
            environment.log.error("Cannot decrypt credential.")
        }
        const openai = new OpenAI({
            apiKey: plainCredentialValue
        })
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a webscrapper helper that extracts data from HTML pages. You will be given a piece of HTML as text.  The response should always be only the extracted data as a stringified JSON object, strictly without any additional words or explaination. Analyze the HTML page carefully. Work only with provided content and ensure the output is always a valid stringified JSON without any surrounding texts.
                    The output format be similar to that of a HTML pages hierarchy., each element in HTML should correspond to a piece os json object such as 
                    {
                        selector:"<The element's HTML selector>",
                        content:"<The text content inside the element>",
                        children:?[]
                    },
                    return the whole HTML page as a single stringified JSON object. If the HTML page text is invalid return n empty JSON. 
                    `
                },
                {
                    role: "user",
                    content
                },
            ],
            temperature: 1, // It tells the model to respond with a balanced mix of creativity and predictability.
        })
        environment.log.info(`Prompt tokens utilized: ${response.usage?.prompt_tokens}`);
        environment.log.info(`Completion tokens utilized: ${response.usage?.completion_tokens}`);
        const result = response.choices[0].message.content;
        if (!result) {
            environment.log.error("Empty response from the AI");
            return false;
        }
        environment.setOutput("Extracted Data", result);
        return true;
    } catch (e: any) {
        environment.log.error(e.message);
        return false;
    }
}


