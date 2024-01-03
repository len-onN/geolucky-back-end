// scheduler.js
const { Op } = require('sequelize');
const schedule = require('node-schedule');
const { Point } = require('../models'); // Substitua 'SuaModel' pelo nome real do seu modelo Sequelize

const executarConsulta = async () => {
  // Lógica da sua consulta agendada
  const dataAtual = new Date();
//   dataAtual.setMinutes(dataAtual.getMinutes() - dataAtual.getTimezoneOffset());
  const dataFinal = new Date(dataAtual);
  dataFinal.setUTCHours(20, 0, 0, 0);
  const dataInicial = new Date(dataFinal);
  dataInicial.setDate(dataFinal.getDate() - 15);
  try {
    const results = await Point.findAll({
      where: {
        createdAt: {
          [Op.between]: [dataInicial ,dataFinal],
        },
      },
    });
    // console.log(results);
    return results;
  }
  catch (err) {
    console.log("Erro: ", err);
  }
};

schedule.scheduleJob('54 10 * * 1', async () => {
    console.log('Tarefa agendada')
    const results = await executarConsulta();
    console.log(results);
  });
