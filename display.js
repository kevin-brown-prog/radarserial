

// blob:chrome-extension%3A//bmnblgpojbjdapehlahepjelclghjfjf/eac94ad2-d2aa-4673-90a7-4b249bb7f81a
// indexedDB.deleteDatabase('blob:chrome-extension*');
let first_reading=true;
let first_reading_time;
let last_read_time=null;
let velos = []
async function  monitor(port) {
      console.log('monitor()')
	  const decoder = new TextDecoder();
	 
	  sbuffer="";
      while (port.readable) {
        
        const reader = port.readable.getReader()
       
        try {
          while (this.open) {
            console.log('reading...')
            const { value, done } = await reader.read()
            if (done) {
              // |reader| has been canceled.
              this.open = false
              break;
            }
			last_read_time = new Date();
			if(first_reading)
			{
				first_reading=false;
				first_reading_time=new Date();
			}
            const decoded = decoder.decode(value)
            console.log('read complete:', decoded, value, done)
			sbuffer = sbuffer + decoded;
            for(let i = 0; i < sbuffer.length;i++)
			{
				if(sbuffer[i] == '\r')
				{
					velo = sbuffer.slice(0,i);
					sbuffer = sbuffer.substring(i+1);
					document.getElementById('lastVelocity').innerText = document.getElementById('velocity').innerText;
					document.getElementById('velocity').innerText = velo;
					velos.push(parseFloat(velo));
					
					break;
				}
			}
          }
        } catch (error) {
          console.error('reading error', error)
        } finally {
          reader.releaseLock()
        }
      }
    }
	
function timerCallback(){
	let current = new Date();
	let diff = current-last_read_time;
	if(diff > 1000 && velos.length != 0)
	{
		var max_velo = Math.max(...velos);
		if(chrome.tts){
			chrome.tts.speak();
		}
		const utterance = new SpeechSynthesisUtterance("" + max_velo);
        speechSynthesis.speak(utterance);
		last_read_time = current;
		velos= [];
	}
}

 function windowInitialized() {






	
		window.addEventListener("beforeunload", function (e) {
			
			//e.preventDefault();
			//return "Alert this will cause you to lose your session";                            //Webkit, Safari, Chrome
		});


	//chrome.tts.speak('Hello, world.');
document.querySelector('button').addEventListener('click', async () => {
  // Prompt user to select any serial port.
  const port = await navigator.serial.requestPort();
  await port.open({ baudRate: 9600 });
  document.getElementById('top-button').style.display = 'none';
  monitor(port);
  window.setInterval(timerCallback, 100);
  
});




	
}




document.addEventListener('DOMContentLoaded', windowInitialized, false);




window.onload = function () {

};









