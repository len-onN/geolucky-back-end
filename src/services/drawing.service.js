const { Raffle, Point, RafflePoints, User } = require('../models');
const { Op } = require('sequelize');
const schedule = require('node-schedule');
const geolib = require('geolib');
const { getRaffleDetails } = require('./raffles.service');

const getRandomCoordinates = () => {
  const randomLat = parseFloat((Math.random() * (90 + 90) - 90).toFixed(8));
  const randomLng = parseFloat((Math.random() * (180 + 180) - 180).toFixed(8));
  return { latitude: randomLat, longitude: randomLng };
};

const findClosestPoint = (randomCoords, points) => {
  const closestPoint = geolib.findNearest(randomCoords, points);
  return closestPoint;
};

const saveRaffleData = async (winnerPoint, competingPoints) => {
  try {
    // Crie um novo registro na tabela Raffle
    const raffle = await Raffle.create({
      winnerPointId: winnerPoint.userId,
      drawnLat: winnerPoint.lat,
      drawnLng: winnerPoint.lng,
    });

    // Associe os pontos concorrentes a esse sorteio na tabela RafflePoints
    await RafflePoints.bulkCreate(competingPoints.map((point) => ({
      pointId: point.userId,
      raffleId: raffle.id,
    })));

    console.log('Dados do sorteio salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar dados do sorteio:', error);
    throw error;
  }
};

const findWeekRafflePoints = async () => {
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
      raw: true,
    });

    return results;
  } catch (err) {
    console.log("Erro: ", err);
  }
};

schedule.scheduleJob('30 22 21 * * 4', async () => {
  console.log('Tarefa agendada');

  const randomCoords = getRandomCoordinates();
  console.log('Coordenadas Aleatórias:', randomCoords);
  try {
    const points = await findWeekRafflePoints();
    const closestPoint = findClosestPoint(randomCoords, points);
    console.log('Ponto Mais Próximo:', closestPoint);
    // const user = await User.findByPk(closestPoint.userId);
    // console.log(user);
    await saveRaffleData(closestPoint, points);
    const rafflePointsDetails = await getRaffleDetails();
    console.log(rafflePointsDetails);
  } catch (err) {
    console.log("Erro: ", err);
  }
});
