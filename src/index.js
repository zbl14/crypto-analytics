import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import CryptoService from './crypto-analytics-service';

function getTicker(response) {
  if (response) {
    $('.showRank').text(`The rank for ${response[0].name} is ${response[0].rank}.`);
    $('.showPrice').text(`The price for ${response[0].name} is ${response[0].price} at ${new Date(response[0].price_timestamp)}.`);
    $('.showVolume').text(`The trade volume for ${response[0].name} is ${response[0]["1d"].volume}.`);
  } else {
    $('.showErrors').text(`There was an error processing your request: ${response.message}`);
  }
}

function getTopCrypto(response) {
  if (response) {
    let tableOfTopCrypto = "";
    for (let i = 0; i < response.length; i++) {
      tableOfTopCrypto += `<tr> <td>${response[i].rank}</td> <td>${response[i].name}</td> <td>${new Intl.NumberFormat('en-US').format(response[i].price)}</td> <td>${response[i]["1d"].volume}</td> </tr>`;
    }
    $("#topCrypto").before(tableOfTopCrypto);
  } else {
    $('.showErrors').text(`There was an error processing your request: ${response.message}`);
  }
}

function cryptConverter(response) {
  if (response) {
    let quantBuy = $('#quantityBuy').val();
    console.log(quantBuy);
    let quantSell = quantBuy * response[0].price / response[1].price;
    $('.showCost').text(`The cost for ${quantBuy} of ${response[0].name} is ${ quantBuy * parseFloat(response[0].price)}`);
    $('#quantitySell').val(quantSell);
  }
}

$(document).ready(function(){
  CryptoService.getCrypto("","")
    .then(function(response) {
      getTopCrypto(response);
    });
  $('#submit').click(function(){
    let ticker = $('#name').val();
    CryptoService.getCrypto(ticker, "")
      .then(function(response) {
        getTicker(response);
      });
  });
  $('#quote').click(function(){
    let ticker1 = $('#buy').val();
    let ticker2 = $('#sell').val();
    CryptoService.getCrypto(ticker1, ticker2)
      .then(function(response) {
        cryptConverter(response);
      });
  });
});