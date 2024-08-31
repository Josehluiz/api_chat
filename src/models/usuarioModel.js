const db = require("./db");
async function registrarUsuario(nick){
    return await db.insertOne("usuario",{"nick": nick});

    
}

let buscarUsuario = async (iduser)=>{
    let user = await db.findOne("usuarios",iduser);
    return user;
  }
  
  
  let alterarUsuario = async (user)=>{
    return await db.updateOne("usuarios", user,{_id:user._id});
  }
  
  let removerUsuario = async (iduser) => {
    let user = await db.findOne("Usuario", iduser);
    if (user) {
        user.sala = null;
        return await db.updateOne("Usuario", user, { _id: user._id });
    }
    return false;
}

module.exports = {registrarUsuario,buscarUsuario,alterarUsuario,removerUsuario};