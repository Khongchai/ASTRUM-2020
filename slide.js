    var dragItem = document.querySelector("#allplanets");
    var container = document.querySelector("#planetsContainer");


    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    planetsContainer.addEventListener("touchstart", dragStart, false);
    planetsContainer.addEventListener("touchend", dragEnd, false);
    planetsContainer.addEventListener("touchmove", drag, false);

    planetsContainer.addEventListener("mousedown", dragStart, false);
    planetsContainer.addEventListener("mouseup", dragEnd, false);
    planetsContainer.addEventListener("mousemove", drag, false);

    function dragStart(e)  //e is event pass as a parameter
    {
      if (e.type === "touchstart") 
      {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      if (e.target === dragItem) {
        active = true;
      }
    }

    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;

      active = false;
    }

    function drag(e) {
      if (active) {
      
        e.preventDefault();
      
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, 0, dragItem); //to make move only horizontally, put a constant in Y value
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }