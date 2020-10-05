// alert("hehehe");
let iaddress = "google.com";
let mymap;

calling(iaddress)

async function calling(address){

    let ipaddress;
    let domain;

    if( (address.match(/./g) || []).length !== 3){
        domain = address;
    }else{
        ipaddress = address;
    }

        try {
            const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_anM34U2gCZBMishgNeyw1WiJy4dxY&ipAddress=${ipaddress}&domain=${domain}`); 
            const data = await response.json();

            const locationcode = [data.location.lat , data.location.lng];
            const address = data.ip;
            const timezone = data.location.timezone;
            const country = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
            const isp = data.isp;

            getmap(locationcode);
            addinfo(address,timezone,country,isp);

        }catch(err){
            let error = "<p class='error'> Please provide valid IP address or domain name </p>";
            console.log("Invalid Input");
            console.log(err);
            document.querySelector(".search").insertAdjacentHTML("afterend", error)
        }
    }




function getmap(coordinates){

    if(mymap!=undefined){
        mymap.remove();
    }

    mymap = L.map('mapid').setView(coordinates, 13);
            
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1Ijoid2luc2VuIiwiYSI6ImNrZmRheWYzbzA0dDYyeHQ3NDkwbHZvN2UifQ.GnPvoiPZHPV-PqDNeJMPfw",
    }).addTo(mymap);

    var marker = L.marker(coordinates).addTo(mymap);

}


function getinput(){

    let userinput = document.getElementById("id-search").value;
    calling(userinput);
    document.getElementById("id-search").value = "";
    document.querySelector(".error").remove();
}


var input = document.getElementById("id-search");
input.addEventListener("keyup",function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        document.getElementById("mybtn").click();
    }
});



function addinfo(address,timezone,country,isp){
    document.querySelector(".info").innerHTML = "";


    document.getElementById("ip").innerHTML = `${address}`;
    document.getElementById("timezone").innerHTML = `${timezone}`;
    document.getElementById("location").innerHTML = `${country}`;
    document.getElementById("isp").innerHTML = `${isp}`;
}