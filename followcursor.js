var system = document.querySelector("#planetsCursorContainer");
var planets = document.querySelectorAll(".planetsCursor");
var onOffButton = document.querySelector("#turnOffAnim");


//planet object
var planetObj = [
    {
        //1 
        "velocity": 0.04,
        "x": -5,
        "y": 28,
        "radians": 0,
        "size": 1.1
        
    },
    {
        //2 
        "velocity": 0.03,
        "x": -3,
        "y": 10,
        "radians": 0,
        "size": 1.55
    },
    {   //3
        "velocity": 0.02,
        "x": -1,
        "y": -10,
        "radians": 0,
        "size": 1.7
        
    }

];
for (var i = 0; i < planets.length; i++)
{
    planetObj[i].planetNode = planets[i];
}



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

    
    var animStat = localStorage.getItem("AnimStat");
    if (animStat === "off")
    {
        onOffButton.innerHTML = "ANIMATION: OFF";
        $("#planetsCursorContainer").hide();
    }
    else if (!animStat || animStat ==="on")
    {
        onOffButton.innerHTML = "ANIMATION: ON";
        $("#planetsCursorContainer").show();
    }
    

    if (prevX != 0 && prevY != 0)
    {
        
        for (planet of planets)
        {
            $(planet).addClass("pulseanim");   
        }
        $(system).css({left: prevX, top: prevY});
    }

    onOffButton.onclick = () => 
    {
        if (onOffButton.innerHTML === "ANIMATION: ON")
        {
            onOffButton.innerHTML = "ANIMATION: OFF";
            localStorage.setItem("AnimStat", "off");
            $("#planetsCursorContainer").hide();
        }
        else
        {
            onOffButton.innerHTML = "ANIMATION: ON";
            localStorage.setItem("AnimStat", "on");
            $("#planetsCursorContainer").show();;

        }
    
    }
    
});




$(document).mousemove(function(e)
{
    if (!curmouse.x && !curmouse.y)
    {
        for (planet of planets)
        {
            $(planet).addClass("pulseanim");   
        }

        lastmouse.x = e.clientX;
        lastmouse.y = e.clientY;
    }

    curmouse.x = e.clientX;
    curmouse.y = e.clientY;
});



function mousetrack()
{
    requestAnimationFrame(mousetrack);


    //drag effect
    //mousetrack 1
    difference.x = (curmouse.x - lastmouse.x) * 0.050;
    difference.y = (curmouse.y - lastmouse.y) * 0.050;

    lastmouse.x += difference.x;
    lastmouse.y += difference.y;


    //mouse track
    if(lastmouse.x != 0 && lastmouse.y != 0)
    {
        $(system).css({left: lastmouse.x, top:lastmouse.y});
        localStorage.setItem("mouseX", lastmouse.x);
        localStorage.setItem("mouseY", lastmouse.y);
    }  
}



function initOrbit()
{
    requestAnimationFrame(initOrbit);
    

    for (planet of planetObj)
    {
        planet.radians += planet.velocity;
        planet.y += Math.sin(planet.radians) * planet.size;
        planet.x += Math.cos(planet.radians) * planet.size; //first constant is original position, change value to variable when have more planets
        $(planet.planetNode).css({left: planet.x , top: planet.y - 60});
        //console.log(x);
    }
}

