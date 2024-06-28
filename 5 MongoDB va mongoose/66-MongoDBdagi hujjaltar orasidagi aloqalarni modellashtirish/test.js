// MongoDBdagi hujjaltar orasidagi aloqalarni modellashtirish

// 1. Ko'rsatkichli (normalization)--> Consistency
let author = {
  _id: 123,
  firstName: "Jahongir",
  LastName: "Qodirov",
};
let book = {
  _id: 456,
  title: "MongoDB darslari",
  author_id: 123,
};
// 2. Biriktirish (denormalization)-->Performance
let book1 = {
  _id: 456,
  title: "MongoDB darslari",
  author_id: {
    _id: 123,
    firstName: "Jahongir",
    LastName: "Qodirov",
  },
};
// 3. 1va2larning chatishmasi (hybrid)
let book2 = {
  _id: 456,
  title: "MongoDB darslari",
  author_id: {
    _id: 123,
    firstName: "Jahongir",
  },
};
