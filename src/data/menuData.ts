export interface MenuItem {
  id: string | number;
  slug: string;
  name: string;
  nameUr: string;
  description: string;
  descriptionUr: string;
  price: string;
  image: string;
  category: string;
  popular?: boolean;
  bgClass?: string;
  bgAccent?: string;
  details: {
    recipe: string;
    recipeUr: string;
    ingredients: string[];
    ingredientsUr: string[];
    prepTime: string;
    prepTimeUr: string;
    nutritionalInfo?: string;
    nutritionalInfoUr?: string;
  };
}

export const allMenuItems: MenuItem[] = [
  // From ExploreMenu
  {
    id: 1,
    slug: "daal-chawal",
    name: "Daal Chawal",
    nameUr: "دال چاول",
    category: "Sides",
    description: "Comfort food at its best. Slow-cooked yellow lentils served with aromatic steamed basmati rice.",
    descriptionUr: "بہترین آرام دہ کھانا۔ خوشبودار باسمتی چاولوں کے ساتھ پیش کی جانے والی ہلکی آنچ پر پکی ہوئی پیلی دال۔",
    price: "Rs. 450",
    image: "/images/home/menu/daal_chawal.png",
    bgClass: "bg-gradient-to-br from-yellow-50 to-red-50",
    details: {
      recipe: "Our Daal is a blend of Moong and Masoor lentils, slow-cooked for hours with turmeric, salt, and garlic. The 'Tarka' is the secret—sizzling oil with cumin, whole red chilies, and crispy garlic poured over the lentils just before serving.",
      recipeUr: "ہماری دال مونگ اور مسور کا آمیزہ ہے، جسے ہلدی، نمک اور لہسن کے ساتھ گھنٹوں پکایا جاتا ہے۔ اس کا اصل راز 'تڑکہ' ہے—زیرہ، گول لال مرچ اور کڑک لہسن کا گرم تڑکہ جو پیش کرنے سے پہلے دال پر ڈالا جاتا ہے۔",
      ingredients: ["Yellow Lentils", "Basmati Rice", "Garlic Tarka", "Cumin Seeds", "Pure Ghee"],
      ingredientsUr: ["پیلی دال", "باسمتی چاول", "لہسن کا تڑکہ", "زیرہ", "خالص گھی"],
      prepTime: "20-25 mins",
      prepTimeUr: "20-25 منٹ"
    }
  },
  {
    id: 2,
    slug: "chicken-karahi",
    name: "Chicken Karahi",
    nameUr: "چکن کڑاہی",
    category: "Karahi",
    description: "Traditional street-style chicken karahi with a perfect balance of spices and ginger.",
    descriptionUr: "روایتی سٹریٹ سٹائل چکن کڑاہی، مصالحوں اور ادرک کے بہترین توازن کے ساتھ۔",
    price: "Rs. 1,450",
    image: "/images/home/menu/chicken_karahi.png",
    bgClass: "bg-gradient-to-br from-red-50 to-red-50",
    details: {
      recipe: "Fresh chicken pieces stir-fried on high flame in a wok with tomatoes, ginger julienne, and crushed black pepper. No onions are used, ensuring an authentic 'Shinwari' style flavor that is both spicy and tangy.",
      recipeUr: "تازہ چکن کے ٹکڑوں کو ٹماٹر، باریک کٹی ادرک اور کٹی کالی مرچ کے ساتھ تیز آنچ پر کڑاہی میں بھونا جاتا ہے۔ پیاز کا استعمال نہیں کیا جاتا، جس سے ایک اصلی 'شنواری' ذائقہ ملتا ہے۔",
      ingredients: ["Fresh Chicken", "Vine Tomatoes", "Ginger Julienne", "Black Pepper", "Green Chilies"],
      ingredientsUr: ["تازہ چکن", "ٹماٹر", "باریک کٹی ادرک", "کالی مرچ", "ہری مرچیں"],
      prepTime: "30-35 mins",
      prepTimeUr: "30-35 منٹ"
    }
  },
  {
    id: 3,
    slug: "chicken-biryani",
    name: "Chicken Biryani",
    nameUr: "چکن بریانی",
    category: "Biryani",
    description: "The king of desi food. Fragrant rice and spiced chicken cooked to perfection.",
    descriptionUr: "دیسی کھانے کا بادشاہ۔ خوشبودار چاول اور مصالحے دار چکن جو کمال مہارت سے پکایا گیا ہے۔",
    price: "Rs. 650",
    image: "/images/home/menu/chicken_biryani.png",
    bgClass: "bg-gradient-to-br from-amber-50 to-yellow-50",
    details: {
      recipe: "Our Karachi-style biryani uses the finest spices. We create a rich 'Korma' first, then layer it with parboiled rice and steam it (Dum) with fresh mint and lemon slices for that signature aroma.",
      recipeUr: "ہماری کراچی سٹائل بریانی میں بہترین مصالحے استعمال ہوتے ہیں۔ پہلے ایک بھرپور 'قورمہ' تیار کیا جاتا ہے، پھر اسے چاولوں کے ساتھ تہوں میں لگا کر پودینے اور لیموں کے ساتھ دم دیا جاتا ہے۔",
      ingredients: ["Basmati Rice", "Chicken Korma", "Biryani Spices", "Fresh Mint", "Zarda Color"],
      ingredientsUr: ["باسمتی چاول", "چکن قورمہ", "بریانی مصالحہ", "تازہ پودینہ", "زردہ رنگ"],
      prepTime: "25-30 mins",
      prepTimeUr: "25-30 منٹ"
    }
  },
  {
    id: 4,
    slug: "seekh-kebab",
    name: "Seekh Kebab",
    nameUr: "سیخ کباب",
    category: "BBQ",
    description: "Flame-grilled chicken seekh kebabs, tender and packed with herbs.",
    descriptionUr: "آگ پر گرل کیے ہوئے چکن سیخ کباب، نرم اور جڑی بوٹیوں سے بھرپور۔",
    price: "Rs. 850",
    image: "/images/home/menu/seekh_kebab.png",
    bgClass: "bg-gradient-to-br from-red-50 to-red-50",
    details: {
      recipe: "Finely minced chicken mixed with green chilies, coriander, and our house-made kebab masala. Skewered and grilled over open flames until golden brown and succulent.",
      recipeUr: "باریک چکن قیمہ جسے ہری مرچوں، دھنیا اور ہمارے گھر کے بنے کباب مصالحے کے ساتھ ملایا جاتا ہے۔ پھر سیخوں پر لگا کر آگ پر سنہرا ہونے تک پکایا جاتا ہے۔",
      ingredients: ["Minced Chicken", "Green Chilies", "Coriander", "House Masala", "Butter"],
      ingredientsUr: ["چکن قیمہ", "ہری مرچیں", "دھنیا", "گھریلو مصالحہ", "مکھن"],
      prepTime: "15-20 mins",
      prepTimeUr: "15-20 منٹ"
    }
  },
  {
    id: 5,
    slug: "samosa-chaat",
    name: "Samosa Chaat",
    nameUr: "سموسہ چاٹ",
    category: "Sides",
    description: "Crispy potato samosas topped with tangy chickpeas, yogurt, and chutneys.",
    descriptionUr: "کرسپی آلو کے سموسے جن پر چٹ پٹے چھولے، دہی اور چٹنیاں ڈالی جاتی ہیں۔",
    price: "Rs. 250",
    image: "/images/home/menu/samosa_chaat.png",
    bgClass: "bg-gradient-to-br from-green-50 to-yellow-50",
    details: {
      recipe: "Two crispy vegetable samosas crushed and topped with warm, spiced chickpea curry. Drizzled with sweet imli chutney, spicy green chutney, and a dollop of fresh yogurt.",
      recipeUr: "دو کرسپی سبزیوں والے سموسے توڑ کر ان پر گرم، مصالحے دار چھولے ڈالے جاتے ہیں۔ پھر املی کی میٹھی چٹنی، ہری چٹنی اور تازہ دہی کے ساتھ پیش کیا جاتا ہے۔",
      ingredients: ["Crispy Samosas", "Spiced Chickpeas", "Imli Chutney", "Yogurt", "Fresh Onions"],
      ingredientsUr: ["کرسپی سموسے", "مصالحے دار چھولے", "املی کی چٹنی", "دہی", "تازہ پیاز"],
      prepTime: "10-15 mins",
      prepTimeUr: "10-15 منٹ"
    }
  },
  // From SignatureDesi
  {
    id: 6,
    slug: "special-mutton-karahi",
    name: "Special Mutton Karahi",
    nameUr: "سپیشل مٹن کڑاہی",
    category: "Karahi",
    description: "Authentic Peshawari style mutton karahi cooked with fresh tomatoes and green chilies.",
    descriptionUr: "اصلی پشاوری سٹائل مٹن کڑاہی جو تازہ ٹماٹروں اور ہری مرچوں کے ساتھ تیار کی جاتی ہے۔",
    price: "Rs. 2,499",
    image: "/images/home/desi/karahi_transparent.png",
    popular: true,
    details: {
      recipe: "Our mutton is slow-cooked in a traditional heavy-bottomed karahi with fresh, vine-ripened tomatoes and our secret blend of hand-ground spices.",
      recipeUr: "ہمارا مٹن روایتی بھاری پیندے والی کڑاہی میں ہلکی آنچ پر پکایا جاتا ہے۔",
      ingredients: ["Prime Mutton", "Fresh Tomatoes", "Green Chilies", "Hand-ground Spices", "Pure Ginger & Garlic"],
      ingredientsUr: ["بہترین مٹن", "تازہ ٹماٹر", "ہری مرچیں", "ہاتھ سے پسے مصالحے", "خالص ادرک اور لہسن"],
      prepTime: "45-60 mins",
      prepTimeUr: "45-60 منٹ"
    }
  },
  {
    id: 7,
    slug: "nawabi-chicken-biryani",
    name: "Nawabi Chicken Biryani",
    nameUr: "نوابی چکن بریانی",
    category: "Biryani",
    description: "Aromatic basmati rice layered with tender chicken, infused with saffron.",
    descriptionUr: "خوشبودار باسمتی چاول اور نرم چکن کی تہیں، زعفران کی مہک کے ساتھ۔",
    price: "Rs. 1,299",
    image: "/images/home/desi/biryani_transparent.png",
    popular: true,
    details: {
      recipe: "This biryani is prepared in the 'Dum' style. We marinate the chicken overnight in yogurt and spices, then slow-cook it in a sealed pot.",
      recipeUr: "یہ بریانی 'دم' سٹائل میں تیار کی جاتی ہے۔ ہم چکن کو رات بھر دہی اور مصالحوں میں میرینیٹ کرتے ہیں۔",
      ingredients: ["Long-grain Basmati Rice", "Tender Chicken", "Saffron", "Fresh Mint", "Aromatic Biryani Masala"],
      ingredientsUr: ["طویل باسمتی چاول", "نرم چکن", "زعفران", "تازہ پودینہ", "خوشبودار بریانی مصالحہ"],
      prepTime: "40-50 mins",
      prepTimeUr: "40-50 منٹ"
    }
  },
  {
    id: 8,
    slug: "sizzling-beef-seekh-kebab",
    name: "Sizzling Beef Seekh Kebab",
    nameUr: "سیزلنگ بیف سیخ کباب",
    category: "BBQ",
    description: "Juicy minced beef marinated with traditional herbs and grilled over charcoal.",
    descriptionUr: "روایتی جڑی بوٹیوں میں میرینیٹ شدہ رسیلا قیمہ، کوئلوں پر گرل کیا ہوا۔",
    price: "Rs. 1,899",
    image: "/images/home/desi/kebab_transparent.png",
    popular: true,
    details: {
      recipe: "We use the finest minced beef with traditional herbs and spices, then manually skewered and grilled over slow-burning charcoal.",
      recipeUr: "ہم بہترین بیف قیمہ استعمال کرتے ہیں جسے ہاتھ سے سیخوں پر چڑھایا جاتا ہے اور سلگتے ہوئے کوئلوں پر گرل کیا جاتا ہے۔",
      ingredients: ["Prime Minced Beef", "Fresh Herbs", "Traditional Spices", "Smoky Charcoal Grill", "Papaya Paste"],
      ingredientsUr: ["اعلیٰ معیار کا بیف قیمہ", "تازہ جڑی بوٹیوں", "روایتی مصالحے", "کوئلے کی گرل", "پپیتے کا پیسٹ"],
      prepTime: "25-30 mins",
      prepTimeUr: "25-30 منٹ"
    }
  },
  {
    id: 9,
    slug: "shahi-nihari",
    name: "Shahi Nihari",
    nameUr: "شاہی نہاری",
    category: "Karahi",
    description: "Slow-cooked beef shank in a rich, spicy bone marrow gravy.",
    descriptionUr: "ہلکی آنچ پر پکی ہوئی بیف نہاری، گاڑھی اور مصالحے دار گریوی کے ساتھ۔",
    price: "Rs. 1,599",
    image: "/images/home/desi/nihari_transparent.png",
    details: {
      recipe: "Our Nihari is slow-cooked for 8-10 hours in a rich, spicy gravy thickened with flour, resulting in incredibly tender meat.",
      recipeUr: "ہماری نہاری کو 8-10 گھنٹے تک ایک بھرپور مصالحے دار گریوی میں ہلکی آنچ پر پکایا جاتا ہے۔",
      ingredients: ["Beef Shank", "Bone Marrow", "Special Nihari Spices", "Pure Ghee", "Fresh Ginger & Lemon"],
      ingredientsUr: ["بیف بونگ", "نلی مخ", "سپیشل نہاری مصالحے", "خالص گھی", "تازہ ادرک اور لیموں"],
      prepTime: "8-10 hours",
      prepTimeUr: "8-10 گھنٹے"
    }
  },
  // Deals
  {
    id: "deal-1",
    slug: "royal-biryani-deal",
    name: "The Royal Biryani Deal",
    nameUr: "شاہی بریانی ڈیل",
    category: "Deals",
    description: "Nawabi Chicken Biryani paired with fresh raita, salad, and a 1.5L drink.",
    descriptionUr: "نوابی چکن بریانی، تازہ رائتہ، سلاد اور 1.5 لیٹر بوتل کے ساتھ۔",
    price: "Rs 1,499",
    image: "/images/home/desi/biryani_transparent.png",
    bgAccent: "bg-red-50/50",
    details: {
      recipe: "A complete royal experience featuring our signature Dum Biryani with all the essential accompaniments for a perfect meal.",
      recipeUr: "ایک مکمل شاہی تجربہ جس میں ہماری خاص دم بریانی تمام ضروری لوازمات کے ساتھ شامل ہے۔",
      ingredients: ["Chicken Biryani", "Fresh Raita", "Garden Salad", "1.5L Soft Drink"],
      ingredientsUr: ["چکن بریانی", "تازہ رائتہ", "سلاد", "1.5 لیٹر مشروب"],
      prepTime: "20-25 mins",
      prepTimeUr: "20-25 منٹ"
    }
  },
  {
    id: "deal-2",
    slug: "karahi-family-feast",
    name: "Karahi Family Feast",
    nameUr: "کڑاہی فیملی فیسٹ",
    category: "Deals",
    description: "Full Mutton Karahi, 4 fresh roghni naans, and mint chutney for the family.",
    descriptionUr: "فل مٹن کڑاہی، 4 تازہ روغنی نان اور پودینہ چٹنی پورے خاندان کے لیے۔",
    price: "Rs 3,199",
    image: "/images/home/desi/karahi_transparent.png",
    bgAccent: "bg-red-50/50",
    details: {
      recipe: "Our best-selling Mutton Karahi served family-style with freshly baked tandoori naans and handmade chutney.",
      recipeUr: "ہماری سب سے زیادہ بکنے والی مٹن کڑاہی، تازہ تندوری نان اور ہاتھ سے بنی چٹنی کے ساتھ فیملی پیک میں۔",
      ingredients: ["1kg Mutton Karahi", "4 Roghni Naans", "Mint Chutney", "Salad Platter"],
      ingredientsUr: ["1 کلو مٹن کڑاہی", "4 روغنی نان", "پودینہ چٹنی", "سلاد"],
      prepTime: "40-45 mins",
      prepTimeUr: "40-45 منٹ"
    }
  },
  {
    id: "deal-3",
    slug: "sizzling-kebab-platter",
    name: "Sizzling Kebab Platter",
    nameUr: "سیزلنگ کباب پلیٹر",
    category: "Deals",
    description: "12 pieces of export-grade beef seekh kebabs ready to grill or serve.",
    descriptionUr: "12 عدد اعلیٰ معیار کے بیف سیخ کباب، گرل یا سرو کرنے کے لیے تیار۔",
    price: "Rs 1,299",
    image: "/images/home/desi/kebab_transparent.png",
    bgAccent: "bg-amber-50/50",
    details: {
      recipe: "Perfectly seasoned beef seekh kebabs, grilled to perfection with a smoky aroma that will leave you wanting more.",
      recipeUr: "بہترین مصالحوں میں تیار بیف سیخ کباب، کوئلے کی مہک اور لاجواب ذائقے کے ساتھ۔",
      ingredients: ["12 Beef Kebabs", "Special Masala", "Green Chutney", "Fresh Onions"],
      ingredientsUr: ["12 بیف کباب", "سپیشل مصالحہ", "ہری چٹنی", "تازہ پیاز"],
      prepTime: "15-20 mins",
      prepTimeUr: "15-20 منٹ"
    }
  },
  {
    id: "deal-4",
    slug: "weekend-nihari-special",
    name: "Weekend Nihari Special",
    nameUr: "ویک اینڈ نہاری اسپیشل",
    category: "Deals",
    description: "Rich bone marrow Beef Nihari, served with crispy tandoori naans.",
    descriptionUr: "نلی والی شاہی بیف نہاری، کرسپی تندوری نان کے ساتھ۔",
    price: "Rs 1,899",
    image: "/images/home/desi/nihari_transparent.png",
    bgAccent: "bg-yellow-50/50",
    details: {
      recipe: "Slow-cooked overnight to achieve that thick, spicy gravy and melt-in-the-mouth beef texture.",
      recipeUr: "رات بھر ہلکی آنچ پر پکی ہوئی نہاری جس کی گاڑھی گریوی اور مکھن جیسا گوشت آپ کا دل جیت لے گا۔",
      ingredients: ["Beef Nihari", "Bone Marrow", "Ginger & Lemon", "2 Tandoori Naans"],
      ingredientsUr: ["بیف نہاری", "نلی مخ", "ادرک اور لیموں", "2 تندوری نان"],
      prepTime: "10-15 mins",
      prepTimeUr: "10-15 منٹ"
    }
  }
];
