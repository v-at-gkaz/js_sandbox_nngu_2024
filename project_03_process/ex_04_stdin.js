import { argv, stdin, stdout, stderr, exit } from 'node:process';

let data = '';

stdin.on('readable', () => {
    const chunk = stdin.read();
    if(chunk !== null) {
        console.log('chunk detected');
        data += chunk;
    }
});

stdin.on('end', () => {
   console.log('Data:', data);
   exit(0);
});
