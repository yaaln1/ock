Для работы приложения необходимо создать файл .env в корне серверной части приложения со следующими переменными:
PORT=5000
MONGO_URL="YOUR_MONGODB_URL"
JWT_SECRET="YOUR_SECRET_STRING"
BASE_URL="http://localhost:5000"

---
В ./client/src/ нужно создать файл jsondata.js с содержимым:

const ock_contacts = {
    "Адамович Леонид Николаевич": null,
    "Петров Петр Петрович": null,
    "Иванова Ивана Ивановна": null,
}

export {ock_contacts}

требуется для автозаполняемого поля "ФИО сотрудника" при заполнении заявок