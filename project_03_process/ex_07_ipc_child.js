import { argv, stdin, stdout, stderr, exit } from 'node:process';

setInterval(()=>{
    stdout.write("Success! Example stdout\n");
}, 1000);

setInterval(()=>{
    stderr.write("Error! Example Stderr\n");
}, 2000);

setTimeout(()=> {
    exit(0);
}, 5000);