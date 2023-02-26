const {EpicksFramework} = require('./framework/EpicksFramework');

//A
let app = new EpicksFramework();
function parseArguments(){
    return {
        dev:process.argv[2] === "dev"
    }
}
const arguments = parseArguments();

app.run(3000, arguments);