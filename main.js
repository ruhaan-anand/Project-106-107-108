Webcam.set({
    width:300,
    height:300,
    image_format:"png",
    png_quality:90
});

Webcam.attach('#webcam')

function take_snapshot(){

    Webcam.snap(function(datauri){
        document.getElementById("captured-image").innerHTML= '<img id="result-image" src="'+datauri+'"/>';
    })
};

 classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6ubJOas3l/model.json',modelLoaded);

 function modelLoaded(){}

 function speak(){
    var synth = window.speechSynthesis;
    speech_1 = "The prediction is"+prediction1;
    var utterThis = new SpeechSynthesisUtterance(speech_1);
    synth.speak(utterThis);
 }

 function check(){
    var image = document.getElementById("result-image");
    classifier.classify(image,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("gesture").innerHTML=results[0].label;
        prediction1=results[0].label;
        speak();
        
        if(results[0].label=="Victory"){
           document.getElementById("gesture-emoji").innerHTML="&#9996"
       }
       if(results[0].label=="Best"){
           document.getElementById("gesture-emoji").innerHTML="&#128077"
       }
       if(results[0].label=="Amazing"){
           document.getElementById("gesture-emoji").innerHTML="&#128076"
       }
       if(results[0].label=="Loser"){
           document.getElementById("gesture-emoji").innerHTML="&#128070"
       }
       if(results[0].label=="Rock"){
           document.getElementById("gesture-emoji").innerHTML="&#129304"
       }
    } 
    

}

