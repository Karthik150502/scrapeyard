import { ExecutionEnvironment } from "@/types/executor";
import { DeliverViaWebhookTask } from "../task/deliverViaWebhook";
import axios from "axios";

export async function deliverViaWebhookExecutor(
    environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>
): Promise<boolean> {
    try {
        const targetUrl = environment.getInput("Target URL");
        if (!targetUrl) {
            environment.log.error("Input -> targetUrl is not defined.")
        }


        const body = environment.getInput("Body");
        if (!body) {
            environment.log.error("Input -> Body is not defined.")
        }
        try {
            const res = await axios.post(targetUrl, {
                body
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            environment.log.info(`Response: ${JSON.stringify(res.data, null, 4)}`);
            if (res.status !== 200) {
                environment.log.error(`Status code: ${res.status}`);
            }
        } catch (e) {
            environment.log.error(`Some error occured while sending out the data to the webhook: ${e instanceof Error ? e.message : JSON.stringify(e, null, 4)}`);
            return false;
        }
        return true;
    } catch (e: any) {
        environment.log.error(e.message);
        return false;
    }
}



// { "args": { }, "data": "{\"body\":\"“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”\"}", "files": { }, "form": { }, "headers": { "Accept": "application/json, text/plain, */*", "Accept-Encoding": "gzip, compress, deflate, br", "Content-Length": "130", "Content-Type": "application/json", "Host": "httpbin.org", "User-Agent": "axios/1.7.9", "X-Amzn-Trace-Id": "Root=1-675c8b92-2f838dc37ef3887c45bc594b" }, "json": { "body": "“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”" }, "origin": "152.58.193.237", "url": "https://httpbin.org/post" }