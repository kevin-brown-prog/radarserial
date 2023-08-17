

// blob:chrome-extension%3A//bmnblgpojbjdapehlahepjelclghjfjf/eac94ad2-d2aa-4673-90a7-4b249bb7f81a
// indexedDB.deleteDatabase('blob:chrome-extension*');

async function  monitor(port) {
      console.log('monitor()')
	  const decoder = new TextDecoder();
	  velos = []
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
            const decoded = decoder.decode(value)
            console.log('read complete:', decoded, value, done)
			sbuffer = subffer + decoded;
            for(let i = 0; i < sbuffer.length;i++)
			{
				if(sbuffer[i] == '\r')
				{
					velo = sbuffer.slice(o,i);
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
  
  
});




	
}




document.addEventListener('DOMContentLoaded', windowInitialized, false);




window.onload = function () {

};









