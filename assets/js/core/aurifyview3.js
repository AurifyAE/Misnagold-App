// // import { readSpreadValues } from '../core/spotrateDB.js';
// import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
// import { app } from '../../../config/db.js';

// const firestore = getFirestore(app)

setInterval(fetchData, 500);


let goldValue, silverValue;

// Gold API KEY
const API_KEY = 'goldapi-fbqpmirloto20zi-io'

// Function to Fetch Gold API Data
async function fetchData() {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", API_KEY);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const responseGold = await fetch("https://www.goldapi.io/api/XAU/USD", requestOptions);
        const responseSilver = await fetch("https://www.goldapi.io/api/XAG/USD", requestOptions);

        if (!responseGold.ok && !responseSilver.ok) {
            throw new Error('One or more network responses were not OK');
        }

        const resultGold = await responseGold.json();
        const resultSilver = await responseSilver.json();

        // Adjust based on the actual API response structure
        var goldValueUSD = parseFloat(resultGold.price);
        var silverValueUSD = parseFloat(resultSilver.price)

        goldValue = goldValueUSD

        document.getElementById('goldRateValue').textContent = '$' + goldValueUSD.toFixed(2);

    } catch (error) {
        console.error('Error fetching gold and silver values:', error);
    }
}

////////////////////////////////////////////
///// Function to show Alert  //////////////
function rateAlert() {
    // const value = parseFloat(goldValue);
    // const valueMin = parseFloat(goldValue - 50);
    // const valueMax = parseFloat(goldValue + 50);

    // Initialize the round slider on the element
    $("#slider").roundSlider({
        radius: 120,
        circleShape: "half-top",
        sliderType: "mid-range",
        showTooltip: false,
        value: 50,
        min: 0,
        max: 100,
        lineCap: "round",
    });


    // Set up a callback function for the value change event
    $("#slider").on("drag", function (event) {
        // Get the current value
        var currentValue = $("#slider").roundSlider("option", "value");

        if (currentValue <= 50) {
            document.getElementById('value').innerHTML = goldValue - 50 + currentValue;
        } else {
            document.getElementById('value').innerHTML = (goldValue + currentValue - 50).toFixed(2);
        }
        console.log("Current Value:", currentValue);
        //document.getElementById('value').innerHTML = currentValue;
    });
}

rateAlert()


