const { Raffle, Point } = require('../models');

const getRaffleDetails = async () => {
  try {
    const raffleDetails = await Raffle.findAll({
    //   where: { id: raffleId },
      include: [
        {
          model: Point,
          as: 'winnerPoint',
          attributes: ['id', 'lat', 'lng', 'userId'],
        },
        {
          model: Point,
          as: 'competingPoints',
          through: { attributes: [] }, // Para evitar a inclusão das colunas de junção
          attributes: ['id', 'lat', 'lng', 'userId'],
        },
      ],
      // raw: true
    });

    console.log(raffleDetails)
    // Formate os dados conforme necessário
    const formattedArr = raffleDetails.map((raffle) => {
        const formattedData = {
          id: raffle.id,
          winnerPointId: raffle.winnerPointId,
          drawnLat: raffle.drawnLat,
          drawnLng: raffle.drawnLng,
          createdAt: raffle.createdAt,
          competingPoints: raffle.competingPoints.map((point) => ({
            id: point.id,
            lat: point.lat,
            lng: point.lng,
            userId: point.userId,
          })),
        };
    
        return formattedData;

    })
    return formattedArr;
  } catch (error) {
    console.error('Erro ao obter detalhes do sorteio:', error);
    throw error;
  }
};

module.exports = { getRaffleDetails };
// // Exemplo de uso
// const raffleId = 1; // Substitua pelo ID do sorteio desejado
// getRaffleDetails(raffleId)
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
