import { argv, stdin, stdout, stderr, exit } from 'node:process';

stdout.write("Success! Example stdout\n");
stderr.write("Error! Example Stderr\n");

// node ex_01_stout_stderr.js > /tmp/result.txt
// node ex_01_stout_stderr.js 1> /tmp/result.txt
// node ex_01_stout_stderr.js 2> /tmp/result.txt
// node ex_01_stout_stderr.js &> /tmp/result.txt