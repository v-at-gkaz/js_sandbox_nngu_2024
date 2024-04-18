import { argv, stdin, stdout, stderr, exit } from 'node:process';
import { spawn } from 'node:child_process';

// const proc = spawn('notepad.exe', []);

// const proc = spawn('/usr/bin/gedit', ['/tmp/text4.txt']);

const proc = spawn('node', ['./ex_07_ipc_child.js']);

proc.stdout.on('data', (data) => {
    console.log('proc stdout:', data.toString());
});

proc.stderr.on('data', (err) => {
    console.log('proc stderr:', err.toString());
});

proc.on('close', (code, signal) => {
   console.log('proc exit code:', code);
   console.log('proc signal:', signal);
});

setTimeout(() => {
    proc.kill('SIGTERM');
}, 30000);