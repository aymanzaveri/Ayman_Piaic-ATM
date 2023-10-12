import inquirer from "inquirer";
import chalk from "chalk";

import { IUser } from "interfaces";

export default async function ATM(User: IUser) {
    // console.clear();
    while (true) {

        async function Prompt_ATM() {
            const result: any = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action_type',
                    message: 'ATM Menu:',
                    choices: ['Check Balance', 'Withdraw', 'Deposit', 'Exit'],
                    filter: (val) => val.toUpperCase(),
                }
            ]);

            await ATM_Action(result.action_type);

        };

        await Prompt_ATM();
    }

    async function ATM_Action(Action: string = "DEPOSIT") {
        switch (Action) {
            case "EXIT":
                console.log("Thanks! for using me, have a good day.")
                process.exit(0);
                break;
            case "WITHDRAW":
                const { withdraw }: any = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'withdraw',
                        message: 'Amount : ',
                    }
                ]);

                if (withdraw > User.balance) {
                    console.log(chalk.red("Insufficient balance."));
                } else if ((withdraw > 0) && (withdraw <= User.balance)) {
                    User = { ...User, balance: User.balance - withdraw };
                    console.log(`${withdraw} has been withdraw from your account.`)
                    ATM_Action("");
                } else {
                    console.log(chalk.red("Error Occured! Please try again later."));
                }

                break;
            case "DEPOSIT":
                const { deposit }: any = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'deposit',
                        message: 'Amount : ',
                    }
                ]);

                if ((deposit > 0)) {
                    User = { ...User, balance: User.balance + deposit };
                    console.log(`${deposit} has been deposited in your account.`)
                    ATM_Action("");
                } else {
                    console.log(chalk.red("Error Occured! Please try again later."));
                }

                break;
            default:
                console.log(`Your balance is : ${User.balance}`);
                break;
        }
    }


}


function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}