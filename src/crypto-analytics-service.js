export default class CryptoService {
  static async getCrypto(ticker1, ticker2) {
    try {
      const response = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&ids=${ticker1},${ticker2}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}