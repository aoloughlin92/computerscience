import urllib2
import  json
import  time
from sense_hat import SenseHat

WRITE_API_KEY='O0G5417DH0UT1MMG'

baseURL='https://api.thingspeak.com/update?api_key=%s' % WRITE_API_KEY

sense = SenseHat()

def writeData(temp,press,hum):
    # Sending the data to thingspeak in the query string
    conn = urllib2.urlopen(baseURL + '&field1=%s&field2=%s&field3=%s' % (temp,press,hum))
    print(conn.read())
    # Closing the connection
    conn.close()
	
def restart():
    command = "/usr/bin/sudo /sbin/shutdown -r now"
    import subprocess
    process = subprocess.Popen(command.split(), stdout=subprocess.PIPE)
    output = process.communicate()[0]
    print output


while True:
	try:
	  while True:
		temperature=sense.get_temperature()-11.38
   	 	temp=round(temperature,2)
          	press=round(sense.get_pressure(),2)
          	hum=round(sense.get_humidity(),2)
		if(temp>-10 and temp<30 and press>0 and press<1500 and hum>0 and hum<150):
		 break;
          writeData(temp,press,hum)
 	  time.sleep(120)       

	except:
		time.sleep(480)
	 	try:
		  while True:
                	temperature=sense.get_temperature()-11.38
                	temp=round(temperature,2)
                	press=round(sense.get_pressure(),2)
                	hum=round(sense.get_humidity(),2)
                	if(temp>-10 and temp<30 and press>0 and press<1500 and hum>0 and hum<150):
                 	  break;
                  writeData(temp,press,hum)
                  time.sleep(120)

		except:
	  	  restart()


