using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Microsoft.VisualBasic;
using System.IO;
namespace Программа_для_выборов{
public partial class Form1 : Form{
public Form1() => InitializeComponent();
List<string> voted = new List<string>(){
    "Ковалёв Андрей Сергеевич, 1234, 123456",
    "Виноградова Екатерина Евгеньевна, 2345, 234567",
    "Королёв Алексей Игоревич, 3456, 345678"};
private void button5_Click(object sender, EventArgs e){
    button5.Visible = false;
    button7.Visible = true;
    button8.Visible = true;
    button9.Visible = true;}
private void button6_Click(object sender, EventArgs e){
    button5.Visible = true;
    button7.Visible = false;
    button8.Visible = false;
    button9.Visible = false;}
private void button4_Click(object sender, EventArgs e){
    voted.Add("");
    if (voted[0] == "")
        label9.Text = "Нет списка избирателей";
    else if (voted.IndexOf(textBox1.Text + ", " + textBox2.Text + ", " + textBox3.Text + " V") != -1)
        label9.Text = "Вы уже голосовали";
    else if (voted.IndexOf(textBox1.Text + ", " + textBox2.Text + ", " + textBox3.Text) == -1)
        label9.Text = "Вам не нужно голосовать";
    else if (listBox1.SelectedIndex == -1)
        label9.Text = "Вы не выбрали избираемого";
    else{
        listBox2.Items[listBox1.SelectedIndex] = Convert.ToInt32(listBox2.Items[listBox1.SelectedIndex]) + 1;
        voted[voted.IndexOf(textBox1.Text + ", " + textBox2.Text + ", " + textBox3.Text)] += " V";
        label9.Text = "";}
    voted.Remove("");}
private void button8_Click(object sender, EventArgs e){
    if (listBox1.SelectedIndex == -1)
        label9.Text = "Вы не выбрали избираемого";
    else{
        listBox2.Items.RemoveAt(listBox1.SelectedIndex);
        listBox1.Items.RemoveAt(listBox1.SelectedIndex);
        label9.Text = "";}}
private void button9_Click(object sender, EventArgs e){
    string FilePath = "";
    OpenFileDialog oDlg = new OpenFileDialog();
    oDlg.Filter = "Text files (*.txt)|*.txt";
    if (oDlg.ShowDialog() == DialogResult.OK)
        FilePath = oDlg.FileName;
    voted.Clear();
    voted.AddRange(File.ReadAllLines(FilePath));}
private void button7_Click(object sender, EventArgs e){
    string Name = Interaction.InputBox("Введите ФИО избираемого", "Добавление избираемого");
    if (Name != ""){
        listBox1.Items.Add(Name);
        listBox2.Items.Add(0);}}
}}