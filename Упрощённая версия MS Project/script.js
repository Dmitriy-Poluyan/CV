var One_time_function = true, Start_mouse_pos_X, Init_task_width, Init_task_offset = 0;
// Обработчики нажатия на вкладки
function reset_tabs(){
	for (i of "123"){
		document.getElementById("tab" + i).style.zIndex = 0;
		document.getElementById("tab" + i).style.backgroundColor = "lightgray";
		document.getElementById("content" + i).style.display = "none";}}
document.getElementById("tab1").onclick = () => {
	reset_tabs();
	document.getElementById("tab1").style.zIndex = 1;
	document.getElementById("tab1").style.backgroundColor = "darkgray";
	document.getElementById("content1").style.display = "block";}
document.getElementById("tab2").onclick = () => {
	reset_tabs();
	document.getElementById("tab2").style.zIndex = 1;
	document.getElementById("tab2").style.backgroundColor = "darkgray";
	document.getElementById("content2").style.display = "block";}
document.getElementById("tab3").onclick = () => {
	reset_tabs();
	document.getElementById("tab3").style.zIndex = 1;
	document.getElementById("tab3").style.backgroundColor = "darkgray";
	document.getElementById("content3").style.display = "block";}
// Динамичное изменение стиля border-radius элемента #main_box
// И изменение стиля bottom и height элемента #advices
var Computed_margin = parseInt(window.getComputedStyle(document.getElementsByClassName("tabs")[0]).marginRight);
document.getElementById("main_box").style.borderRadius = String(Computed_margin) + "px " + String(Computed_margin) + "px 5vh 5vh";
document.getElementById("advices").style.bottom = String(document.getElementById("center").getBoundingClientRect().bottom - document.getElementById("graph").getBoundingClientRect().bottom - 1) + "px";
document.getElementById("advices").style.height = String(document.getElementById("advices").getBoundingClientRect().bottom - document.getElementById("last_line").getBoundingClientRect().bottom) + "px";
window.onresize = () => {
	Computed_margin = parseInt(window.getComputedStyle(document.getElementsByClassName("tabs")[0]).marginRight);
	document.getElementById("main_box").style.borderRadius = String(Computed_margin) + "px " + String(Computed_margin) + "px 5vh 5vh";
	document.getElementById("advices").style.bottom = String(document.getElementById("center").getBoundingClientRect().bottom - document.getElementById("graph").getBoundingClientRect().bottom - 1) + "px";
	document.getElementById("advices").style.height = String(document.getElementById("advices").getBoundingClientRect().bottom - document.getElementById("last_line").getBoundingClientRect().bottom) + "px";}
// Изменение текста "План проекта" в зависимости от названия проекта
document.getElementById("input_name").addEventListener("blur", () => {
	document.getElementById("project_name").innerText = "План проекта " + document.getElementById("input_name").value;});
// Добавление кнопки для создания новой задачи
var Create_task_button = document.createElement("div");
Create_task_button.setAttribute("class", "task");
Create_task_button.style.width = "18px";
Create_task_button.style.textAlign = "center";
Create_task_button.style.cursor = "pointer"
Create_task_button.innerHTML = "<div style='position: absolute; margin-left: 23px;'> Новая задача </div>+";
document.getElementById("graph").appendChild(Create_task_button);
// Создание новых задач
Create_task_button.onclick = () => {
	if (One_time_function && !(One_time_function = false))
		document.getElementById("graph").lastChild.removeChild(document.getElementById("graph").lastChild.firstChild);
	var New_task = document.createElement("div");
	New_task.setAttribute("class", "task");
	New_task.style.width = "50px";
	New_task.style.marginLeft = "0px";
	New_task.onmousedown = move_task_start;
	var Resize_button = document.createElement("div");
	Resize_button.setAttribute("class", "task");
	Resize_button.style.width = "18px";
	Resize_button.style.float = "right";
	Resize_button.onmousedown = resize_task_start;
	New_task.appendChild(Resize_button);
	var New_task_name = document.createElement("div");
	New_task_name.setAttribute("contenteditable", "true");
	New_task_name.innerText = "Новая задача";
	New_task_name.style.whiteSpace = "nowrap";
	New_task_name.style.marginLeft = "23px";
	New_task_name.style.outline = "none";
	New_task_name.onmousedown = () => {event.stopPropagation();}
	Resize_button.appendChild(New_task_name);
	document.getElementById("graph").insertBefore(New_task, document.getElementById("graph").lastChild);
	update_advices();}
// Начало изменения длины задачи
function resize_task_start(){
	if (event.button == 0){
		event.stopPropagation();
		document.onmouseup = resize_task_stop;
		Start_mouse_pos_X = event.clientX;
		Init_task_width = parseInt(event.target.parentNode.style.width);
		Resizing_elem = event.target.parentNode;
		document.onmousemove = () => {
			Resizing_elem.style.width = String(Init_task_width + event.clientX - Start_mouse_pos_X) + "px";}}}
// Конец изменения длины задачи
function resize_task_stop(){
	document.onmouseup = () => {return false;}
	document.onmousemove = () => {return false;}
	if ((Remainder = parseInt(Resizing_elem.style.width) % 50) >= 25)
		Resizing_elem.style.width = String(parseInt(Resizing_elem.style.width) + 50 - Remainder) + "px";
	else Resizing_elem.style.width = String(parseInt(Resizing_elem.style.width) - Remainder) + "px";
	update_advices();}
// Начало перемещения задачи
function move_task_start(){
	if (event.button == 0){
		document.onmouseup = move_task_stop;
		Start_mouse_pos_X = event.clientX;
		Init_task_offset = parseInt(event.target.style.marginLeft);
		Moving_elem = event.target;
		document.onmousemove = () => {
			Moving_elem.style.marginLeft = String(Init_task_offset + event.clientX - Start_mouse_pos_X) + "px";}}
	// Удаление задачи
	else if (event.button == 2){
		document.getElementById("graph").removeChild(event.target);
		update_advices();}}
// Конец перемещения задачи
function move_task_stop(){
	document.onmouseup = () => {return false;}
	document.onmousemove = () => {return false;}
	if ((Remainder = parseInt(Moving_elem.style.marginLeft) % 50) >= 25)
		Moving_elem.style.marginLeft = String(parseInt(Moving_elem.style.marginLeft) + 50 - Remainder) + "px";
	else Moving_elem.style.marginLeft = String(parseInt(Moving_elem.style.marginLeft) - Remainder) + "px";
	if (parseInt(Moving_elem.style.marginLeft) < 0) Moving_elem.style.marginLeft = String(Init_task_offset) + "px";
	update_advices();}
//Начало протягивания связи между задачами
function add_link_start(){
    
}
//Конец назначения связи
function add_link_stop(){
    
}
// Обновление поля советов
var New_advice;
document.getElementById("input_name").addEventListener("blur", update_advices);
document.getElementById("people_amount").addEventListener("blur", update_advices);
document.getElementById("start_date").addEventListener("blur", update_advices);
document.getElementById("end_date").addEventListener("blur", update_advices);
function update_advices(){
	document.getElementById("advices").innerHTML = "";
	// Список всех советов
	if (document.getElementById("input_name").value == ""){
		New_advice = document.createElement("span");
		New_advice.innerText = '> Заполните поле "Название проекта".\n';
		document.getElementById("advices").appendChild(New_advice);}
	if ((document.getElementById("people_amount").value == "") || (document.getElementById("people_amount").value == 0)){
		New_advice = document.createElement("span");
		New_advice.innerText = '> Заполните поле "Количество людей в команде проекта".\n';
		document.getElementById("advices").appendChild(New_advice);}
	if (document.getElementById("start_date").value == ""){
		New_advice = document.createElement("span");
		New_advice.innerText = '> Заполните поле "Дата начала проекта".\n';
		document.getElementById("advices").appendChild(New_advice);}
	if (document.getElementById("end_date").value == ""){
		New_advice = document.createElement("span");
		New_advice.innerText = '> Заполните поле "Дата окончания проекта".\n';
		document.getElementById("advices").appendChild(New_advice);}
	if (document.getElementById("graph").childElementCount == 1){
		New_advice = document.createElement("span");
		New_advice.innerText = '> Заполните план проекта по принципу диаграммы Ганта.\n';
		document.getElementById("advices").appendChild(New_advice);}
	if ((document.getElementById("start_date").value != "") && (document.getElementById("end_date").value != "")){
		var Start_date = new Date(document.getElementById("start_date").value);
		var End_date = new Date(document.getElementById("end_date").value);
		Start_date.setHours(0, 0, 0, 0);
		End_date.setHours(0, 0, 0, 0);
		var Project_length = 0;
		for (i of document.querySelectorAll("#graph > *")){
			if (Math.floor((parseInt(i.style.marginLeft) + parseInt(i.style.width)) / 50) > Project_length)
				Project_length = Math.floor((parseInt(i.style.marginLeft) + parseInt(i.style.width)) / 50);}
		if (Start_date > End_date){
			New_advice = document.createElement("span");
			New_advice.innerText = '> Дата окончания проекта назначена раньше начала проекта.\n';
			document.getElementById("advices").appendChild(New_advice);}
		else if (Project_length > (End_date - Start_date) / (24*60*60*1000)){
			New_advice = document.createElement("span");
			New_advice.innerText = '> Длительность плана проекта больше, чем указанная длительность.\n';
			document.getElementById("advices").appendChild(New_advice);}}
	if ((document.getElementById("people_amount").value != "") && (document.getElementById("people_amount").value != 0)){
		var Task_amount = document.getElementById("graph").childElementCount - 1;
		if (document.getElementById("people_amount").value < Task_amount){
			New_advice = document.createElement("span");
			New_advice.innerText = '> Количество задач в проекте больше, чем размер команды проекта.\n';
			document.getElementById("advices").appendChild(New_advice);}}}
update_advices();
// Отключение контекстного меню
document.body.oncontextmenu = () => {return false;}