var ThingSpeakClient = require('thingspeakclient');
var client = new ThingSpeakClient();

var myWriteKey = 'O0G5417DH0UT1MMG';
var channelID = 926237;

var sense = require("node-sense-hat");
var imu=sense.Imu;
var IMU = new imu.IMU();

var temp = 0;
var press = 0;
var hum =0;


IMU.getValue(function(e,data){
	temp =(Math.round(data.temperature*100)/100)-11.38;
	press = Math.round(data.pressure*100)/100;
	hum = Math.round(data.humidity*100)/100;
	console.log("temperature: "+temp+"\n pressure: "+press+"\n humidity: "+hum);
});


client.attachChannel(channelID, { writeKey:'myWriteKey'}, callBackThingspeak);


client.updateChannel(channelID, {field1: temp , field2: press , field3: hum}, function(err, resp) {
	if(!err && resp >0) {
		console.log('update successful. Entry number was: ' + resp);
	}
	else{
		console.log("Unsuccessful.")
		console.log(err);
	}
});

function callBackThingspeak(err, resp)
{
    if (!err && resp > 0) {
        console.log('Successfully. response was: ' + resp);
    }
    else {
      console.log(err);
    }
}

