import { ExecutionEnvironment } from "@/types/executor";
import * as cheerio from "cheerio";
import { ExtractTextFromElement } from "../task/extractTextFromElement";

export async function extractTextFromElementExecutor(
    environment: ExecutionEnvironment<typeof ExtractTextFromElement>
): Promise<boolean> {

    try {
        const selector = environment.getInput("Selector");
        if (!selector) {
            environment.log.error("Selector not defined.")
            return false;
        }
        const html = environment.getInput("Html");
        if (!html) {
            environment.log.error("HTML not defined.")
            return false;
        }


        const $ = cheerio.load(html);
        const element = $(selector);

        if (!element) {
            environment.log.error("Element not found");
            return false;
        }

        const extractedText = $.text(element);
        if (!extractedText) {
            environment.log.error("Element has no text.");
            return false;
        }


        environment.setOutput('Extracted Text', extractedText)


        return true;
    } catch (e: any) {
        environment.log.error(e.message);
        return false;
    }
}