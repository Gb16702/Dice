export default function handler(req, res) {
    const fakeData = {
      message: 'Ceci est une réponse JSON fictive',
      timestamp: Date.now()
    };

    res.status(200).json(fakeData);
  }