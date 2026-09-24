const { resolve } = require('dns');
const readline = require ('readline');
const r1 = readline.createInterface({

    input: process.stdin, // Read from terminal input
    output: process.stdout,  // Write to terminal output
})

// r1.question('what is your name',(answer) => {
//     console.log(`hello ${answer}`);
//     r1.close();
// })

function askQuestion(query){
    return new Promise((resolve) => {
        r1.question(query, (answer) => {
            resolve(answer);
        })
    })
}

async function main(){
    const name = await askQuestion("what is your name ?");
    const age = await askQuestion("how old are you ?");
    console.log(`hello ${name} ! you are ${age} years old.`);
    r1.close();}
    
main();