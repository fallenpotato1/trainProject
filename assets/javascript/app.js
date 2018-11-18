var config = {
  apiKey: "AIzaSyAsqNeQc895WRElJXqkf977FQ0Q9FhH7bs",
  authDomain: "trainstationproject.firebaseapp.com",
  databaseURL: "https://trainstationproject.firebaseio.com",
  projectId: "trainstationproject",
  storageBucket: "trainstationproject.appspot.com",
  messagingSenderId: "595521888316"
};
firebase.initializeApp(config);
 
 
 var database = firebase.database();
 
 function clear() {
    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");
 }
 
 $("#submitBtn").on("click", function(event) {
 
 // Grabbed values from text boxes
 name = $("#trainName").val().trim();
 destination = $("#destination").val().trim();
 trainTime = $("#trainTime").val().trim();
 frequency = $("#frequency").val().trim();
 
 // Code for handling the push
 
 var newTrain = {
   name: name,
   destination: destination,
   trainTime: trainTime,
   frequency: frequency,
   }

  database.ref().push(newTrain)
  clear();
 
 });
 
 
 
 database.ref().on("child_added", function(childSnapshot) {
    var name = childSnapshot.val().name
    var destination = childSnapshot.val().destination
    var trainTime = childSnapshot.val().trainTime
    var frequency = childSnapshot.val().frequency

    var rightNow = moment().format("HHmm")
    var numberOnly = trainTime.replace(":", "")
    var numberTime = parseInt(numberOnly)
    var frequencyTime = parseInt(frequency)

    setInterval( function() {
      
      var newTime = moment().format("HHmm").add(frequencyTime, "m")
      console.log(newTime)
    }, 300)

    


    $(`
    <tr>
        <td scope="row"> ${name} </td>
        <td>${destination}</td>
        <td>${"not done yet"}</td>
        <td>${frequency}</td>
        <td>${"not done yet"}</td>
    </tr>
    `).appendTo('#newTrain')
 
 })