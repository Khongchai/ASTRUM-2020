var system = document.querySelector("#planetsCursorContainer");
var planets = document.querySelectorAll(".planetsCursor");
var onOffButton = document.querySelector("#turnOffAnim");


//planet object
var planetObj = [
    {
        //1 - Mercury
        "velocity": 0.15,
        "x": -5,
        "y": 28,
        "radians": 0,
        "size": 3
        
    },
    {
        //2 - Venus
        "velocity": 0.11,
        "x": -5,
        "y": 20,
        "radians": 0,
        "size": 3
    },
    {   //3 - Earth
        "velocity": 0.07,
        "x": -10,
        "y": 10,
        "radians": 0,
        "size": 3
    },
    {   //4 - Mars
        "velocity": 0.05,
        "x": 0,
        "y": 0,
        "radians": 0,
        "size": 3
    },
    {   //5 - Jupiter
        "velocity": 0.04,
        "x": 0,
        "y": -20,
        "radians": 0,
        "size": 4
    },
    {   //6 - Saturn
        "velocity": 0.03,
        "x": 0,
        "y": -50,
        "radians": 0,
        "size": 4
    },
    {   //7 - Uranus
        "velocity": 0.025,
        "x": 0,
        "y": -86,
        "radians": 0,
        "size": 4
    },
    {   //8 - Neptune
        "velocity": 0.015,
        "x": 0,
        "y": -180,
        "radians": 0,
        "size": 4
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
    //after everything is finished implement different drag speed or different planets too
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

