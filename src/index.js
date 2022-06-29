import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import CryptoService from './crypto-analytics-service';

function getTicker(response) {
  if (response) {
    $('.showRank').text(`The rank for ${response[0].name} is ${response[0].rank}.`);
    $('.showPrice').text(`The price for ${response[0].name} is ${response[0].price} at ${response[0].price_timestamp.replace("T", " ").replace("Z", "")}.`);
    $('.showVolume').text(`The trade volume for ${response[0].name} is ${response[0]["1d"].volume}.`);
  } else {
    $('.showErrors').text(`There was an error processing your request: ${response.message}`);
  }
}

function getTopCrypto(response) {
  if (response) {
    let tableOfTopCrypto = "";
    for (let i = 0; i < response.length; i++) {
      tableOfTopCrypto += `<tr> <td>${response[i].rank}</td> <td>${response[i].name}</td> <td>${response[i].price}</td> <td>${response[i]["1d"].volume}</td> </tr>`
    }
    $("#topCrypto").before(tableOfTopCrypto);
  }
}


$(document).ready(function(){
  CryptoService.getCrypto("")
  .then(function(response) {
   getTopCrypto(response);
  });
  $('#submit').click(function(){
    let ticker = $('#name').val();
   CryptoService.getCrypto(ticker)
   .then(function(response) {
    getTicker(response);
   });
  });
});