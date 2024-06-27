Semantik versioning ga ko'ra dasturning versiyasi 3 qismdan iborat bo'ladi:
"^5.7.8"  //major.minor.patch

Patch--- dasturda birorta bugfix bo'lganda dastur versiyasi(patch) bittaga oshiriladi

Minor---dasturga yangi xususiyat qo'shilganda dastur versiyasi(minor) bittaga oshiriladi. Bu xususiyat dasturni apisini o'zgartirmaydigan bo'lishi kerak (none breaking change)

Major-dasturga yangi xususiyat qo'shilib api si ham ozgarishi kerak bo'ganda dastur versiyasi (major) bittaga oshiriladi

^-bu belgi caret deyiladi("^5.7.8" yoki "v5.x"). Bu belgi dasturdagi minor yoki patch o'zgarishiga ruxsat beradi, major qatiy qoladi. boshqacha korinishi "v5.x"

~-bu belgi tilda deyiladi ("~5.7.8" yoki "v5.7.x"). Bu belgi dasturdagi faqat patch o'zgarishiga ruxsat beradi, major va minor qatiy qoladi. boshqacha korinishi "v5.7.x"

Agar versiyasini o'zgarishini hohlamasangiz versiya oldiga hech qanday belgi qo'yilmasligi kerak ("5.7.8")