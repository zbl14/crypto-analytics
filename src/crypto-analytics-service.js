export default class CryptoService {
  static getCrypto(ticker1, ticker2) {
    return fetch(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&ids=${ticker1},${ticker2}`)
      .then(function(response){
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
}