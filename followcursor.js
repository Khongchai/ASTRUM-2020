var system = document.querySelectorAll(".planetsCursorContainer");
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

var lastmouse = new Array(3);
var difference = new Array(3);
for (var i = 0; i < planets.length; i++)
{
    lastmouse[i]  = {x: 0, y: 0};
    difference[i] = {x: 0, y: 0};
}



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
        for (planet of system)
        {
            $(planet).hide();
        }
        
    }
    else if (!animStat || animStat ==="on")
    {
        onOffButton.innerHTML = "ANIMATION: ON";
        for (planet of system)
        {
            $(planet).show();
        }
    }
    if (prevX != 0 && prevY != 0)
    {
        
        for (planet of planets)
        {
            $(planet).addClass("pulseanim");   
        }
        for (planet of system)
        {
            $(planet).css({left: prevX, top: prevY});
        }
        
    }

    onOffButton.onclick = () => 
    {

        if (onOffButton.innerHTML === "ANIMATION: ON")
        {
            onOffButton.innerHTML = "ANIMATION: OFF";
            localStorage.setItem("AnimStat", "off");
            
            for (planet of system)
            {
                $(planet).hide();
            }
        }
        else
        {
            onOffButton.innerHTML = "ANIMATION: ON";
            localStorage.setItem("AnimStat", "on");

            for (planet of system)
            {
                $(planet).show();
            }

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

        for (obj of lastmouse)
        {
            obj.x = e.clientX;
            obj.y = e.clientY;
        }
        
    }

    curmouse.x = e.clientX;
    curmouse.y = e.clientY;
});



function mousetrack()
{
    requestAnimationFrame(mousetrack);

    var speedDif = 0.070;

    //drag effect
    //mousetrack 1
    for (var i = 0; i < planets.length; i++)
    {
        difference[i].x = (curmouse.x - lastmouse[i].x) * speedDif;
        difference[i].y = (curmouse.y - lastmouse[i].y) * speedDif;
        lastmouse[i].x += difference[i].x;
        lastmouse[i].y += difference[i].y;
        console.log(difference[i].x);
        speedDif -= 0.020;

        //mouse track -- if mouse has been moved; location no longer equals to 0; starting point
        if(lastmouse[i].x != 0 && lastmouse[i].y != 0)
        {
            $(system[i]).css({left: lastmouse[i].x, top:lastmouse[i].y});
            localStorage.setItem("mouseX", curmouse.x);
            localStorage.setItem("mouseY", curmouse.y);
        }  
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

