import { argv, stdin, stdout, stderr, exit, env } from 'node:process';

const dbLogin = env.DB_LOGIN || 'default_username';

console.log('DB_LOGIN=', dbLogin);


// while (true) {
//
// }