import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import CryptoService from './crypto-analytics-service';

function getTicker(response) {
  if (response) {
    $('.time').text(`${response[0].price_timestamp.replace("T"," ").replace("Z", "")}`);
    $('.showRank').text(`${response[0].rank}`);
    $('.showPrice').text(`$ ${new Intl.NumberFormat('en-US').format(response[0].price)}`);
    $('.showVolume').text(`${new Intl.NumberFormat('en-US').format(response[0]["1d"].volume)}`);
  } else {
    $('.showErrors').text(`There was an error processing your request: ${response}`);
  }
}

async function makeApiCall(ticker1, ticker2) {
  const response = await CryptoService.getCrypto(ticker1, ticker2);
  getTicker(response);
}

function getTopCrypto(response) {
  if (response) {
    let tableOfTopCrypto = "";
    for (let i = 0; i < response.length; i++) {
      tableOfTopCrypto += `<tr> <td>${response[i].rank}</td> <td> <img src="${response[i].logo_url}" width="25px"> ${response[i].symbol}</td> <td>${response[i].name}</td> <td> $ ${new Intl.NumberFormat('en-US').format(response[i].price)}</td> <td>${new Intl.NumberFormat('en-US').format(response[i]["1d"].volume)}</td> </tr>`;
    }
    $("#topCrypto").before(tableOfTopCrypto);
  } else {
    $('.showErrors').text(`There was an error processing your request: ${response}`);
  }
}

async function makeApiCallForTable (ticker1, ticker2) {
  const response = await CryptoService.getCrypto(ticker1, ticker2);
  getTopCrypto(response);
}

function cryptConverter(response) {
  if (response) {
    let quantBuy = $('#quantityBuy').val();
    let quantSell = quantBuy * response[0].price / response[1].price;
    let dollar = quantBuy * parseFloat(response[0].price);
    $('#dollar').val(dollar);
    $('#quantitySell').val(quantSell);
  }
}

async function makeApiCallForQuote (ticker1, ticker2) {
  const response = await CryptoService.getCrypto(ticker1, ticker2);
  cryptConverter(response);
}

$(document).ready(function(){
  makeApiCallForTable("","");
  $('#submit').click(function(){
    let ticker1 = $('#name').val();
    makeApiCall(ticker1);
  });
  $('#quote').click(function(){
    let ticker1 = $('#buy').val();
    let ticker2 = $('#sell').val();
    makeApiCallForQuote(ticker1, ticker2);
  });
});
