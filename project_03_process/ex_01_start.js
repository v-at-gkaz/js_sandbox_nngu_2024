
import { argv, stdout, stderr, exit } from 'node:process';

console.log('arg 1', argv[2]);
console.log('arg 2', argv[3]);
console.log('arg 3', argv[4]);

stdout.write("Success! Example stdout\n");
stderr.write("Error! Example Stderr\n");

// exit(0);
// exit(1);
// exit(2);

exit(42);

// let data = '';
// process.stdin.on('readable', () =>{
//     const chunk = process.stdin.read();
//     if(chunk !== null) {
//         data += chunk;
//     }
// });
// process.stdin.on('end', () => {
//    console.log('Data:', data);
//    process.exit(0);
// });