var globe = document.querySelector("#globe");
var curmouse = {x: 0, y: 0};
var lastmouse  = {x: 0, y: 0};
var difference = {x: 0, y: 0}

//make mouse position consistent throughout every page
document.addEventListener("DOMContentLoaded", () => 
{

    mousetrack();
    initOrbit();

    prevX = parseFloat(localStorage.getItem("mouseX"));
    prevY = parseFloat(localStorage.getItem("mouseY"));

    if (prevX != 0 && prevY != 0)
    {
        $(globe).addClass("pulseanim");
        $(globe).css({left: prevX, top: prevY});
    }
    
});



$(document).mousemove(function(e)
{
    if (!curmouse.x && !curmouse.y)
    {
        $(globe).addClass("pulseanim");

        lastmouse.x = e.clientX;
        lastmouse.y = e.clientY;
    }

    curmouse.x = e.clientX;
    curmouse.y = e.clientY;
});

function mousetrack()
{
    key = requestAnimationFrame(mousetrack);


    //drag effect
    difference.x = (curmouse.x - lastmouse.x) * 0.120;
    difference.y = (curmouse.y - lastmouse.y) * 0.120;

    lastmouse.x += difference.x;
    lastmouse.y += difference.y;


    //mouse track
    if(lastmouse.x != 0 && lastmouse.y != 0)
    {
        $(globe).css({left: lastmouse.x + 30, top:lastmouse.y - 2});
        localStorage.setItem("mouseX", lastmouse.x + 30);
        localStorage.setItem("mouseY", lastmouse.y -2);
    }  
}

function initOrbit()
{
    
}

