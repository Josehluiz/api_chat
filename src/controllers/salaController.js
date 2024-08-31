const salaModel = require('../models/salaModel');
const { sair } = require('./usuarioController');


exports.entrar= async (iduser,idsala)=>{
  console.log(idsala);
  console.log(iduser);
  const sala = await salaModel.buscarSala(idsala);

  let usuarioModel=require('../models/usuarioModel');
  let user = await usuarioModel.buscarUsuario(iduser);

  console.log(sala);

  user.sala={_id:sala._id, nome:sala.nome, tipo:sala.tipo};

  
    if(user.sala){
      console.log("ok");
    }
    return {msg:"OK", timestamp:timestamp=Date.now()};

}
  

exports.enviarMensagem = async (nick, msg, idsala) => {
  const sala = await salaModel.buscarSala(idsala);

  if (!sala) {
      console.error("Sala não encontrada para ID:", idsala);
      return { msg: "Sala não encontrada" };
  }

  console.log(sala.msgs);

  if (!sala.msgs) {
      sala.msgs = [];
  }

  const timestamp = Date.now();
  sala.msgs.push({
      timestamp: timestamp,
      msg: msg,
      nick: nick
  });

  let resp = await salaModel.atualizarMensagens(sala);

  if (!resp.matchedCount) {
      console.error("Falha ao atualizar mensagens da sala.");
      return { msg: "Falha ao atualizar mensagens" };
  }

  return { msg: "OK", timestamp: timestamp };
};

  
  exports.enviarMensagem = async (nick, msg, idsala) => {
    const sala = await salaModel.buscarSala(idsala);
  
    if (!sala) {
        console.error("Sala não encontrada para ID:", idsala);
        return { msg: "Sala não encontrada" };
    }
  
    console.log(sala.msgs);
  
    if (!sala.msgs) {
        sala.msgs = [];
    }
  
    const timestamp = Date.now();
    sala.msgs.push({
        timestamp: timestamp,
        msg: msg,
        nick: nick
    });
  
    let resp = await salaModel.atualizarMensagens(sala);
  
    if (!resp.matchedCount) {
        console.error("Falha ao atualizar mensagens da sala.");
        return { msg: "Falha ao atualizar mensagens" };
    }
  
    return { msg: "OK", timestamp: timestamp };
  };

  exports.buscarMensagens = async (idsala, timestamp) => {
    let mensagens = await salaModel.buscarMensagens(idsala, timestamp);
  
    if (!mensagens || mensagens.length === 0) {
        console.log("Nenhuma mensagem encontrada");
    }
  
    return {
        timestamp: mensagens[mensagens.length - 1].timestamp,
        msgs: mensagens
    };
  };
  
  exports.sair = async (iduser) => {
    return await salaModel.removerUsuario(iduser);
  };

exports.get = async () => {
    return await salaModel.listarSalas();
}