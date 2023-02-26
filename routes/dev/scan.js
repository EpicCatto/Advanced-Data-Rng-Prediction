module.exports = {
    method:"get",
    async run(app, req, res){
        res.json({
            "status":"ok",
        })
    }
}
