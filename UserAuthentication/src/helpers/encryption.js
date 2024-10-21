const bcrypt = require('bcrypt')

class Crypt {
    salt = bcrypt.genSaltSync(10)
    criptografar(password, res) {
        try{
            const encryptedPassword = bcrypt.hashSync(password, this.salt)
            return encryptedPassword
        }catch(error){
            console.log(error)
            return res.status(422).json({message: "error in encrypting"})
        }
    }

    check(password, passwordUser, res){
        try{
            const check = bcrypt.compareSync(password, passwordUser)
            if (!check){
                return res.status(422).json({message: "incorrect password"})
            }
            console.log("message: authenticated user")

        }catch(error){
            console.log(error)
            return res.status(422).json({message: "error trying to authenticate user"})
        }
    }
}

module.exports = new Crypt()