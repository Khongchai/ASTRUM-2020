var rightBar = document.getElementById("sidebarMobile");
        document.addEventListener("DOMContentLoaded", function()
        {
            var HamburgerIcon = document.getElementById("hamburgerActivate");

            rightBar.style.opacity = "0";
            HamburgerIcon.style.position = "absolute";
            HamburgerIcon.style.color = "#826046";
            rightBar.style.left = "1000px";

            document.querySelector("#hamburgerActivate").onclick = () => 
            {
                
                if (rightBar.style.opacity === "0")
                {
                    HamburgerIcon.style.position = "fixed";
                    HamburgerIcon.style.color = "#F7F9E0";
                    rightBar.style.left = "auto";
                    var op = 0;
                    var opacityChange = setInterval(() => 
                    {
                        if (op >= 1)
                        {
                            clearInterval(opacityChange);
                        }
                        else
                        {
                            op += 0.05;
                            rightBar.style.opacity = op;
                        }
                        
                    },10)
                }
                else
                {
                    HamburgerIcon.style.position = "absolute";
                    HamburgerIcon.style.color = "#826046";

                    var op = 1;
                    var opacityChange = setInterval(() => 
                    {
                        if (op <= 0)
                        {
                            clearInterval(opacityChange);
                            rightBar.style.opacity = 0;
                        }
                        else
                        {
                            op -= 0.05;
                            rightBar.style.opacity = op;
                        }
                    },10)
                    setTimeout(() => {rightBar.style.left = "1000px";}, 200);
                    
                }
            }
        });

        