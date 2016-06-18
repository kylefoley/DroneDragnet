/**
 * Created by kyle and matt on 6/17/16.
 */


////////////////////////////////////////////////////Initial Powerup//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////Get Namespace///////////////////////////////////////////////////////////////////
var namespace = "";
var msgdata={};
var ip="flytpod:9090";
$.ajax({
    type: "POST",
    dataType: "json",
    data: JSON.stringify(msgdata),
    url: "http://"+ip+"/ros/get_global_namespace",
    success: function (data){
        if(data.success){
            namespace=data.param_info.param_value;//If success, writes  actual namespace to namespace
        }

    },
    error: function(data) {
        document.write("Check Connection to FlytPOD")
    }
});
/////////////////////////////////////////////////////////Initilize websocket/////////////////////////////////////////////////////
var  ros= new ROSLIB.Ros({
    url : "ws://"+ip+"/websocket"
});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
});

ros.on('error', function() {
    console.log('Error connecting to websocket server.', error);
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});
//////////////////////////////////////////////////////////////Battery Level//////////////////////////////////////////////////////

$.ajax({
    type: "GET",
    dataType: "json",
    url: "http://"+ip+"/ros/"+namespace+"/mavros/battery",
    success: function(data){
        console.log(data);
    }
});



///////////////////////////////////////////////////////////Drone Detected////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////Setting Waypoints//////////////////////////////////////////////////////////////


    var  msgdata=[];
    msgdata[1]={};
    msgdata[1]["frame"]=3;
    msgdata[1]["command"]= 16;
    msgdata[1]["is_current"]= false;
    msgdata[1]["autocontinue"]= true;
    msgdata[1]["param1"]= 0;
    msgdata[1]["param2"]= 1;
    msgdata[1]["param3"]= 0;
    msgdata[1]["param4"]= 0;
    msgdata[1]["x_lat"]= 43.043141;
    msgdata[1]["y_long"]= -76.114993;
    msgdata[1]["z_lat"]= 10;


    $.ajax({
        type: "POST",
        dataType: "json",
        data: JSON.stringify(msgdata),
        url: "http://"+ip+"/ros/"+namespace+"/navigation/waypoint_set",
        success: function (data){
            console.log(data);
        },

        error: function (data) {
            document.write("Try again, asshole")


        }
    });
//////////////////////////////////////////////////////////Take Off//////////////////////////////////////////////////////////////////////////////

var msgdata={};
msgdata["takeoff_alt"]=4.00;
$.ajax({
    type: "POST",
    dataType: "json",
    data: JSON.stringify(msgdata),
    url: "http://"+ip+"/ros/"+namespace+"/navigation/take_off",
    success: function(data){
        console.log(data);
    }
});

///////////////////////////////////////////////////////////Make Decision///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////Initiate Capture Button/////////////////////////////////////////////////////////////

$("#Initatiate_Capture").click(function() {

    var  msgdata={};

    $.ajax({
        type: "POST",
        dataType: "json",
        data: JSON.stringify(msgdata),
        url: "http://"+ip+"/ros/"+namespace+"/navigation/waypoint_execute",
        success: function(data){
            document.write("omw");
        },

        error: function(data){
            document.write("Ya can't get there from here")
        }
        })

    });

//////////////////////////////////////////////////////////Disengage Button//////////////////////////////////////////////////////////////
$("#Disengage").click(function() {


    msgdata["app_name"] = "app2";
    msgdata["arguments"] = "3";


    $.ajax({
        type: "POST",
        dataType: "json",
        data: JSON.stringify(msgdata),
        url: "http://"+ip+"/ros/"+namespace+"/navigation/exec_script",
        success: function (data) {
            document.write("Poop")
        },

        error: function (data) {
            document.write("Neverrr")


        }
    });
})
