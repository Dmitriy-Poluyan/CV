var game_started = rotated = waiting = false;
document.oncontextmenu = function(){return false};
// Расстановка клеток поля
for (var i = 0; i < 100; i++){
    var tile = document.createElement("div");
    tile.style.height = tile.style.width = "40px";
    tile.style.boxSizing = "border-box";
    tile.style.border = "1px solid black";
    tile.style.backgroundColor = "white";
    tile.style.position = "absolute";
    tile.style.userSelect = "none";
    tile.style.top = 9 + ~~(i / 10) * 49 + "px";
    tile.style.left = 9 + (i % 10) * 49 + "px";
    // Расстановка букв координат
    if (i < 10){
        var letter = tile.cloneNode(true);
        letter.style.border = "none";
        letter.style.top = "-49px";
        letter.style.textAlign = "center";
        letter.style.fontSize = "25pt";
        letter.style.backgroundColor = "transparent";
        if (i == 0) letter.textContent = "A";
        else if (i == 1) letter.textContent = "B";
        else if (i == 2) letter.textContent = "C";
        else if (i == 3) letter.textContent = "D";
        else if (i == 4) letter.textContent = "E";
        else if (i == 5) letter.textContent = "F";
        else if (i == 6) letter.textContent = "G";
        else if (i == 7) letter.textContent = "H";
        else if (i == 8) letter.textContent = "I";
        else letter.textContent = "J";
        document.getElementById("player1").appendChild(letter);
        document.getElementById("player2").appendChild(letter.cloneNode(true));}
    // Расстановка цифр координат
    if (i % 10 == 0){
        var number = letter.cloneNode(true);
        number.style.top = 9 + ~~(i/10) * 49 + "px";
        number.style.left = "-49px";
        if (i == 0) number.textContent = "1";
        else if (i == 10) number.textContent = "2";
        else if (i == 20) number.textContent = "3";
        else if (i == 30) number.textContent = "4";
        else if (i == 40) number.textContent = "5";
        else if (i == 50) number.textContent = "6";
        else if (i == 60) number.textContent = "7";
        else if (i == 70) number.textContent = "8";
        else if (i == 80) number.textContent = "9";
        else number.textContent = "10";
        document.getElementById("player1").appendChild(number);
        document.getElementById("player2").appendChild(number.cloneNode(true));}
    tile.setAttribute("id", i);
    tile.onclick = function(){
        if (event.target.style.backgroundColor == "lightblue") place_ship();
        else if (event.target.style.backgroundColor == "royalblue") remove_ship();};
    tile.onmousedown = rotate_ship;
    tile.onmouseover = highlight_tiles;
    tile.onmouseout = remove_highlight;
    document.getElementById("player1").appendChild(tile);
    document.getElementById("player2").appendChild(tile.cloneNode(true));}
// Вращение корабля
function rotate_ship(){
    if (event.button == 2){
        remove_highlight();
        rotated = !rotated;
        highlight_tiles();
        update_info();
        document.getElementById("temp_info").style.display = "none";}}
// Ручная установка корабля
function place_ship(){
    event.target.style.backgroundColor = "royalblue";
    var tile_id_check = parseInt(event.target.getAttribute("id"));
    var ship_type_placed = 1;
    while ((tile_id_check % 10 < 9) && (document.getElementById(tile_id_check + 1).style.backgroundColor == "lightblue")){
        document.getElementById(tile_id_check + 1).style.backgroundColor = "royalblue";
        tile_id_check += 1;
        ship_type_placed++;}
    while ((tile_id_check < 90) && (document.getElementById(tile_id_check + 10).style.backgroundColor == "lightblue")){
        document.getElementById(tile_id_check + 10).style.backgroundColor = "royalblue";
        tile_id_check += 10;
        ship_type_placed++;}
    if (ship_type_placed == 1) ship1_amount--;
    else if (ship_type_placed == 2) ship2_amount--;
    else if (ship_type_placed == 3) ship3_amount--;
    else if (ship_type_placed == 4) ship4_amount--;
    update_info();
    if (ship1_amount == 0 && ship2_amount == 0 && ship3_amount == 0 && ship4_amount == 0)
        document.getElementById("ready_button").style.display = "block";}
// Удаление корабля
function remove_ship(){
    if(!game_started){
        event.target.style.backgroundColor = "white";
        var ship_type_deleted = 1;
        var tile_id_check = parseInt(event.target.getAttribute("id"));
        while ((tile_id_check > 9) && (document.getElementById(tile_id_check - 10).style.backgroundColor == "royalblue")){
            document.getElementById(tile_id_check - 10).style.backgroundColor = "white";
            tile_id_check -= 10;
            ship_type_deleted++;}
        tile_id_check = parseInt(event.target.getAttribute("id"));
        while ((tile_id_check % 10 < 9) && (document.getElementById(tile_id_check + 1).style.backgroundColor == "royalblue")){
            document.getElementById(tile_id_check + 1).style.backgroundColor = "white";
            tile_id_check += 1;
            ship_type_deleted++;}
        tile_id_check = parseInt(event.target.getAttribute("id"));
        while ((tile_id_check < 90) && (document.getElementById(tile_id_check + 10).style.backgroundColor == "royalblue")){
            document.getElementById(tile_id_check + 10).style.backgroundColor = "white";
            tile_id_check += 10;
            ship_type_deleted++;}
        tile_id_check = parseInt(event.target.getAttribute("id"));
        while ((tile_id_check % 10 > 0) && (document.getElementById(tile_id_check - 1).style.backgroundColor == "royalblue")){
            document.getElementById(tile_id_check - 1).style.backgroundColor = "white";
            tile_id_check -= 1;
            ship_type_deleted++;}
        if (ship_type_deleted == 1) ship1_amount++;
        else if (ship_type_deleted == 2) ship2_amount++;
        else if (ship_type_deleted == 3) ship3_amount++;
        else if (ship_type_deleted == 4) ship4_amount++;
        highlight_tiles();
        update_info();
        document.getElementById("ready_button").style.display = "none";}}
// Подсветка места для корабля
function highlight_tiles(){
    if ((ship1_amount || ship2_amount || ship3_amount || ship4_amount) && (event.target.style.backgroundColor == "white")){
        var tile_id_check = parseInt(event.target.getAttribute("id"));
        var ship_length = 0;
        while ((ship_length !== 4) &&
            (document.getElementById(tile_id_check - (tile_id_check > 9 ? 10 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check - ((tile_id_check > 9) && (tile_id_check % 10 < 9) ? 9 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check + (tile_id_check % 10 < 9 ? 1 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check + ((tile_id_check % 10 < 9) && (tile_id_check < 90) ? 11 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check + (tile_id_check < 90 ? 10 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check + ((tile_id_check < 90) && (tile_id_check % 10 > 0) ? 9 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check - (tile_id_check % 10 > 0 ? 1 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check - ((tile_id_check % 10 > 0) && (tile_id_check > 9) ? 11 : 0)).style.backgroundColor !== "royalblue")){
            ship_length++;
            if (rotated) tile_id_check += 10;
            else tile_id_check += 1;
            if (rotated && (tile_id_check > 99)) break;
            else if (!rotated && (tile_id_check % 10 == 0)) break;}
        if (ship4_amount && (ship_length == 4)){
            event.target.style.backgroundColor = "lightblue";
            document.getElementById(parseInt(event.target.getAttribute("id")) + (rotated ? 10 : 1)).style.backgroundColor = "lightblue";
            document.getElementById(parseInt(event.target.getAttribute("id")) + (rotated ? 20 : 2)).style.backgroundColor = "lightblue";
            document.getElementById(parseInt(event.target.getAttribute("id")) + (rotated ? 30 : 3)).style.backgroundColor = "lightblue";}
        else if (ship3_amount && (ship_length >= 3)){
            event.target.style.backgroundColor = "lightblue";
            document.getElementById(parseInt(event.target.getAttribute("id")) + (rotated ? 10 : 1)).style.backgroundColor = "lightblue";
            document.getElementById(parseInt(event.target.getAttribute("id")) + (rotated ? 20 : 2)).style.backgroundColor = "lightblue";}
        else if (ship2_amount && (ship_length >= 2)){
            event.target.style.backgroundColor = "lightblue";
            document.getElementById(parseInt(event.target.getAttribute("id")) + (rotated ? 10 : 1)).style.backgroundColor = "lightblue";}
        else if (ship1_amount && (ship_length >= 1)) event.target.style.backgroundColor = "lightblue";}}
// Удаление подсветки места для корабля
function remove_highlight(){
    if ((ship1_amount || ship2_amount || ship3_amount || ship4_amount) && (event.target.style.backgroundColor == "lightblue")){
        event.target.style.backgroundColor = "white";
        var tile_id_check = parseInt(event.target.getAttribute("id"));
        while ((tile_id_check % 10 < 9) && (document.getElementById(tile_id_check + 1).style.backgroundColor == "lightblue")){
            document.getElementById(tile_id_check + 1).style.backgroundColor = "white";
            tile_id_check += 1;}
        while ((tile_id_check < 90) && (document.getElementById(tile_id_check + 10).style.backgroundColor == "lightblue")){
            document.getElementById(tile_id_check + 10).style.backgroundColor = "white";
            tile_id_check += 10;}}}
// Обновление кол-ва кораблей и ориентации установки корабля
function update_info(){
    document.getElementById("a4").innerText = ship4_amount;
    document.getElementById("a3").innerText = ship3_amount;
    document.getElementById("a2").innerText = ship2_amount;
    document.getElementById("a1").innerText = ship1_amount;
    if (rotated){
        for (var j in document.getElementsByClassName("b")){
            if (!isNaN(j)) document.getElementsByClassName("b")[j].style.display = "block";}}
    else{
        for (var j in document.getElementsByClassName("b")){
            if (!isNaN(j)) document.getElementsByClassName("b")[j].style.display = "inline-block";}}}
// Автоматическая генерация поля игрока
document.getElementById("auto_gen").onclick = generate_field;
function generate_field(){
    for (var k in document.querySelectorAll("#player1 div")){
        if (!isNaN(k)) document.querySelectorAll("#player1 div")[k].style.backgroundColor = "white";}
    ship4_amount = 1;
    ship3_amount = 2;
    ship2_amount = 3;
    ship1_amount = 4;
    while (ship1_amount || ship2_amount || ship3_amount || ship4_amount){
        var tile_id_check = Math.floor(Math.random() * 100);
        var auto_rotation = Math.floor(Math.random() * 4);
        var init_coord = tile_id_check;
        var ship_length = 0;
        while ((ship_length != 4) &&
            (document.getElementById(tile_id_check).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check - (tile_id_check > 9 ? 10 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check - ((tile_id_check > 9) && (tile_id_check % 10 < 9) ? 9 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check + (tile_id_check % 10 < 9 ? 1 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check + ((tile_id_check % 10 < 9) && (tile_id_check < 90) ? 11 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check + (tile_id_check < 90 ? 10 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check + ((tile_id_check < 90) && (tile_id_check % 10 > 0) ? 9 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check - (tile_id_check % 10 > 0 ? 1 : 0)).style.backgroundColor !== "royalblue") &&
            (document.getElementById(tile_id_check - ((tile_id_check % 10 > 0) && (tile_id_check > 9) ? 11 : 0)).style.backgroundColor !== "royalblue")){
            ship_length++;
            if (auto_rotation == 0) tile_id_check -= 10;
            else if (auto_rotation == 1) tile_id_check += 1;
            else if (auto_rotation == 2) tile_id_check += 10;
            else if (auto_rotation == 3) tile_id_check -= 1;
            if ((auto_rotation == 0) && (tile_id_check < 0)) break;
            else if ((auto_rotation == 1) && (tile_id_check % 10 == 0)) break;
            else if ((auto_rotation == 2) && (tile_id_check > 99)) break;
            else if ((auto_rotation == 3) && ((tile_id_check % 10 == 9) || (tile_id_check == -1))) break;}
        if (ship4_amount && (ship_length == 4)){
            document.getElementById(init_coord).style.backgroundColor = "royalblue";
            document.getElementById(init_coord + (auto_rotation == 0 ? -10 : (auto_rotation == 1 ? 1 : (auto_rotation == 2 ? 10 : -1)))).style.backgroundColor = "royalblue";
            document.getElementById(init_coord + (auto_rotation == 0 ? -20 : (auto_rotation == 1 ? 2 : (auto_rotation == 2 ? 20 : -2)))).style.backgroundColor = "royalblue";
            document.getElementById(init_coord + (auto_rotation == 0 ? -30 : (auto_rotation == 1 ? 3 : (auto_rotation == 2 ? 30 : -3)))).style.backgroundColor = "royalblue";
            ship4_amount--;}
        else if (ship3_amount && (ship_length >= 3)){
            document.getElementById(init_coord).style.backgroundColor = "royalblue";
            document.getElementById(init_coord + (auto_rotation == 0 ? -10 : (auto_rotation == 1 ? 1 : (auto_rotation == 2 ? 10 : -1)))).style.backgroundColor = "royalblue";
            document.getElementById(init_coord + (auto_rotation == 0 ? -20 : (auto_rotation == 1 ? 2 : (auto_rotation == 2 ? 20 : -2)))).style.backgroundColor = "royalblue";
            ship3_amount--;}
        else if (ship2_amount && (ship_length >= 2)){
            document.getElementById(init_coord).style.backgroundColor = "royalblue";
            document.getElementById(init_coord + (auto_rotation == 0 ? -10 : (auto_rotation == 1 ? 1 : (auto_rotation == 2 ? 10 : -1)))).style.backgroundColor = "royalblue";
            ship2_amount--;}
        else if (ship1_amount && (ship_length >= 1)){
            document.getElementById(init_coord).style.backgroundColor = "royalblue";
            ship1_amount--;}}
    update_info();
    document.getElementById("ready_button").style.display = "block";}
// Автоматическая генерация поля ИИ (выполняется при загрузке игры)
function generate_AI_field(){
    player_field = [];
    for (var h = 0; h < 100; h++){
        if (document.getElementById(String(h)).style.backgroundColor == "royalblue" || document.getElementById(String(h)).style.backgroundColor == "darkred") player_field.push("O");
        else player_field.push("_");}
    AI_field = [];
    generate_field();
    for (var h = 0; h < 100; h++){
        if (document.getElementById(String(h)).style.backgroundColor == "royalblue") AI_field.push("O");
        else AI_field.push("_");
        document.getElementById(String(h)).style.backgroundColor = "white";}
    ship4_amount = 1;
    ship3_amount = 2;
    ship2_amount = 3;
    ship1_amount = 4;
    update_info();
    document.getElementById("ready_button").style.display = "none";}
generate_AI_field();
// Начало игры
document.getElementById("ready_button").onclick = start_game;
function start_game(){
    game_started = true;
    player_hits = AI_hits = 0;
    document.getElementById("ready_button").style.display = "none";
    document.getElementById("info").style.display = "none";
    document.getElementById("auto_gen").style.display = "none";
    player_field = [];
    for (var p = 0; p < 100; p++){
        if (document.getElementById(String(p)).style.backgroundColor == "royalblue") player_field.push("O");
        else player_field.push("_");}
    var AI_tile_id = "0AI";
    for (y in document.querySelectorAll("#player2 div")){
        if (document.querySelectorAll("#player2 div")[y].innerText == ""){
            document.querySelectorAll("#player2 div")[y].setAttribute("id", AI_tile_id);
            AI_tile_id = parseInt(AI_tile_id) + 1 + "AI";
            document.querySelectorAll("#player2 div")[y].onmouseover = function(){
                if (game_started && event.target.style.backgroundColor == "white" && !waiting) event.target.style.backgroundColor = "lightblue";}
            document.querySelectorAll("#player2 div")[y].onmouseout = function(){
                if (event.target.style.backgroundColor == "lightblue") event.target.style.backgroundColor = "white";}
            document.querySelectorAll("#player2 div")[y].onclick = check_for_hit;}}
    document.getElementById("turn_info").style.display = "block";
    if (Math.floor(Math.random() * 2) == 0) document.getElementById("turn_info").innerText = "Ваш ход";
    else{
        document.getElementById("turn_info").innerText = "Ход компьютера";
        waiting = true;
        setTimeout(AI_turn, 800);}}
// Проверка попадания и удаление подсветки последних ходов ИИ
function check_for_hit(){
    if (event.target.style.backgroundColor == "lightblue"){
        for (var m = 0; m < 100; m++) document.getElementById(String(m)).style.boxShadow = "none";
        if (AI_field[parseInt(event.target.getAttribute("id"))] !== "O"){
            event.target.style.backgroundColor = "dimgray";
            waiting = true;
            document.getElementById("turn_info").innerText = "Ход компьютера";
            setTimeout(AI_turn, 800);}
        else{
            event.target.style.backgroundColor = "darkred";
            AI_field[parseInt(event.target.getAttribute("id"))] = "X";
            target = event.target.getAttribute("id");
            check_for_sunk();
            player_hits++;
            if (player_hits == 20) end_game();}}}
// Проверка потопления
function check_for_sunk(){
    // На поле ИИ
    if (String(target).length > 2){
        tile_id_check = parseInt(event.target.getAttribute("id"));
        var sunk = true;
        var min_check = tile_id_check;
        var max_check = tile_id_check;
        if ((AI_field[tile_id_check - (tile_id_check > 9 ? 10 : 0)] == "O") ||
            (AI_field[tile_id_check + (tile_id_check % 10 < 9 ? 1 : 0)] == "O") ||
            (AI_field[tile_id_check + (tile_id_check < 90 ? 10 : 0)] == "O") ||
            (AI_field[tile_id_check - (tile_id_check % 10 > 0 ? 1 : 0)] == "O")) sunk = false;
        while (sunk && tile_id_check > 9 && AI_field[tile_id_check - 10] == "X"){
            tile_id_check -= 10;
            if (tile_id_check < min_check) min_check = tile_id_check;
            if (AI_field[tile_id_check - 10] == "O") sunk = false;}
        tile_id_check = parseInt(event.target.getAttribute("id"));
        while (sunk && tile_id_check % 10 < 9 && AI_field[tile_id_check + 1] == "X"){
            tile_id_check += 1;
            if (tile_id_check > max_check) max_check = tile_id_check;
            if (AI_field[tile_id_check + 1] == "O") sunk = false;}
        tile_id_check = parseInt(event.target.getAttribute("id"));
        while (sunk && tile_id_check < 90 && AI_field[tile_id_check + 10] == "X"){
            tile_id_check += 10;
            if (tile_id_check > max_check) max_check = tile_id_check;
            if (AI_field[tile_id_check + 10] == "O") sunk = false;}
        tile_id_check = parseInt(event.target.getAttribute("id"));
        while (sunk && tile_id_check % 10 > 0 && AI_field[tile_id_check - 1] == "X"){
            tile_id_check -= 1;
            if (tile_id_check < min_check) min_check = tile_id_check;
            if (AI_field[tile_id_check - 1] == "O") sunk = false;}
        if (sunk){
            if (min_check > 9 && min_check % 10 > 0) document.getElementById(min_check - 11 + "AI").style.backgroundColor = "dimgray";
            if (min_check > 9) document.getElementById(min_check - 10 + "AI").style.backgroundColor = "dimgray";
            if (min_check > 9 && min_check % 10 < 9) document.getElementById(min_check - 9 + "AI").style.backgroundColor = "dimgray";
            if (min_check % 10 > 0) document.getElementById(min_check - 1 + "AI").style.backgroundColor = "dimgray";
            if (min_check % 10 > 0 && min_check < 90) document.getElementById(min_check + 9 + "AI").style.backgroundColor = "dimgray";
            if (min_check < 90 && min_check % 10 < 9) document.getElementById(min_check + 11 + "AI").style.backgroundColor = "dimgray";
            if (AI_field[min_check + 10] == "X"){
                if (min_check % 10 < 9) document.getElementById(min_check + 1 + "AI").style.backgroundColor = "dimgray";
                if (max_check > 9 && max_check % 10 > 0) document.getElementById(max_check - 11 + "AI").style.backgroundColor = "dimgray";
                if (max_check > 9 && max_check % 10 < 9) document.getElementById(max_check - 9 + "AI").style.backgroundColor = "dimgray";
                if (max_check % 10 > 0) document.getElementById(max_check - 1 + "AI").style.backgroundColor = "dimgray";
                if (max_check % 10 < 9) document.getElementById(max_check + 1 + "AI").style.backgroundColor = "dimgray";
                if (max_check % 10 > 0 && max_check < 90) document.getElementById(max_check + 9 + "AI").style.backgroundColor = "dimgray";
                if (max_check < 90) document.getElementById(max_check + 10 + "AI").style.backgroundColor = "dimgray";
                if (max_check < 90 && max_check % 10 < 9) document.getElementById(max_check + 11 + "AI").style.backgroundColor = "dimgray";}
            else{
                if (min_check < 90) document.getElementById(min_check + 10 + "AI").style.backgroundColor = "dimgray";
                if (max_check > 9 && max_check % 10 > 0) document.getElementById(max_check - 11 + "AI").style.backgroundColor = "dimgray";
                if (max_check > 9) document.getElementById(max_check - 10 + "AI").style.backgroundColor = "dimgray";
                if (max_check > 9 && max_check % 10 < 9) document.getElementById(max_check - 9 + "AI").style.backgroundColor = "dimgray";
                if (max_check % 10 < 9) document.getElementById(max_check + 1 + "AI").style.backgroundColor = "dimgray";
                if (max_check % 10 > 0 && max_check < 90) document.getElementById(max_check + 9 + "AI").style.backgroundColor = "dimgray";
                if (max_check < 90) document.getElementById(max_check + 10 + "AI").style.backgroundColor = "dimgray";
                if (max_check < 90 && max_check % 10 < 9) document.getElementById(max_check + 11 + "AI").style.backgroundColor = "dimgray";}}}
    // На поле игрока
    else{
        tile_id_check = target;
        var sunk = true;
        var min_check = tile_id_check;
        var max_check = tile_id_check;
        if ((player_field[tile_id_check - (tile_id_check > 9 ? 10 : 0)] == "O") ||
            (player_field[tile_id_check + (tile_id_check % 10 < 9 ? 1 : 0)] == "O") ||
            (player_field[tile_id_check + (tile_id_check < 90 ? 10 : 0)] == "O") ||
            (player_field[tile_id_check - (tile_id_check % 10 > 0 ? 1 : 0)] == "O")) sunk = false;
        while (sunk && tile_id_check > 9 && player_field[tile_id_check - 10] == "X"){
            tile_id_check -= 10;
            if (tile_id_check < min_check) min_check = tile_id_check;
            if (player_field[tile_id_check - 10] == "O") sunk = false;}
        tile_id_check = target;
        while (sunk && tile_id_check % 10 < 9 && player_field[tile_id_check + 1] == "X"){
            tile_id_check += 1;
            if (tile_id_check > max_check) max_check = tile_id_check;
            if (player_field[tile_id_check + 1] == "O") sunk = false;}
        tile_id_check = target;
        while (sunk && tile_id_check < 90 && player_field[tile_id_check + 10] == "X"){
            tile_id_check += 10;
            if (tile_id_check > max_check) max_check = tile_id_check;
            if (player_field[tile_id_check + 10] == "O") sunk = false;}
        tile_id_check = target;
        while (sunk && tile_id_check % 10 > 0 && player_field[tile_id_check - 1] == "X"){
            tile_id_check -= 1;
            if (tile_id_check < min_check) min_check = tile_id_check;
            if (player_field[tile_id_check - 1] == "O") sunk = false;}
        if (sunk){
            if (min_check > 9 && min_check % 10 > 0) document.getElementById(min_check - 11).style.backgroundColor = "dimgray";
            if (min_check > 9) document.getElementById(min_check - 10).style.backgroundColor = "dimgray";
            if (min_check > 9 && min_check % 10 < 9) document.getElementById(min_check - 9).style.backgroundColor = "dimgray";
            if (min_check % 10 > 0) document.getElementById(min_check - 1).style.backgroundColor = "dimgray";
            if (min_check % 10 > 0 && min_check < 90) document.getElementById(min_check + 9).style.backgroundColor = "dimgray";
            if (min_check < 90 && min_check % 10 < 9) document.getElementById(min_check + 11).style.backgroundColor = "dimgray";
            if (player_field[min_check + 10] == "X"){
                if (min_check % 10 < 9) document.getElementById(min_check + 1).style.backgroundColor = "dimgray";
                if (max_check > 9 && max_check % 10 > 0) document.getElementById(max_check - 11).style.backgroundColor = "dimgray";
                if (max_check > 9 && max_check % 10 < 9) document.getElementById(max_check - 9).style.backgroundColor = "dimgray";
                if (max_check % 10 > 0) document.getElementById(max_check - 1).style.backgroundColor = "dimgray";
                if (max_check % 10 < 9) document.getElementById(max_check + 1).style.backgroundColor = "dimgray";
                if (max_check % 10 > 0 && max_check < 90) document.getElementById(max_check + 9).style.backgroundColor = "dimgray";
                if (max_check < 90) document.getElementById(max_check + 10).style.backgroundColor = "dimgray";
                if (max_check < 90 && max_check % 10 < 9) document.getElementById(max_check + 11).style.backgroundColor = "dimgray";}
            else{
                if (min_check < 90) document.getElementById(min_check + 10).style.backgroundColor = "dimgray";
                if (max_check > 9 && max_check % 10 > 0) document.getElementById(max_check - 11).style.backgroundColor = "dimgray";
                if (max_check > 9) document.getElementById(max_check - 10).style.backgroundColor = "dimgray";
                if (max_check > 9 && max_check % 10 < 9) document.getElementById(max_check - 9).style.backgroundColor = "dimgray";
                if (max_check % 10 < 9) document.getElementById(max_check + 1).style.backgroundColor = "dimgray";
                if (max_check % 10 > 0 && max_check < 90) document.getElementById(max_check + 9).style.backgroundColor = "dimgray";
                if (max_check < 90) document.getElementById(max_check + 10).style.backgroundColor = "dimgray";
                if (max_check < 90 && max_check % 10 < 9) document.getElementById(max_check + 11).style.backgroundColor = "dimgray";}
            return true;}
        else return false;}}
// Ход ИИ
var target = 0;
var last_hit_id = -1;
function AI_turn(){
    var missed = false;
    while (!missed && game_started){
        if (last_hit_id == -1) target = Math.floor(Math.random() * 100);
        else{
            if ((last_hit_id > 9 && last_hit_id < 90) &&
                (document.getElementById(String(last_hit_id - 10)).style.backgroundColor == "darkred") &&
                (document.getElementById(String(last_hit_id + 10)).style.backgroundColor !== "dimgray")) target = last_hit_id + 10;
            else if ((last_hit_id % 10 < 9 && last_hit_id % 10 > 0) &&
                (document.getElementById(String(last_hit_id + 1)).style.backgroundColor == "darkred") &&
                (document.getElementById(String(last_hit_id - 1)).style.backgroundColor !== "dimgray")) target = last_hit_id - 1;
            else if ((last_hit_id > 9 && last_hit_id < 90) &&
                (document.getElementById(String(last_hit_id + 10)).style.backgroundColor == "darkred") &&
                (document.getElementById(String(last_hit_id - 10)).style.backgroundColor !== "dimgray")) target = last_hit_id - 10;
            else if ((last_hit_id % 10 < 9 && last_hit_id % 10 > 0) &&
                (document.getElementById(String(last_hit_id - 1)).style.backgroundColor == "darkred") &&
                (document.getElementById(String(last_hit_id + 1)).style.backgroundColor !== "dimgray")) target = last_hit_id + 1;
            else if ((last_hit_id >= 90 || (last_hit_id > 9 && document.getElementById(String(last_hit_id + 10)).style.backgroundColor == "dimgray")) &&
                (document.getElementById(String(last_hit_id - 10)).style.backgroundColor == "darkred")){
                target = last_hit_id - (document.getElementById(String(last_hit_id - 20)).style.backgroundColor == "darkred" ? 30 : 20);}
            else if ((last_hit_id % 10 == 0 || (last_hit_id % 10 < 9 && document.getElementById(String(last_hit_id - 1)).style.backgroundColor == "dimgray")) &&
                (document.getElementById(String(last_hit_id + 1)).style.backgroundColor == "darkred")){
                target = last_hit_id + (document.getElementById(String(last_hit_id + 2)).style.backgroundColor == "darkred" ? 3 : 2);}
            else if ((last_hit_id <= 9 || (last_hit_id < 90 && document.getElementById(String(last_hit_id - 10)).style.backgroundColor == "dimgray")) &&
                (document.getElementById(String(last_hit_id + 10)).style.backgroundColor == "darkred")){
                target = last_hit_id + (document.getElementById(String(last_hit_id + 20)).style.backgroundColor == "darkred" ? 30 : 20);}
            else if ((last_hit_id % 10 == 9 || (last_hit_id % 10 > 0 && document.getElementById(String(last_hit_id + 1)).style.backgroundColor == "dimgray")) &&
                (document.getElementById(String(last_hit_id - 1)).style.backgroundColor == "darkred")){
                target = last_hit_id - (document.getElementById(String(last_hit_id - 2)).style.backgroundColor == "darkred" ? 3 : 2);}
            else{
                var orientation_guess = Math.floor(Math.random() * 4);
                if (orientation_guess == 0 && last_hit_id > 9) target = last_hit_id - 10;
                else if (orientation_guess == 1 && last_hit_id % 10 < 9) target = last_hit_id + 1;
                else if (orientation_guess == 2 && last_hit_id < 90) target = last_hit_id + 10;
                else if (orientation_guess == 3 && last_hit_id % 10 > 0) target = last_hit_id - 1;}}
        if (document.getElementById(String(target)).style.backgroundColor == "white"){
            document.getElementById(String(target)).style.backgroundColor = "dimgray";
            document.getElementById(String(target)).style.boxShadow = "0 0 10px 5px red";
            missed = true;
            waiting = false;
            document.getElementById("turn_info").innerText = "Ваш ход";}
        else if (document.getElementById(String(target)).style.backgroundColor == "royalblue"){
            document.getElementById(String(target)).style.backgroundColor = "darkred";
            document.getElementById(String(target)).style.boxShadow = "0 0 10px 5px red";
            player_field[target] = "X";
            if (check_for_sunk()) last_hit_id = -1;
            else last_hit_id = target;
            missed = true;
            AI_hits++;
            if (AI_hits == 20) end_game();
            else setTimeout(AI_turn, 800);}}}
// Конец игры
function end_game(){
    game_started = false;
    if (player_hits == 20) document.getElementById("winner").innerText = document.getElementById("name1").getAttribute("value");
    else{
        document.getElementById("winner").innerText = document.getElementById("name2").innerText;
        for (var n = 0; n < 100; n++){
            if (AI_field[n] == "O") document.getElementById(n + "AI").style.backgroundColor = "royalblue";}}
    document.getElementById("turn_info").style.display = "none";
    document.getElementById("end_screen").style.display = "block";}
// Рестарт игры
document.getElementById("restart_button").onclick = restart_game;
function restart_game(){
    document.getElementById("end_screen").style.display = "none";
    generate_AI_field();
    document.getElementById("info").style.display = "block";
    document.getElementById("auto_gen").style.display = "block";
    ship1_amount = ship2_amount = ship3_amount = ship4_amount = 0;
    update_info();
    document.getElementById("ready_button").style.display = "block";
    for (var b = 0; b < 100; b++){
        document.getElementById(String(b)).style.boxShadow = "none";
        document.getElementById(b + "AI").style.backgroundColor = "white";
        if (player_field[b] == "O") document.getElementById(String(b)).style.backgroundColor = "royalblue";
        else document.getElementById(String(b)).style.backgroundColor = "white";}}