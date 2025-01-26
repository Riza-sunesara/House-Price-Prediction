function getBathValue() {
    var uiBathrooms = document.getElementById("uiBathrooms");
    var bathValue = parseInt(uiBathrooms);
    if (bathValue >= 1 && bathValue <= 5) {
        return bathValue;
    }
    return -1;
}

function getBHKValue() {
    var uiBHK = document.getElementById("rooms").value;
    var bhkValue = parseInt(uiBHK);
    if (bhkValue >= 1 && bhkValue <= 5) {
      return bhkValue;
    }
    return -1;
  }

function onClickedPredictPrice() {

    // event.preventDefault();

    console.log("Predict Price button clicked!");
    var sqft=document.getElementById("uiSqft");
    var location=document.getElementById("location");
    var prediction=document.getElementById("uiPredictedPrice");
    var bhk=getBHKValue();
    var bath=getBathValue();
    var url= "http://127.0.0.1:5000/predict_house_price";

    $.post(url,{
        total_sqft: parseFloat(sqft.value),
        bhk:bhk,
        bath:bath,
        location:location.value
    },function(data, status) {
        console.log(data.estimated_price);
        prediction.value = data.estimated_price.toString() + " Lakh"; 
        console.log(status);
    })
}

function onPageLoad(){
    console.log("Document Loaded!");
    var url="http://127.0.0.1:5000/get_loc";
    $.get(url,function(data,status){
        console.log("Got response for get_loc request");
        if(data){
            var locations =data.locations;
            var location=document.getElementById(location);
            $('#location').empty();
            for(var i in locations){
                var opt=new Option(locations[i]);
                $('#location').append(opt);
            }
        }        
    });
}

window.onload=onPageLoad;

// document.getElementById('house-details-form').addEventListener('submit', function (e) {
//     e.preventDefault();

//     const location = document.getElementById('location').value;
//     const bathrooms = document.getElementById('bathrooms').value;
//     const owner = document.getElementById('owner').value;
//     const country = document.getElementById('country').value;
//     const date = document.getElementById('date').value;
//     const houseType = document.querySelector('input[name="type"]:checked').value;

//     console.log('Form Details:', {
//         location,
//         bathrooms,
//         owner,
//         country,
//         date,
//         houseType
//     });

//     // Call prediction logic (stubbed here)
//     alert('Prediction process started for location: ' + location);
// });

// document.getElementById('predict').addEventListener('click', function () {
//     alert('Redirecting to prediction page...');
// });

// document.getElementById('try-demo').addEventListener('click', function () {
//     alert('Demo initiated!');
// });

// // Dynamic Dropdown Population
// const locationDropdown = document.getElementById('location');
// const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

// locations.forEach(location => {
//     const option = document.createElement('option');
//     option.value = location;
//     option.textContent = location;
//     locationDropdown.appendChild(option);
// });