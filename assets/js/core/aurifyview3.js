// // import { readSpreadValues } from '../core/spotrateDB.js';
// import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
// import { app } from '../../../config/db.js';

// const firestore = getFirestore(app)

setInterval(fetchData, 500);


let goldValue, silverValue, alertValue;

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
        handleSize: 25
    });


    // Set up a callback function for the value change event
    $("#slider").on("drag", function (event) {
        // Get the current value
        var currentValue = $("#slider").roundSlider("option", "value");

        if (currentValue <= 50) {
            alertValue = (goldValue - 50 + currentValue).toFixed(0);
            document.getElementById('value').innerHTML = alertValue;

        } else {
            alertValue = (goldValue + currentValue - 50).toFixed(0);
            document.getElementById('value').innerHTML = alertValue;
        }
        console.log("Current Value:", currentValue);
        //document.getElementById('value').innerHTML = currentValue;
    });
}

rateAlert()


document.getElementById('value').addEventListener('input', () => {
    // Update alertValue with the edited content
    alertValue = document.getElementById('value').textContent;
    console.log(alertValue);
});

// Optionally, you can add a click event to enable content editing on click
document.getElementById('value').addEventListener('click', () => {
    // Set contentEditable to true when the element is clicked
    document.getElementById('value').contentEditable = true;
});


document.getElementById('alertBtn').addEventListener('click', () => {
    let value = parseFloat(alertValue);
    let value2 = parseFloat(goldValue);


    const value3 = value.toFixed(0);
    const value4 = value2.toFixed(0);

    console.log(alertValue);

    if (value3 === value4) {
        document.getElementById('xyz').play();
        // alert("Thank you!");
    }

});