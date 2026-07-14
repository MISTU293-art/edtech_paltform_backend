import Mailgen from "mailgen";

const mailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "nexEnginner",
        link: "https://nexenginner.in"
    }
});

const mailTemplate = (name, verificationLink) => {

    const email = {
        body: {
            name: name,
            intro: "Welcome to nexEnginner! We're very excited to have you on board.",
            action: {
                instructions: "Please verify your account by clicking the button below:",
                button: {
                    color: "#22BC66",
                    text: "Verify Account",
                    link: verificationLink
                }
            },
            outro: "If you did not create this account, please ignore this email."
        }
    };

    const html = mailGenerator.generate(email);
    const text = mailGenerator.generatePlaintext(email);

    return {
        html,
        text
    };
};

export default mailTemplate;