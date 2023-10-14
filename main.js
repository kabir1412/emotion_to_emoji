prediction_1 = "";
prediction_2 = "";

Webcam.set({
width: 350,
height: 300,
image_format:"png",
png_quality: 120     
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){
Webcam.snap(function (data_uri){
document.getElementById("result").innerHTML = '<img src="'+data_uri+'" id="result_img"/>';   
});    
}

console.log("ml5 version:", ml5.version);
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/mnajpRJaq/model.json", modelLoaded);
 
function modelLoaded(){
console.log("Model Loaded");    
}

function speak(){
var synth= window.speechSynthesis;
speak_1 = "The first prediction is " + prediction_1;
speak_2 = "and the second prediction is" + prediction_2;
var utterThis = new SpeechSynthesisUtterance(speak_1 + speak_2);    
synth.speak(utterThis);
}

function identify_emotion(){
img = document.getElementById("result_img");
classifier.classify(img, gotResults);
}

function gotResults(error, results){
if (error){
console.log(error);    
}   
else{
console.log(results);   

document.getElementById("emotion1").innerHTML = results[0].label;
document.getElementById("emotion2").innerHTML = results[1].label;

prediction_1 = results[0].label;
prediction_2 = results[1].label;
speak();

if(results[0].label == "Happy"){
document.getElementById("emoji1").innerHTML = "&#128522;";    
}
if(results[0].label == "Sad"){
document.getElementById("emoji1").innerHTML = "&#128532;";    
}
if(results[0].label == "Angry"){
document.getElementById("emoji1").innerHTML = "&#128532;";
}
if(results[0].label == "Shocked"){
document.getElementById("emoji1").innerHTML = "&#128512;";
}
if(results[1].label == "Happy"){
    document.getElementById("emoji2").innerHTML = "&#128522;";    
    }
    if(results[1].label == "Sad"){
    document.getElementById("emoji2").innerHTML = "&#128532;";    
    }
    if(results[1].label == "Angry"){
    document.getElementById("emoji2").innerHTML = "&#128532;";
    }
    if(results[1].label == "Shocked"){
    document.getElementById("emoji2").innerHTML = "&#128512;";
    }
} 
}