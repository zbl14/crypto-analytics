export default class CryptoService {
  static getCrypto(ticker) {
    return fetch(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&ids=${ticker}`)
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