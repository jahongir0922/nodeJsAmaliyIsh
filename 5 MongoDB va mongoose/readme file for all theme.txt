Install mongo db server and install mongodb compass

sudo systemctl status mongod /// ishlayotgan yoki yo'qligini bilish
sudo systemctl start mongod  /// ishga tushurish


Solishtiruv operatorlari

$eq (equal)
$ne (not equal)
$gt (greater than)
$gte (greater than or equal)
$lt (less than)
$lte (less than or equal)
$in (in)
$nin (not in)


mangoose classining methodlari
 .find()
 .find({price: {$in: [11, 15, 20]} ///bu ishlatishni ikkinchi usuli
 .limit(3)
 .sort({name: 1})
 .select({name: 1, tags: 1, price: 1})
 .or([{author: "Qodirov Jahongir"}, {isPublished: true}])
 .and([{author: "Qodirov Jahongir"}, {isPublished: true}])
 .countDocuments()
 
 
 mongoimport json fayldan malumotlarni import qiladi
 
 mongoimport --db test --collection inventory --file "C:\temp\inventory.json" --drop  ///bu yerda - test - database nomi, inventory - collection nomi, C:\temp\inventory.json - file qayerdaligi va nomi, 	
 											--drop - databaseda kiritilgan nomdagi collection mavjud bo'lsa eskisini o'chirvoradi
 
