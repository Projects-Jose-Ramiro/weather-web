const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");

router.post("/", async (req, res) => {
  const { username, name, email, password } = req.body;

  // Verifica si todos los campos obligatorios están presentes
  if (!username || !name || !email || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required",
      })
    );
  }

  try {
    // Verifica si el nombre de usuario ya existe
   
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json(
        jsonResponse(400, {
          error: "Username already exists",
        })
      );
    }

    // Crea un nuevo usuario
    const newUser = new User({ username, name, password });
    await newUser.save();

    // Devuelve una respuesta exitosa
    res.status(200).json(jsonResponse(200, { message: "User created successfully" }));
  } catch (error) {
    console.error(error);
    // Devuelve un error en caso de cualquier problema
    res.status(500).json(jsonResponse(500, { error: "Error creating user" }));
  }
});

module.exports = router;
