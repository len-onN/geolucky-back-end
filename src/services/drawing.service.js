const { Raffle, Point, RafflePoints, User } = require('../models');
const { Op } = require('sequelize');
const schedule = require('node-schedule');
const geolib = require('geolib');
const { getRaffleDetails } = require('./raffles.service');
const transporter = require('../utils/email');
const moment = require('moment-timezone');

const generateWeekDates = () => {
  const nowDate = moment();
  const timezone = 'America/Sao_Paulo'; // Fuso horário de São Paulo (Brasília)

  const finalDate = nowDate.clone().tz(timezone).endOf('day').set({
    hour: 19,
    minute: 59,
    second: 59,
    millisecond: 999
  });
  const initialDate = finalDate.clone().subtract(6, 'days').startOf('day').set({
    hour: 20,
    minute: 0,
    second: 0,
    millisecond: 0
  });

  return { initialDate, finalDate };
};

// const generateWeekDates = () => {
//   const dataAtual = new Date();
//   const dataFinal = new Date(dataAtual);
//   dataFinal.setUTCHours(19, 59, 59, 999);
//   const dataInicial = new Date(dataFinal);
//   dataInicial.setUTCHours(20, 0, 0, 0);
//   dataInicial.setDate(dataFinal.getDate() - 6);

//   return { dataInicial, dataFinal };
// };

const getRandomCoordinates = () => {
  const randomLat = parseFloat((Math.random() * (90 + 90) - 90).toFixed(8));
  const randomLng = parseFloat((Math.random() * (180 + 180) - 180).toFixed(8));
  return { latitude: randomLat, longitude: randomLng };
};

const findClosestPoint = (randomCoords, points) => {
  const closestPoint = geolib.findNearest(randomCoords, points);
  return closestPoint;
};

const saveRaffleData = async (winnerPoint, randomCoords, competingPoints) => {
  const { initialDate, finalDate } = generateWeekDates();
  try {
    const raffle = await Raffle.create({
      winnerPointId: winnerPoint.userId,
      drawnLat: randomCoords.latitude,
      drawnLng: randomCoords.longitude,
      drawnStart: initialDate,
      drawnEnd: finalDate,
    });

    await RafflePoints.bulkCreate(competingPoints.map((point) => ({
      pointId: point.id,
      raffleId: raffle.id,
    })));

    console.log('Dados do sorteio salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar dados do sorteio:', error);
    throw error;
  }
};

const findWeekRafflePoints = async () => {
  const { initialDate, finalDate } = generateWeekDates();

  try {
    const results = await Point.findAll({
      where: {
        createdAt: {
          [Op.between]: [initialDate, finalDate],
        },
      },
      include: [{
        model: User,
        attributes: ["email", "fullName"],
        as: "user",
      }],
      raw: true,
      nest: true,
    });

    return results;
  } catch (err) {
    console.log("Erro: ", err);
  }
};

schedule.scheduleJob('45 45 15 * * 2', async () => {
  console.log('Tarefa agendada');

  const randomCoords = getRandomCoordinates();
  console.log('Coordenadas Aleatórias:', randomCoords);
  try {
    const points = await findWeekRafflePoints();
    const closestPoint = findClosestPoint(randomCoords, points);
    console.log('Ponto Mais Próximo:', closestPoint);
    await saveRaffleData(closestPoint, randomCoords, points);
    if (points.length) {
      points.forEach((point) => console.log("email: ", point.user.email));
      async function sendEmail(point) {
        const mailOptions = {
          from: process.env.EMAIL,
          to: point.user.email,
          subject: 'Resultado Sorteio',
          html: `<p>Olá ${point.user.fullName}, clique no link para ver o resultado do sorteio Geolucky <a href="http://localhost:3000/raffles">Ver resultado</a></p>`,
        };
        try {
          const info = await transporter.sendMail(mailOptions);
          console.log(info);
        } catch (err) {
          console.log(err);
        }
      }
      async function sendEmails(points) {
        for (const point of points) {
          await sendEmail(point);
        }
      };
      sendEmails(points);
      const rafflePointsDetails = await getRaffleDetails();
    } else {
      console.log("No Points");
    }
  } catch (err) {
    console.log("Erro: ", err);
  }
});
