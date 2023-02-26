module.exports = {
    method:"get",
    async run(app, req, res){
        res.json({
            "name":"bss-v2-api",
            "api":"EpicksFramework",
            "version":"dev",
            "author":"Phat L",
            "github":"https://github.com/EpicCatto"
        })
    }
}
