const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user")
const getUserInfo = require("../lib/getUserInfo");


router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are riquired",
      })
    );
  }

  const user = await User.findOne({ username });

  if(user){
    const correctPassword = await user.comparePassword(password, user.password);
  
    if(correctPassword){
      const accessToken = user.createAccessToken()
      const refreshToken = await user.createRefreshToken()
        res
          .status(200)
          .json(jsonResponse(200, { user: getUserInfo(user), accessToken, refreshToken }));
    } else{
      res.status(400).json(
        jsonResponse(400, {
          error: "User or password incorrect",
        })
      )
    }

  }else{
    res.status(400).json(
      jsonResponse(400, {
        error: "User not found"
      })
    )
  }

//autenticar usuario  

});

module.exports = router;
