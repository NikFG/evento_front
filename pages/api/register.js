import fetch from "node-fetch";

const sleep = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 350);
});

export default async function handler(req, res) {
    const {body, method} = req;


    const {email, captcha} = body;

    if (method === "POST") {
        if (!email || !captcha) {
            return res.status(422).json({
                message: "Unproccesable request, please provide the required fields",
            });
        }

        try {
            const response = await fetch(
                `https://hcaptcha.com/siteverify`,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                    },
                    body: `response=${captcha}&secret=${process.env.HCAPTCHA_SECRET}`,
                    method: "POST",
                }
            );
            const captchaValidation = await response.json();
            if (captchaValidation.success) {
                await sleep();
                return res.status(200).send("OK");
            }

            return res.status(422).json({
                message: "Unproccesable request, Invalid captcha code",
            });
        } catch (error) {
            console.log(error);
            return res.status(422).json({message: "Something went wrong"});
        }
    }
    return res.status(404).send("Not found");
}
