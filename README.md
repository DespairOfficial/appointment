### Запуск

docker-compose up --build
База изначально заполнена

###### Работа с API

### Doctors

GET: /doctors
POST: {name, spec, slots} /doctors/create - создать доктора
POST: {doctorId, slot} /doctors/slot/create - добавить слот доктору

### Tickets

GET: /tickets - все записи
POST: {doctor, user, slot} /tickets/create - добавить запись

### Users

GET: /users - все пользователи
POST: {name, phone} /users/create - создать пользователя
GET: /users/:userId/wait - ждать напоминание для пользователя
