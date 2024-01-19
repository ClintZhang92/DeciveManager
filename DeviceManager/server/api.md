deviceDB
item    id, name, sn, model, grade, owner, underMaintenance, country, city
length  {1,15}

127.0.0.1:3000/api/v1/device

AddDevice
POST   name, sn, model, grade, owner, underMaintenance, country, city

UpdateDevice(need sn)
PUT    name, sn, model, grade, owner, underMaintenance, country, city

DeleteDevice
POST   sn

FindDevice(sn)
GET

FindAllDevice
GET