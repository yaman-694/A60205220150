import axios from 'axios';

const mergeUnique = async (req, res) => {
  try {
    const urls = req.query.url;

    if (!urls) {
      res.status(400).json({ message: 'URLs parameter is missing' });
      return;
    }

    const uniqueUrl = new Set(urls);
    const uniqueUrlsArray = Array.from(uniqueUrl);

    // request all urls in parallel
    const promises = uniqueUrlsArray.map(fetchAndProcessUrl);
    const results = await Promise.all(promises);

    const mergedNumbersMap = new Map();

    results.forEach(result => {
      if (result && result.numbers) {
        result.numbers.forEach(number => {
          mergedNumbersMap.set(number, true);
        });
      }
    });

    const mergedNumbers = Array.from(mergedNumbersMap.keys()).sort((a, b) => a - b);

    res.json({ numbers: mergedNumbers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function fetchAndProcessUrl(url) {
  try {
    const response = await axios.get(url, { timeout: 500 }); 
    if (response.data && response.data.numbers) {
      return response.data;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export { mergeUnique };
