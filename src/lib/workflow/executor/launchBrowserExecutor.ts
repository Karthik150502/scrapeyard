import { ExecutionEnvironment } from "@/types/executor";
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
            headless: true, //It "opens up" a chromium browser for us instantly. 
            //args: ["--proxy-server=brd.superproxy.io:33335"], //TLDR: To rotate IPs on each scrape session to aviod bot detection.
        })
        environment.setBrowser(browser);
        const page = await browser.newPage();
        //  // Uncomment lines below if using IP rotation.
        // await page.authenticate({
        //     username: "brd-customer-hl_de2c6ac1-zone-scrapeyard",
        //     password: "chbx49jxfr3w"
        // })
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