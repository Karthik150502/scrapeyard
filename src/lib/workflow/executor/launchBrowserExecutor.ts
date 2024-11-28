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
            headless: true //It "opens up" a chromium browser for us instantly. 
        })
        environment.setBrowser(browser);
        const page = await browser.newPage();
        environment.log.info("Browser has been launched successfully.")
        await page.goto(websiteUrl);
        environment.setPage(page);
        environment.log.info(`Opened page at ${websiteUrl}`)
        return true;
    } catch (e: any) {
        environment.log.error(e.message);
        return false;
    }
}