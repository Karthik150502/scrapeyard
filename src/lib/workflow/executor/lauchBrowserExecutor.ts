import { waitFor } from "@/lib/waitFor";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer"
import { LaunchBrowserTask } from "../task/launchBrowser";

export async function launchBrowserExecutor(
    environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {

    try {
        console.log("Env = ", JSON.stringify(environment, null));
        const websiteUrl = environment.getInput("Website URL");
        console.log("@@website url = ", websiteUrl)
        const browser = await puppeteer.launch({
            headless: false //It opens up a chromium browser for us instantly. 
        })
        await waitFor(3);
        await browser.close();
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}