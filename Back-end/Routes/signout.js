const getTokenFromHeader = require("../auth/getTokenFromHeader");
const { jsonResponse } = require("../lib/jsonResponse");
const Token = require("../schema/token");


const router = require("express").Router();

router.delete("/", async (req, res) => {
try {
    const refreshToken = getTokenFromHeader(req.headers)

    if(refreshToken) {
        await Token.findOneAndDelete({ token: refreshToken});
        res.status(200).json(jsonResponse(200, { message: "Token deleted" }));
    } else {
        res.status(400).json(jsonResponse(400, { message: "Refresh token not provided" }));
      }
} catch (error) {
    console.log(error);
    res.status(500).json(jsonResponse(500, { message: "Server error"}))
}
})
module.exports = router;
