var Config = {
    apiKey: "AIzaSyD7PHkm3N-peZzgCdzfFuCnyu84glDte6w",
    authDomain: "sept24thinclass-first-project.firebaseapp.com",
    databaseURL: "https://sept24thinclass-first-project.firebaseio.com/",
    projectId: "sept24thinclass-first-project",
    storageBucket: "sept24thinclass-first-project.appspot.com",
    messagingSenderId: "94744820953",
    appId: "1:94744820953:web:5ca85ecf99eef3619052c8",
    measurementId: "G-LQ2FCYTTNW"
  };
firebase.initializeApp(Config);

var database = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-input").val().trim();
    console.log(trainName);
    var destination = $("#destination-input").val().trim();
    console.log(destination);
    var startTime = moment($("#start-input").val().trim(), "HH:mm").subtract(1, "years");
    console.log(startTime);
    var frequency = $("#frequency-input").val();
    console.log(frequency);

    var trainInfo = {
        name: trainName,
        destination: destination,
        start: startTime._i,
        frequency: frequency
    };

    database.ref().push(trainInfo);

    console.log(trainInfo.name);
    console.log(trainInfo.destination)
    console.log(trainInfo.start);
    console.log(frequency.frequency);
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var startTime = childSnapshot.val().start;
    var frequency = parseInt(childSnapshot.val().frequency);
    console.log(typeof frequency);


    
    var diffTime = moment().diff(moment(startTime, "HH:mm"), "minutes");
    console.log("difference in time: " + diffTime);
    var tRemainder = diffTime % frequency;
    console.log("remainder: " + tRemainder);
    var minutesAway = frequency - tRemainder;
    console.log("minutes away: " + minutesAway);
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("arrival time: " + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(moment(nextTrain).format("hh:mm")),
        $("<td>").text(minutesAway)
    );


    $("#trainSchedule > tbody").append(newRow);





});