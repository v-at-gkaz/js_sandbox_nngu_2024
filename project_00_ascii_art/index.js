// The comment
const art = require('ascii-art');

art.font('Hello, World ! ! ! ', 'Doom', (err, renderredText)=>{
    if(err) {
        return;
    }
    console.log(renderredText);
});