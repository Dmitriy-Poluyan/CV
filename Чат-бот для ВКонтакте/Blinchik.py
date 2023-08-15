# Запускать этот файл можно лишь в том случае, когда на хостинге не запущена его копия
# This file is outdated. Newer version is located at the hosting

cat_photos = []
dog_photos = [457240642]
ham_photos = [457240642]
cat_comment = ['Держи котика']
cat_confirm = ['Дай ещё']
cat_decline = ['Вернуться назад']
dog_comment = ['Это пока недоступно']
dog_confirm = ['В разработке...']
dog_decline = ['Вернуться назад']
ham_comment = ['Это пока недоступно']
ham_confirm = ['В разработке...']
ham_decline = ['Вернуться назад']
anecdotes = ['Это пока недоступно']
anecdote_confirm = ['В разработке...']
anecdote_decline = ['Вернуться назад']

TOKEN = 'Сюда вставить токен бота'
group_id = 198651557

first_photo = 457240642
for i in range(107): cat_photos.append(first_photo + i)

import vk_api
from vk_api.utils import get_random_id
from vk_api.bot_longpoll import VkBotLongPoll, VkBotEventType
from json import dumps
vk_session = vk_api.VkApi(token=TOKEN)
vk = vk_session.get_api()
longpoll = VkBotLongPoll(vk_session, str(group_id))
users_file = open('Users.txt')
users = users_file.read()
users_file.close()
for event in longpoll.listen():
    print(event)
    if event.type == VkBotEventType.MESSAGE_NEW and event.obj.text != '' and event.from_user:
        photo = ''
        if users.find('id' + str(event.obj.from_id)) == -1 or event.obj.payload == '"return"':
            if users.find('id' + str(event.obj.from_id)) == -1:
                users += 'id' + str(event.obj.from_id) + ' joke=0, cats=0, dogs=0, hams=0,\n'
                users_file = open('Users.txt', 'w')
                users_file.write(users)
                users_file.close()
            reply = 'Привет! Хочешь глянуть на котиков, собачек и хомячков?'
            bot_keyboard = {
                'buttons': [
                    [{'action': {
                        'type': 'text',
                        'label': 'Да!!',
                        'payload': '"confirm"'},
                    'color': 'positive'}],
                    [{'action': {
                        'type': 'text',
                        'label': 'А анекдоты есть?',
                        'payload': '"joke"'},
                    'color': 'positive'}]]}
        elif event.obj.payload == '"confirm"':
            reply = 'Кого?'
            bot_keyboard = {
                'buttons': [
                    [{'action': {
                        'type': 'text',
                        'label': 'Котиков',
                        'payload': '"cats"'},
                    'color': 'positive'}],
                    [{'action': {
                        'type': 'text',
                        'label': 'Собачек',
                        'payload': '"dogs"'},
                    'color': 'positive'}],        
                    [{'action': {
                        'type': 'text',
                        'label': 'Хомячков',
                        'payload': '"hams"'},
                    'color': 'positive'}],                    
                    [{'action': {
                        'type': 'text',
                        'label': 'Вернуться назад',
                        'payload': '"return"'},
                    'color': 'negative'}]]}
        elif event.obj.payload == '"cats"' or event.obj.payload == '"dogs"' or event.obj.payload == '"hams"':
            photo_id = int(users[users.find(event.obj.payload[1:-1] + '=', users.find('id' + str(event.obj.from_id))) + 5 : users.find(',', users.find(event.obj.payload[1:-1] + '=', users.find('id' + str(event.obj.from_id))))])
            photo = 'photo-' + str(group_id) + '_' + str(eval(event.obj.payload[1: -2] + '_photos[photo_id % len(eval(event.obj.payload[1: -2] + "_photos"))]')) + '_' + TOKEN
            #reply = eval(event.obj.payload[1: -2] + '_comment[photo_id % len(eval(event.obj.payload[1: -2] + "_photos"))]')
            reply = cat_comment[0]
            if photo_id == len(eval(event.obj.payload[1: -2] + '_photos')) - 1:
                if event.obj.payload == '"cats"': reply += '\n \n Вы просмотрели все фотографии котиков на данный момент. Следующие фотографии будут выводиться по кругу'
                elif event.obj.payload == '"dogs"': reply += '\n \n Вы просмотрели все фотографии собачек на данный момент. Следующие фотографии будут выводиться по кругу'
                else: reply += '\n \n Вы просмотрели все фотографии хомячков на данный момент. Следующие фотографии будут выводиться по кругу'
            user_line = users[users.find('id' + str(event.obj.from_id)) : users.find(',', users.find('hams=', users.find('id' + str(event.obj.from_id)))) + 1]
            user_line_new = user_line[0 : user_line.find(event.obj.payload[1:-1] + '=') + 5] + str(photo_id + 1) + user_line[user_line.find(',', user_line.find(event.obj.payload[1:-1] + '=')) : ]
            users = users.replace(user_line, user_line_new)
            users_file = open('Users.txt', 'w')
            users_file.write(users)
            users_file.close()
            bot_keyboard = {
                'buttons': [
                    [{'action': {
                        'type': 'text',
                        #'label': eval(event.obj.payload[1: -2] + '_confirm[photo_id % len(cat_photos)]'),
                        'label': cat_confirm[0],
                        'payload': event.obj.payload},
                    'color': 'positive'}],
                    [{'action': {
                        'type': 'text',
                        #'label': eval(event.obj.payload[1: -2] + '_decline[photo_id % len(cat_photos)]'),
                        'label': cat_decline[0],
                        'payload': '"return"'},
                    'color': 'negative'}]]}
        elif event.obj.payload == '"joke"' or event.obj.payload == '"more_jokes"':
            anecdote_id = int(users[users.find('joke=', users.find('id' + str(event.obj.from_id))) + 5 : users.find(',', users.find('joke=', users.find('id' + str(event.obj.from_id))))])
            reply = anecdotes[anecdote_id % len(anecdotes)]
            user_line = users[users.find('id' + str(event.obj.from_id)) : users.find(',', users.find('hams=', users.find('id' + str(event.obj.from_id)))) + 1]
            user_line_new = user_line[0 : user_line.find('joke=') + 5] + str(anecdote_id + 1) + user_line[user_line.find(',', user_line.find('joke=')) : ]
            users = users.replace(user_line, user_line_new)
            users_file = open('Users.txt', 'w')
            users_file.write(users)
            users_file.close()
            if anecdote_id == len(anecdotes) - 1: reply += '\n \n Вы просмотрели все анекдоты на данный момент. Следующие анекдоты будут выводиться по кругу'
            if event.obj.payload == '"joke"': reply = 'Конечно есть! Держи: \n' + reply
            bot_keyboard = {
                'buttons': [
                    [{'action': {
                        'type': 'text',
                        'label': anecdote_confirm[anecdote_id % len(anecdotes)],
                        'payload': '"more_jokes"'},
                    'color': 'positive'}],
                    [{'action': {
                        'type': 'text',
                        'label': anecdote_decline[anecdote_id % len(anecdotes)],
                        'payload': '"return"'},
                    'color': 'negative'}]]}
        else:
            reply = 'Воспользуйтесь кнопками для взаимодействия с ботом'
            bot_keyboard = {
                'buttons': [
                    [{'action': {
                        'type': 'text',
                        'label': 'Покажи котиков',
                        'payload': '"cats"'},
                    'color': 'positive'}],
                    [{'action': {
                        'type': 'text',
                        'label': 'Покажи собачек',
                        'payload': '"dogs"'},
                    'color': 'positive'}],        
                    [{'action': {
                        'type': 'text',
                        'label': 'Покажи хомячков',
                        'payload': '"hams"'},
                    'color': 'positive'}],                    
                    [{'action': {
                        'type': 'text',
                        'label': 'Вернуться в меню',
                        'payload': '"return"'},
                    'color': 'negative'}]]}
        vk.messages.send(user_id=event.obj.from_id,
                         random_id=get_random_id(),
                         message=reply,
                         keyboard=dumps(bot_keyboard),
                         attachment=photo)
