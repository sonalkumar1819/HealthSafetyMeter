document.getElementById('pollutionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const H2S= parseFloat(document.getElementById('H2S').value);
    const NH3= parseFloat(document.getElementById('NH3').value);
    const NO2 = parseFloat(document.getElementById('NO2').value);
    const CO = parseFloat(document.getElementById('co').value);
     const AQI = parseFloat(document.getElementById('AQI').value);
      const PM2 = parseFloat(document.getElementById('PM2').value);
      const BUT = parseFloat(document.getElementById('BUT').value);

    console.log("H2S:", H2S, "NH3:", NH3, "CO:", CO,"NO2:", NO2, "AQI:", AQI, "PM2:", PM2,"BUT:", BUT); // Debugging line

    const airQuality = analyzeAirQuality(H2S,NH3,CO, NO2, AQI,PM2,BUT);
    displayResult(airQuality);
    updateChart(H2S, NH3,CO, NO2,AQI,PM2,BUT);
    displayEffects(H2S, NH3,CO, NO2,AQI,PM2,BUT);
    saveUserData(H2S, NH3,CO, NO2,AQI,PM2,BUT);
    if (airQuality === 'Harmful') {
        toggleEmergencyMode(true);
    }
});

function normalize(value, min, max) {
  return ((value - min) / (max - min)) * 100;
}
function analyzeAirQuality(H2S, NH3, CO, NO2, AQI, PM2, BUT) {
    const normH2S = normalize(H2S, 0, 1);      // H2S ppm
    const normNH3 = normalize(NH3, 0, 25);     // NH3 ppm
    const normCO = normalize(CO, 0, 10);       // CO ppm
    const normNO2 = normalize(NO2, 0, 0.1);    // NO2 ppm
    const normAQI = normalize(AQI, 0, 500);    // AQI index
    const normPM2 = normalize(PM2, 0, 500);    // µg/m³
    const normBUT = normalize(BUT, 0, 10);     // ppm

    const avgPollution = (normH2S + normNH3 + normCO + normNO2 + normAQI + normPM2 + normBUT) / 7;

    if (avgPollution < 30) return 'Good';
    if (avgPollution < 70) return 'Moderate';
    return 'Harmful';
}

function normalize(value, min, max) {
    return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

function displayResult(quality) {
    console.log("Air Quality:", quality); // Debugging line
    const resultDiv = document.getElementById('result');
    const emoji = getMoodEmoji(quality); // Get the emoji based on air quality
    resultDiv.innerHTML = `Air Quality: <strong class="${quality === 'Harmful' ? 'harmful' : ''}">${quality} ${emoji}</strong>`;
    
    if (quality === 'Harmful') {
        resultDiv.innerHTML += '<p>Suggestions: Wear a mask, stay indoors, use an air purifier.</p>';
        document.getElementById('alert').innerHTML = '⚠️ Warning: Harmful pollution levels detected!';
        alert("⚠️ Warning: Harmful pollution levels detected!");
    } else if (quality === 'Moderate') {
        document.getElementById('alert').innerHTML = '⚠️ Caution: Moderate pollution levels detected!';
        alert("⚠️ Caution: Moderate pollution levels detected!");
    } else {
        document.getElementById('alert').innerHTML = '';
    }
}

function displayEffects(H2S, NH3, NO2,AQI,PM2) {
    const effectsDiv = document.getElementById('effects');
    effectsDiv.innerHTML = '';

    // Only show CO effects if H2S is above 50
    if (H2S > 10 && H2S <= 50) {
        effectsDiv.innerHTML += '<p>⚠️ Moderate exposure to H₂S – may cause eye and throat irritation.</p>';
        effectsDiv.innerHTML += '<img src="https://thumb.ac-illust.com/5f/5f5f208327b728ddae7e4f02b9c848ff_t.jpeg" alt="Moderate" class="gas-icon">';
    } else if (H2S > 50 && H2S <= 100) {
        effectsDiv.innerHTML += '<p>❗ Dangerous level of H₂S – can cause severe irritation, headache, and dizziness.</p>';
        effectsDiv.innerHTML += '<img src="https://rayteb.ir/cdn/Files/News/MJAYMW/MTAXNQ/MDK1OA/NZG4MQ.jpg" alt="Dangerous" class="gas-icon">';
    } else if (H2S > 100) {
        effectsDiv.innerHTML += '<p>☠️ Extremely harmful H₂S exposure – risk of unconsciousness or death!</p>';
        effectsDiv.innerHTML += '<img src="https://as1.ftcdn.net/jpg/03/21/63/74/1000_F_321637428_X2InnthIKPyT6B6bXaOcp2uavU4KUxWr.jpg" alt="Hazard" class="gas-icon">';
    } else {
        effectsDiv.innerHTML += '<p>✅ Safe H₂S level detected.</p>';
    }
    
    
    // Show NH3 effects regardless of CO level
    if (NH3 > 25 && NH3 <= 50) {
        effectsDiv.innerHTML += '<p>⚠️ Moderate exposure to NH₃ – may cause eye, nose, and throat irritation.</p>';
        effectsDiv.innerHTML += '<img src="https://www.researchgate.net/profile/Punithavathi-Thirunavakkarasu/publication/320654169/figure/fig1/AS:733988058566665@1552007798424/Effects-of-ammonia-exposure_Q320.jpg" alt="Moderate" class="gas-icon">';
    } else if (NH3 > 50 && NH3 <= 100) {
        effectsDiv.innerHTML += '<p>❗ High NH₃ level – strong irritation and respiratory issues likely.</p>';
        effectsDiv.innerHTML += '<img src="https://www.researchgate.net/profile/Punithavathi-Thirunavakkarasu/publication/320654169/figure/fig1/AS:733988058566665@1552007798424/Effects-of-ammonia-exposure_Q320.jpg" alt="Dangerous" class="gas-icon">';
    } else if (NH3 > 100) {
        effectsDiv.innerHTML += '<p>☠️ Extremely harmful NH₃ exposure – risk of lung damage and suffocation!</p>';
        effectsDiv.innerHTML += '<img src="https://img.freepik.com/free-vector/red-lungs-with-white-background-word-heart-it_1308-153031.jpg" alt="Hazard" class="gas-icon">';
    } else {
        effectsDiv.innerHTML += '<p>✅ Safe NH₃ level detected.</p>';
    }
    
    // Show NO₂ effects regardless of CO level
    if (NO2 > 0.1 && NO2 <= 0.5) {
        effectsDiv.innerHTML += '<p>⚠️ Moderate NO₂ exposure – irritation in eyes, nose, and throat may occur.</p>';
        effectsDiv.innerHTML += '<img src="https://www.researchgate.net/profile/Punithavathi-Thirunavakkarasu/publication/320654169/figure/fig1/AS:733988058566665@1552007798424/Effects-of-ammonia-exposure_Q320.jpg" alt="Moderate" class="gas-icon">';
    } else if (NO2 > 0.5 && NO2 <= 1) {
        effectsDiv.innerHTML += '<p>❗ High NO₂ level – may cause coughing and breathing issues.</p>';
        effectsDiv.innerHTML += '<img src="https://www.verywellhealth.com/thmb/hDQIvQF8PPvnIN0RMIYP1pzu4Ao=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/107797082-56a17a5d3df78cf7726b0a0b.jpg" alt="Dangerous" class="gas-icon">';
    } else if (NO2 > 1) {
        effectsDiv.innerHTML += '<p>☠️ Extremely harmful NO₂ exposure – risk of lung damage and severe respiratory distress!</p>';
        effectsDiv.innerHTML += '<img src="https://img.freepik.com/free-vector/red-lungs-with-white-background-word-heart-it_1308-153031.jpg" alt="Hazard" class="gas-icon">';
    } else {
        effectsDiv.innerHTML += '<p>✅ Safe NO₂ level detected.</p>';
    }

if (co <= 9) {
    // Good
    effectsDiv.innerHTML += `
        <p><strong>Good:</strong> Air quality is satisfactory. No health risk.</p>`;
} else if (co <= 50) {
    // Moderate
    effectsDiv.innerHTML += `
        <img src="https://media.istockphoto.com/id/944786922/vector/elderly-man-headache.jpg?s=612x612&w=0&k=20&c=6B2wYKiJyXrlekgKdHq_w-87UcEedEPe04NRId1qyBA=" alt="Caution" class="gas-icon">
        <p><strong>Moderate:</strong> May affect sensitive individuals. Mild headache or fatigue.</p>`;
} else {
    // Harmful
    effectsDiv.innerHTML += `
        <img src="https://img.freepik.com/free-psd/red-heart-isolated-transparent-background_191095-27355.jpg" alt="Heart Warning" class="gas-icon">
        <p><strong>Harmful:</strong> Affects oxygen supply — may cause fatigue, dizziness, and serious health risks.</p>`;
}


    if (PM2 > 12 && PM2 <= 35.4) {
        effectsDiv.innerHTML += '<p>⚠️ Moderate PM2.5 – sensitive individuals may experience irritation or difficulty breathing.</p>';
        effectsDiv.innerHTML += '<img src="https://www.verywellhealth.com/thmb/hDQIvQF8PPvnIN0RMIYP1pzu4Ao=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/107797082-56a17a5d3df78cf7726b0a0b.jpg" alt="Moderate" class="gas-icon">';
    } else if (PM2 > 35.4 && PM2 <= 55.4) {
        effectsDiv.innerHTML += '<p>❗ Unhealthy for sensitive groups – children, elderly, or people with asthma may feel effects.</p>';
        effectsDiv.innerHTML += '<img src="https://ehcebwm3f3o.exactdn.com/wp-content/uploads/asthma.jpg" alt="Warning" class="gas-icon">';
    } else if (PM2 > 55.4 && PM2 <= 150.4) {
        effectsDiv.innerHTML += '<p>☣️ Unhealthy – everyone may start experiencing health effects. Avoid outdoor activity.</p>';
        effectsDiv.innerHTML += '<img src="" alt="Unhealthy" class="gas-icon">';
    } else if (PM2 > 150.4) {
        effectsDiv.innerHTML += '<p>☠️ Hazardous PM2.5 levels – serious health risk. Stay indoors and use air purifiers!</p>';
        effectsDiv.innerHTML += '<img src="" alt="Hazardous" class="gas-icon">';
    } else {
        effectsDiv.innerHTML += '<p>✅ PM2.5 level is Good – air quality is safe.</p>';
    }
    
    
}

function updateChart(H2S, NH3,CO, NO2,AQI,PM2,BUT) {
    const ctx = document.getElementById('pollutionChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['H2S', 'NH3','CO', 'NO2','AQI','PM2','BUT'],
            datasets: [{
                label: 'Pollution Levels (ppm)',
                data: [H2S, NH3,CO, NO2,AQI,PM2,BUT],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', 
                    'rgba(54, 162, 235, 0.6)', 
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 135, 0.6)',
                    'rgba(116, 192, 75, 0.6)',
                    'rgba(192, 75, 153, 0.6)',
                    'rgba(222, 188, 17, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', 
                    'rgba(54, 162, 235, 1)', 
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 135, 0.6)',
                    'rgba(116, 192, 75, 0.6)',
                    'rgba(192, 75, 153, 0.6)',
                    'rgba(222, 188, 17, 0.6)'

                ],
                borderWidth: 1,
                hoverBackgroundColor: [
                    'rgba(255, 99, 132, 0.8)', 
                    'rgba(54, 162, 235, 0.8)', 
                    'rgba(75, 192, 192, 0.8)',
                     'rgba(75, 192, 135, 0.6)',
                     'rgba(116, 192, 75, 0.6)',
                     'rgba(192, 75, 153, 0.6)',
                    'rgba(222, 188, 17, 0.6)'
                ],
                hoverBorderColor: [
                    'rgba(255, 99, 132, 1)', 
                    'rgba(54, 162, 235, 1)', 
                    'rgba(75, 192, 192, 1)',
                     'rgba(75, 192, 135, 0.6)',
                     'rgba(116, 192, 75, 0.6)',
                     'rgba(192, 75, 153, 0.6)',
                    'rgba(222, 188, 17, 0.6)'
                ]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Pollution Levels (ppm)',
                        color: '#333',
                        font: {
                            size: 16,
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutBounce'
            }
        }
    });
}

function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.tab-button[onclick="openTab('${tabName}')"]`).classList.add('active');
}

function getLocationAndPollution() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchPollutionData(lat, lon);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function fetchPollutionData(lat, lon) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Process and display pollution data
            console.log(data);
        })
        .catch(error => console.error('Error fetching pollution data:', error));
}

function saveUserData(H2S, NH3,CO, NO2,AQI,PM2,BUT) {
    const history = JSON.parse(localStorage.getItem('pollutionHistory')) || [];
    history.push({ co, no2, co2, timestamp: new Date() });
    localStorage.setItem('pollutionHistory', JSON.stringify(history));
}

function predictPollutionTrend(no2) {
    // Simple prediction logic (this can be more complex)
    if (no2 > 50) {
        return "If NO₂ continues to rise like this, it may cross safe limits in 2 hours.";
    }
    return "";
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// @keyframes smoke {
//     /* Define smoke animation */
// }

function getMoodEmoji(quality) {
    switch (quality) {
        case 'Good': return '😃'; 
        case 'Moderate': return '😷'; 
        case 'Harmful': return '🤢'; 
        default: return '';
    }
}

function switchLanguage(lang) {
    const translations = {
        en: {
            title: "Pollution Detection",
            alert: "Warning: Harmful pollution levels detected!",
            
        },
        hi: {
            title: "प्रदूषण पहचान",
            alert: "चेतावनी: हानिकारक प्रदूषण स्तर का पता चला!",
            
        }
    };

    document.querySelector('h1').innerText = translations[lang].title;
    document.getElementById('alert').innerText = translations[lang].alert;
}

function speakAlert(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
}

const qr = new QRious({
    element: document.getElementById('qrCode'),
    value: 'Your pollution data link here'
});

function toggleEmergencyMode(isEmergency) {
    const emergencyDiv = document.getElementById('emergencyMode');

    if (isEmergency) {
        emergencyDiv.style.display = 'block'; // Show emergency message
        document.body.style.backgroundColor = 'red'; // Change background color

        alert("🚨 Emergency Mode Activated! Please take precautions.");

        // Ask for user's location after alert is acknowledged
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // You can log, display, or send this to the server
                    console.log("User's Location:", latitude, longitude);

                    // Example: Display on page
                    const locationDiv = document.getElementById('userLocation');
                    if (locationDiv) {
                        locationDiv.innerHTML = `📍 Your Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                    }
                },
                function(error) {
                    console.error("Error getting location:", error.message);
                    alert("⚠️ Location access denied or unavailable.");
                }
            );
        } else {
            alert("❌ Geolocation is not supported by this browser.");
        }

    } else {
        emergencyDiv.style.display = 'none'; // Hide emergency message
        document.body.style.backgroundColor = ''; // Reset background color
    }
}


document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const feeling = document.getElementById('feeling').value;
    const pollutionLevel = parseFloat(document.getElementById('pollutionLevel').value);

    // Display confirmation message
    alert(`Feedback submitted successfully!\nFeeling: ${feeling}\nPollution Level: ${pollutionLevel} ppm`);
    
    // Optionally, reset the form
    document.getElementById('reportForm').reset();
});
