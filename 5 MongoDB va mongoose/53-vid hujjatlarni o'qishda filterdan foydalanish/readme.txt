Solishtiruv operatorlari

$eq (equal)
$ne (not equal)
$gt (greater than)
$gte (greater than or equal)
$lt (less than)
$lte (less than or equal)
$in (in)
$nin (not in)


mangoose classi methodlari
 .find()
 .find({price: {$in: [11, 15, 20]} ///bu ishlatishni ikkinchi usuli
 .limit(3)
 .sort({name: 1})
 .select({name: 1, tags: 1, price: 1})
 .or([{author: "Qodirov Jahongir"}, {isPublished: true}])
 .and([{author: "Qodirov Jahongir"}, {isPublished: true}])
 .countDocuments()
