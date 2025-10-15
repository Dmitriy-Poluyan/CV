var snow_container = document.getElementById("snow");
for (var snow_layers = []; snow_layers.length < 43; snow_layers.push("                                                                                "));
var row = column = false;
var snow_plow = 0;
var snow_plow_ascii = ["           _________                     ",
    "       ____|   |    \\                    ",
    "       |   |   \\     \\          ___      ",
    "_______|___/    \\_____\\_______  |  |     ",
    "|                             \\ |  \\     ",
    "|   _____              _____  |_|   \\    ",
    "|  / ___ \\            / ___ \\ |_|    \\   ",
    "\\_/ /   \\ \\__________/ /   \\ \\| |     \\  ",
    "    [   ]              [   ]    |      \\ ",
    "    \\___/              \\___/    \\_______\\"];
snow_plow_ascii.reverse();
var christmas_lights = document.getElementsByClassName("needles");
var christmas_lights_timer = 0;
function main_loop() {
    // Snowflakes creation
    var snow_string = "";
    for (let i = 0; i < snow_layers[0].length; i++) {
        if (Math.random() < 0.01)
            snow_string += "*";
        else
            snow_string += " ";
    }
    snow_layers.push(snow_string);
    // Check if the screen is getting filled and show a prompt
    if (document.getElementById("prompt") && snow_layers[0] == "*".repeat(80))
        document.getElementById("prompt").style.display = "inline";
    // Updating EVERY symbol
    for (let layer = 0; layer<snow_layers.length; layer++) {
        for (let j = snow_layers[layer].length-1; j>=0; j--) {
            // Snow physics
            if (snow_layers[layer][j] == "*" && layer != 0) {
                if (snow_layers[layer-1][j] == " ") {
                    snow_layers[layer-1] = snow_layers[layer-1].substring(0, j) + snow_layers[layer][j] + snow_layers[layer-1].substring(j+1);
                    snow_layers[layer] = snow_layers[layer].substring(0, j) + " " + snow_layers[layer].substring(j+1);
                }
                else if (snow_layers[layer-1][j-1] == " " && snow_layers[layer-1][j+1] == " ") {
                    if (Math.floor(Math.random()*2) == 0) {
                        snow_layers[layer-1] = snow_layers[layer-1].substring(0, j-1) + snow_layers[layer][j] + snow_layers[layer-1].substring(j);
                        snow_layers[layer] = snow_layers[layer].substring(0, j) + " " + snow_layers[layer].substring(j+1);
                    }
                    else {
                        snow_layers[layer-1] = snow_layers[layer-1].substring(0, j+1) + snow_layers[layer][j] + snow_layers[layer-1].substring(j+2);
                        snow_layers[layer] = snow_layers[layer].substring(0, j) + " " + snow_layers[layer].substring(j+1);
                    }
                }
                else if (snow_layers[layer-1][j-1] == " ") {
                    snow_layers[layer-1] = snow_layers[layer-1].substring(0, j-1) + snow_layers[layer][j] + snow_layers[layer-1].substring(j);
                    snow_layers[layer] = snow_layers[layer].substring(0, j) + " " + snow_layers[layer].substring(j+1);
                }
                else if (snow_layers[layer-1][j+1] == " ") {
                    snow_layers[layer-1] = snow_layers[layer-1].substring(0, j+1) + snow_layers[layer][j] + snow_layers[layer-1].substring(j+2);
                    snow_layers[layer] = snow_layers[layer].substring(0, j) + " " + snow_layers[layer].substring(j+1);
                }
            }
            // Snow plow movement
            if (snow_layers[layer][j] != "*" && snow_layers[layer][j] != " ") {
                if (j == snow_layers[layer].length-1)
                    snow_layers[layer] = snow_layers[layer].substring(0, j) + " ";
                else
                    snow_layers[layer] = snow_layers[layer].substring(0, j) + " " + snow_layers[layer][j] + snow_layers[layer].substring(j+2);
            }
        }
    }
    // If user clicked then just forcefully insert the snowplow column by column
    if (snow_plow != 0) {
        snow_plow--;
        for (let i = 0; i<snow_plow_ascii.length; i++) {
            if (snow_plow_ascii[i][snow_plow] != " ")
                snow_layers[i] = snow_plow_ascii[i][snow_plow] + snow_layers[i].substring(1);
        }
    }
    // Create snowfakes on cursor position
    if (row && column && snow_layers[row][column] == " ")
        snow_layers[row] = snow_layers[row].substring(0, column) + "*" + snow_layers[row].substring(column+1);
    // Update the whole snow container
    snow_layers.pop();
    snow_layers.reverse();
    snow_container.innerHTML = snow_layers.join("<br>");
    snow_layers.reverse();
    // Christmas lights
    if (christmas_lights_timer++ == 3) {
        for (let needle of christmas_lights) {
            needle.style.color = "green";
            needle.style.textShadow = "unset";
        }
        for (let needle of christmas_lights) {
            if (Math.random() < 0.3) {
                var color = Math.floor(Math.random()*4);
                if (color == 0) {
                    needle.style.color = "red";
                    needle.style.textShadow = "red 0 0 15px, red 0 0 20px, red 0 0 25px";
                }
                else if (color == 1) {
                    needle.style.color = "lime";
                    needle.style.textShadow = "lime 0 0 15px, lime 0 0 20px, lime 0 0 25px";
                }
                else if (color == 2) {
                    needle.style.color = "blue";
                    needle.style.textShadow = "blue 0 0 15px, blue 0 0 20px, blue 0 0 25px";
                }
                else if (color == 3) {
                    needle.style.color = "yellow";
                    needle.style.textShadow = "yellow 0 0 15px, yellow 0 0 20px, yellow 0 0 25px";
                }
            }
        }
        christmas_lights_timer = 0;
    }
}
setInterval(main_loop, 150);
// Call the snow plow and remove the prompt
document.onclick = function() {
    if (snow_plow === 0)
        snow_plow = snow_plow_ascii[0].length;
    if (document.getElementById("prompt"))
        document.getElementById("prompt").remove();
}
// Create snowfakes on cursor position
snow_container.onmousemove = create_snowflakes;
snow_container.ontouchmove = create_snowflakes;
function create_snowflakes() {
    var snow_container_bounding = snow_container.getBoundingClientRect();
    var mouseX = Math.ceil((event.clientX ? event.clientX : event.touches[0].clientX) - snow_container_bounding.left);
    if (mouseX <= 0) mouseX = 1;
    var mouseY = Math.ceil(snow_container_bounding.bottom - (event.clientY ? event.clientY : event.touches[0].clientY)) - 5;
    if (mouseY <= 0) mouseY = 1;
    if (!(event.sourceCapabilities.firesTouchEvents && event.clientX)) {
        column = Math.ceil(mouseX*snow_layers[0].length/snow_container_bounding.width)-1;
        row = Math.ceil(mouseY*snow_layers.length/snow_container_bounding.height)-1;
        if (snow_layers[row][column] == " ") {
            snow_layers[row] = snow_layers[row].substring(0, column) + "*" + snow_layers[row].substring(column+1);
            snow_layers.reverse();
            snow_container.innerHTML = snow_layers.join("<br>");
            snow_layers.reverse();
        }
    }
}
snow_container.onmouseout = function() {row = false; column = false;}
snow_container.ontouchend = function() {row = false; column = false;}