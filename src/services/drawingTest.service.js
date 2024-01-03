const { Op } = require('sequelize');
const schedule = require('node-schedule');
const geolib = require('geolib');
const { User } = require('../models');
const { Point } = require('../models');

const getRandomCoordinates = () => {
  // Gera coordenadas aleatórias com 4 casas decimais de precisão
  const randomLat = parseFloat((Math.random() * (90 + 90) - 90).toFixed(8));
  const randomLng = parseFloat((Math.random() * (180 + 180) - 180).toFixed(8));
  return { latitude: 10, longitude: -5 };
};

const findClosestPoint = (randomCoords, points) => {
  // Encontra o ponto mais próximo usando a biblioteca geolib
  // const pointsT = points.map((point) => ({
  //   latitude: point.lat,
  //   longitude: point.lng,
  //   userId: point.userId,
  // }));
  const closestPoint = geolib.findNearest(randomCoords, points);
  return closestPoint;
};

const executarConsulta = async () => {
  const dataAtual = new Date();
  const dataFinal = new Date(dataAtual);
  dataFinal.setUTCHours(19, 59, 59, 999);
  const dataInicial = new Date(dataFinal);
  dataInicial.setUTCHours(20, 0, 0, 0);
  dataInicial.setDate(dataFinal.getDate() - 6);

  try {
    const results = await Point.findAll({
      where: {
        createdAt: {
          [Op.between]: [dataInicial, dataFinal],
        },
      },
      raw: true, // Obtenha dados crus para facilitar o processamento
    });

    return results;
  } catch (err) {
    console.log("Erro: ", err);
  }
};

schedule.scheduleJob('15 38 16 * * 1', async () => {
  console.log('Tarefa agendada');
  
  const randomCoords = getRandomCoordinates();
  console.log('Coordenadas Aleatórias:', randomCoords);

  const points = await executarConsulta();
  // points.forEach((point) => console.log(point));

  const closestPoint = findClosestPoint(randomCoords, points);
  console.log('Ponto Mais Próximo:', closestPoint);

  const user = await User.findByPk(closestPoint.userId);
  console.log(user);
});
