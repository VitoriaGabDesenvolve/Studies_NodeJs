const db = require("../database/connect");
const Crypt = require("../helpers/encryption")
const createUserToken = require('../helpers/CreateToken') ;

class UserController {
  async listUsers(req, res) {
    try {
      const [users] = await db.query("SELECT * FROM tbusers");
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(422).json({ message: "erro ao listar usuários" });
    }
  }

  async AddUser(req, res){
    try{
        const {name, email, password} = req.body
        if (!name || !email || !password){
            return res.status(422).json({message: "incomplete user data"})
        }
        const execucao = db.query(`INSERT INTO tbusers (NameUser, EmailUser, PasswordUser) VALUES ('${name}', '${email}', '${Crypt.criptografar(password)}');`)
        res.status(201).json({message: "user created"})
    }catch(error){
        console.log(error)
        res.status(422).json({message: "error registering user"});
    }
  }

  async AutheticateUser(req, res) {
    try {
        const {name, password} = req.body

        const [user] = await db.query(`SELECT * FROM tbusers WHERE NameUser = '${name}'`)
        if (!user){
            res.status(422).json({message: "user does not exist"})
            return
        }

        Crypt.check(password, user[0].PasswordUser, res)

        const token = await createUserToken(user, req, res)
        res.status(200).json({message: "usuario autenticado", user: user[0].NameUser, token: token})
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();
