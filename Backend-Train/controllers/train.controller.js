import info from '../secrets/secret.js';
import axios from 'axios';

const trainDataCache = {
  data: null,
  timestamp: 0,
  cacheDuration: 60 * 1000, 
};

const fetchTrain = async (req, res) => {
  try {
    const currentTime = Date.now();

    if (trainDataCache.data && currentTime - trainDataCache.timestamp <= trainDataCache.cacheDuration) {
      res.status(200).json(trainDataCache.data);
    } else {
      const auth = await axios.post('http://20.244.56.144/train/auth', info);
      const { data } = await axios.get('http://20.244.56.144/train/trains', {
    headers: {
          authorization: `Bearer ${auth.data.access_token}`,
        },
      });
      trainDataCache.data = data;
      trainDataCache.timestamp = currentTime;

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default fetchTrain;
