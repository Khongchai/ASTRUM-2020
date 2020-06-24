
      var audio; 
      var check = true; 
      var theThingbeingDisplayed = null;
      var instructionText = document.getElementsByClassName("instructionText");
      var instructionTextLength = instructionText.length;

      var durText = document.getElementById("duration");
      var curText = document.getElementById("currentTime");


      var defPos = 0;
      var currentPos = 0;
      var timeShift = 0;
      var timer;


      

      var dragBox = document.getElementById("dragBox");

      
      document.addEventListener("DOMContentLoaded", () => 
      {
        //if does not exist or equals true  
        if ((localStorage.getItem("checkValLocal") === "true") || !localStorage.getItem("checkValLocal"))
        {
          check = false;
          setsound(check);
        }
        else
        {
          check = true;
          setsound(check);
        }     
      })
      

      //without this fucntion camera will save the changes; 
      //if user looks for other planets, the camera won't focus at the same place
      function openiFrame (reference)
      {
        if (reference === "mercuryframe")
        {
          document.querySelector("#iframemercury").src = "https://eyes.nasa.gov/apps/orrery/#/mercury?&close=true";
        }
        if (reference === "venusframe")
        {
          document.querySelector("#iframevenus").src = "https://eyes.nasa.gov/apps/orrery/#/venus?&close=true";
        }
        if (reference === "earthframe")
        {
          document.querySelector("#iframeEarth").src = "https://eyes.nasa.gov/apps/orrery/#/earth?&close=true";
        }
        if (reference === "marsframe")
        {
          document.querySelector("#iframeMars").src = "https://eyes.nasa.gov/apps/orrery/#/mars?&close=true";
        }
        if (reference === "jupiterframe")
        {
          document.querySelector("#iframejupiter").src = "https://eyes.nasa.gov/apps/orrery/#/jupiter?&close=true";
        }
        if (reference === "saturnframe")
        {
          document.querySelector("#iframesaturn").src = "https://eyes.nasa.gov/apps/orrery/#/saturn?&close=true";
        }
        if (reference === "uranusframe")
        {
          document.querySelector("#iframeuranus").src = "https://eyes.nasa.gov/apps/orrery/#/uranus?&close=true";
        }
        if (reference === "neptuneframe")
        {
          document.querySelector("#iframeNeptune").src = "https://eyes.nasa.gov/apps/orrery/#/neptune?&close=true";
        }
        
      }

      function setsound()
      {
        if (check)
        {
          
          if (audio != null)
          {
            DragBoxFadeOut();
            
            durText.innerHTML = "0:00";
            curText.innerHTML = "0:00";
          }
          check = false;
          document.querySelector("#soundcheck").innerHTML = "SOUND: OFF";
          localStorage.setItem("checkValLocal", check);
          
        }
        else
        {
          check = true;
          document.querySelector("#soundcheck").innerHTML = "SOUND: ON";

          //if something displayed and user click on SOUND "OFF"
          if (theThingbeingDisplayed != null)
          {
              
            DragBoxFadeIn();
            audio.addEventListener("loadedmetadata", textChange());
          
          }
          localStorage.setItem("checkValLocal", check);
        }

        
      }

      function displaysonClick(id)
      {
        openiFrame(id);

        //if user click on another planet without closing current
        if (theThingbeingDisplayed != null)
        {
          if (id != theThingbeingDisplayed)
          {
            if (audio != null)
            {              
              DragBoxFadeOut();
            }
            var displayedthing = document.getElementById(theThingbeingDisplayed);
            displayedthing.style.display = "none";
          }
        }
      

        var toBeDisplayed = document.getElementById(id);
        toBeDisplayed.src = toBeDisplayed.dataset.src;
        if (toBeDisplayed.style.display === "none")
        {
          
          audio = new Audio(toBeDisplayed.src);
          audio.volume = 0.6;
          if (check)
          {           
            DragBoxFadeIn();

            audio.addEventListener("loadedmetadata", textChange());
            dragBox.style.cursor = "grab";

          }
          theThingbeingDisplayed = id;
          toBeDisplayed.style.display = "block";
        }
        else
        {
          //check if to pause or to play a new audio sound with
          //if src of both files are equal; comes from the same destination: pause, else start the new sound
          if (audio != null)
          {
            DragBoxFadeOut();
          }
          toBeDisplayed.style.display = "none";
          theThingbeingDisplayed = null;
          
        }

      }
      var displayedBox;
      function displaysonOver(id)
      {
        //replace with new description
        if (displayedBox != null || displayedBox === document.getElementById(id))
        {
          displayedBox.style.opacity = 0;
          displayedBox.style.display = "none";
          displayedBox.className = "planetsubdesctext subtexthide";

          if (displayedBox === document.getElementById(id))
          {
            //only check first one
            if (instructionText[0].style.display === "block")
            {
              displayDescription(id);
            }
            else
            {
              for (var i = 0; i < instructionTextLength; i++)
              {
                instructionText[i].style.display = "block";
              }
            }  
          }
        }

        if (displayedBox != document.getElementById(id))
        {
          displayDescription(id);
        }    
      }

      function displayDescription(id)
      {
        displayedBox = document.getElementById(id);
        displayedBox.style.display = "block"; 
        displayedBox.className += " fadeinAnim";
        displayedBox.style.opacity = 1;

        //for instruction text
        for (var i = 0; i < instructionTextLength; i++)
        {
          instructionText[i].style.display = "none";
        } 
      }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



      function timetoText(dur, position) 
      {

        var min = Math.floor(dur / 60);
        var sec = Math.floor(dur % 60);
        if (sec < 10)
        {
            sec = "0" + sec;
        }
        if (position == "front")
        {
          return "← " + min + ":" + sec  + " /";   
        }
        else
        {
          return min + ":" + sec + " →";   
        }
         
      }


      dragBox.addEventListener("touchstart", pauseTime);
      dragBox.addEventListener("touchend", resumeTime);
      
      dragBox.addEventListener("mousedown", pauseTime);
      dragBox.addEventListener("mouseup", resumeTime);
      dragBox.addEventListener("mouseleave", resumeTime);
      

      function pauseTime(e)
      {
          if (audio != null)
          {
              if (e.type === "mousedown")
              {
                //makes dragBox full so user can drag everywhere
                dragBox.style.cursor = "ew-resize"


                defPos = e.clientX;

                audio.pause();

                dragBox.addEventListener("mousemove", incrementTime);
              }
              else 
              {
                //makes dragBox full so user can drag everywhere
                dragBox.style.cursor = "ew-resize"


                defPos = e.touches[0].clientX;

                audio.pause();

                dragBox.addEventListener("touchmove", incrementTime);
              }
              
          }    
      }
      function resumeTime()
      {
          if (audio != null)
          {

              //returns width to default size
              dragBox.style.height = "auto"

              //change cursor type back
              dragBox.style.cursor = "grab";

              //change display type back
              dragBox.style.position = "absolute";

              //change defPos back to 0
              defPos = 0;

              audio.play();

              //remove mousemovelistener
              dragBox.removeEventListener("touchmove", incrementTime);
              dragBox.removeEventListener("mousemove", incrementTime);
          }
      }

      function incrementTime(e)
      {
        if (e.type === "mousemove")
        {
          currentPos = e.clientX;
          //function for detecting mouse stop then assign new value to defPos using current clientX
          clearTimeout(timer);
          timer = setTimeout(relogDefaultPosition,66);

          
          if (defPos < e.clientX) 
          { 
              shiftAudio(-6.5);
          }
          else 
          { 
              shiftAudio(6.5);
          }   
        }
        else
        {
          
          currentPos = e.touches[0].clientX;
          //function for detecting mouse stop then assign new value to defPos using current clientX
          clearTimeout(timer);
          timer = setTimeout(relogDefaultPosition,66);

          
          if (defPos < e.touches[0].clientX) 
          { 
            console.log("right");
              shiftAudio(-6.5);
          }
          else 
          { 
            console.log("left");
              shiftAudio(6.5);
          } 

        }
                  

      }

      function shiftAudio(shiftVal)
      {
          audio.currentTime -= shiftVal;
          timeShift = 0;
      }

      function relogDefaultPosition()
      {
          defPos = currentPos;
      }

      function textChange()
      {        
        audio.addEventListener("timeupdate", () => 
        {
          if (isNaN(audio.duration))
          {
            durText.innerHTML = "";
            curText.innerHTML = "Audio is loading; please wait";

            //turn off slash and arrows
            /*
            document.getElementById("slash").style.opacity = 0;
            for (obj of arrows)
            {
              obj.style.opacity = 0;
            }
            */
          }
          else
          {
            //check so only do once
            /*
            if (durText.innerHTML === "")
            {
              /
              document.getElementById("slash").style.opacity = 1;
              for (obj of arrows)
              {
                obj.style.opacity = 1;
              }
              
            }
            */

            durText.innerHTML = timetoText(audio.duration, "back");
            curText.innerHTML = timetoText(audio.currentTime, "front");
            if (curText.innerHTML === durText.innerHTML) 
            {
                //prevents current duration from exceeding duration
                curText.innerHTML = durText.innerHTML;
            }
          }
          
        });
      }

      function DragBoxFadeIn()
      {
        if (audio != null)
        {
          audio.play();
          dragBox.classList.remove("dragBoxOut");
          dragBox.classList.add("dragBoxIn");
        }
        
      }

      function DragBoxFadeOut()
      {
        if (audio != null)
        {
          audio.pause();
          audio.currentTime = 0;
          dragBox.classList.remove("dragBoxIn");
          dragBox.classList.add("dragBoxOut");
        }
        
      }
