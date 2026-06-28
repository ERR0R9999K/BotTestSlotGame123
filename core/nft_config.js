// ============================================================
// nft_config.js — Объединённый конфиг для NFT
// ============================================================

// ---- Иконки NFT ----
const NFT_Icons = {
    "headphones": { code: "\uf025", price: 110000 },
    "suitcase": { code: "\uf0f2", price: 85000 },
    "book": { code: "\uf02d", price: 5000 },
    "gem": { code: "\uf3a5", price: 60000 },
    "brain": { code: "\uf5dc", price: 120000 },
    "seedling": { code: "\uf4d8", price: 95000 },
    "candy": { code: "\uf786", price: 100000 },
    "paw": { code: "\uf1b0", price: 20000 },
    "snake": { code: "\ue579", price: 25000 },
    "tree": { code: "\uf1bb", price: 35000 },
    "smoking": { code: "\uf48d", price: 90000 },
    "circle": { code: "\uf111", price: 8000 },
    "car": { code: "\uf1b9", price: 55000 },
    "person": { code: "\uf183", price: 80000 },
    "wind": { code: "\uf72e", price: 32000 },
    "chair": { code: "\uf6c0", price: 50000 },
    "helmet": { code: "\uf0e8", price: 45000 },
    "heart": { code: "\uf004", price: 65000 },
    "hexagon": { code: "\uf312", price: 140000 },
    "shield": { code: "\uf132", price: 75000 },
    "gamepad": { code: "\uf11b", price: 38000 },
    "mask": { code: "\uf6fa", price: 42000 },
    "dollar": { code: "\uf155", price: 70000 },
    "bowl": { code: "\uf2ce", price: 12000 },
    "dove": { code: "\uf4ba", price: 15000 },
    "camera": { code: "\uf030", price: 28000 },
    "flag": { code: "\uf024", price: 30000 },
    "fish": { code: "\uf578", price: 18000 },
    "shoe": { code: "\uf54b", price: 40000 },
    "socks": { code: "\uf696", price: 48000 },
    "star": { code: "\uf005", price: 130000 },
    "leaf": { code: "\uf06c", price: 10000 },
    
    // Дополнительные иконки
    "zap": { code: "\uf0e7", price: 400000 },
    "fire": { code: "\uf06d", price: 180000 },
    "crown": { code: "\uf521", price: 150000 },
    "rocket": { code: "\uf135", price: 200000 },
    "magic": { code: "\uf0d0", price: 280000 },
    "skull": { code: "\uf54c", price: 220000 },
    "ghost": { code: "\uf6e2", price: 250000 },
    "dragon": { code: "\uf6d5", price: 300000 },
    "atom": { code: "\uf5d2", price: 350000 },
    "btc": { code: "\ue0b4", price: 380000 }
};

// ---- Фоны NFT ----
const NFT_Backgrounds = {
    "Airpods": { gradient: "linear-gradient(145deg, #cc0a00, #6d0d0d)", price: 15000 },
    "Backpack": { gradient: "linear-gradient(145deg, #747386, #14111e)", price: 10000 },
    "Book": { gradient: "linear-gradient(145deg, #ff8b31, #d60c0a)", price: 12000 },
    "BoxRing": { gradient: "linear-gradient(145deg, #b3fff7, #006071)", price: 18000 },
    "Brain": { gradient: "linear-gradient(145deg, #f96dcf, #fb9bb9)", price: 20000 },
    "Cactus": { gradient: "linear-gradient(145deg, #619d1f, #c76b1f)", price: 8000 },
    "CandyJar": { gradient: "linear-gradient(145deg, #b3c1f5, #7d1cb1)", price: 22000 },
    "Capybara": { gradient: "linear-gradient(145deg, #7c4822, #ac703d)", price: 12000 },
    "ChristmasSnake": { gradient: "linear-gradient(145deg, #00720e, #6ed526)", price: 15000 },
    "ChristmasTree": { gradient: "linear-gradient(145deg, #146031, #14bb52)", price: 18000 },
    "Cigar": { gradient: "linear-gradient(145deg, #eaeccf, #988d6f)", price: 25000 },
    "Coconut": { gradient: "linear-gradient(145deg, #43240e, #fedd93)", price: 8000 },
    "Cybertruck": { gradient: "linear-gradient(145deg, #33353a, #a19e9b)", price: 20000 },
    "Dog": { gradient: "linear-gradient(145deg, #781404, #bf5112)", price: 10000 },
    "Durov": { gradient: "linear-gradient(145deg, #402a1d, #d79f6a)", price: 25000 },
    "EgyptianCat": { gradient: "linear-gradient(145deg, #2b2d40, #b07c1e)", price: 15000 },
    "Fan": { gradient: "linear-gradient(145deg, #b20b77, #2e282b)", price: 12000 },
    "GamingChair": { gradient: "linear-gradient(145deg, #0f0f0f, #8f1311)", price: 18000 },
    "GoldHelmet": { gradient: "linear-gradient(145deg, #b66223, #dd3213)", price: 22000 },
    "GoldRing": { gradient: "linear-gradient(145deg, #8a590a, #d49400)", price: 20000 },
    "HeartJar": { gradient: "linear-gradient(145deg, #aa0d69, #cb5dd1)", price: 28000 },
    "Icosohedron": { gradient: "linear-gradient(145deg, #d91717, #9f0b0e)", price: 20000 },
    "JediSword": { gradient: "linear-gradient(145deg, #b562ff, #7368ff, #76eeff)", price: 30000 },
    "Joystick": { gradient: "linear-gradient(145deg, #b3c2d2, #757575)", price: 15000 },
    "Mask": { gradient: "linear-gradient(145deg, #332a3b, #746179)", price: 18000 },
    "Money": { gradient: "linear-gradient(145deg, #02bfcc, #f99896)", price: 20000 },
    "MoneyBouquet": { gradient: "linear-gradient(145deg, #4ec107, #e3ae00)", price: 22000 },
    "Noodles": { gradient: "linear-gradient(145deg, #d22727, #e19e3f)", price: 12000 },
    "PaperCrane": { gradient: "linear-gradient(145deg, #e6e7f7, #8c90c8)", price: 15000 },
    "PhotoCamera": { gradient: "linear-gradient(145deg, #b01c39, #ff5f7a)", price: 18000 },
    "RacingHelmet": { gradient: "linear-gradient(145deg, #c51385, #510032)", price: 20000 },
    "Shark": { gradient: "linear-gradient(145deg, #164f7f, #497fae)", price: 15000 },
    "Shoes": { gradient: "linear-gradient(145deg, #101317, #ec003f)", price: 12000 },
    "Sneakers": { gradient: "linear-gradient(145deg, #b6aea9, #ebe8e7)", price: 10000 },
    "Socks": { gradient: "linear-gradient(145deg, #232a3e, #404d6c)", price: 8000 },
    "StarsButton": { gradient: "linear-gradient(145deg, #a25005, #f9d358)", price: 25000 },
    "StarsPack": { gradient: "linear-gradient(145deg, #d7080d, #ff5b55)", price: 28000 },
    "Tea": { gradient: "linear-gradient(145deg, #a9abb0, #9f9646)", price: 12000 },
    "UfcPack": { gradient: "linear-gradient(145deg, #393939, #210d0c)", price: 15000 },
    
    // Кастомные фоны
    "PurpleHaze": { gradient: "linear-gradient(145deg, #2b1055, #75225b, #e2a1c1)", price: 40000 },
    "ArcticDawn": { gradient: "linear-gradient(145deg, #0b1a33, #1b3b5c, #4a7c82, #b5d6d6)", price: 50000 },
    "MangoTango": { gradient: "linear-gradient(145deg, #ff7e5f, #feb47b, #ffe29f)", price: 35000 },
    "Cyberpunk2077": { gradient: "linear-gradient(145deg, #0f0c29, #302b63, #24243e, #ff007f)", price: 60000 },
    "ForestWhispers": { gradient: "linear-gradient(145deg, #134e5e, #3a7b5b, #71b280, #e2e8b0)", price: 45000 },
    "PeachyKeen": { gradient: "linear-gradient(145deg, #fad0c4, #ffd1ff, #fbc2eb, #a6c1ee)", price: 38000 },
    "DarkLavender": { gradient: "linear-gradient(145deg, #2d1b4e, #4a2c6d, #6b4c8a)", price: 42000 },
    "Goldfish": { gradient: "linear-gradient(145deg, #f7971e, #ffd200, #f7971e)", price: 35000 },
    "MintyBreeze": { gradient: "linear-gradient(145deg, #0cebeb, #20e3b2, #29ffc6)", price: 40000 },
    "VelvetNight": { gradient: "linear-gradient(145deg, #0b0c10, #1f2833, #2a3b4c, #45a29e)", price: 48000 },
    "SakuraDream": { gradient: "linear-gradient(145deg, #f8cdda, #f8e8e8, #fde4e8, #ffd1dc)", price: 45000 },
    "ToxicWaste": { gradient: "linear-gradient(145deg, #11998e, #38ef7d, #d4fc79)", price: 50000 }
};

// ---- Цвета названий NFT ----
const NFT_Colors = {
    "Airpods": { hex: "#ff6861", price: 160000 },
    "Backpack": { hex: "#ababb8", price: 10000 },
    "Book": { hex: "#ffd011", price: 50000 },
    "BoxRing": { hex: "#f148a6", price: 90000 },
    "Brain": { hex: "#fec3d6", price: 80000 },
    "Cactus": { hex: "#8cca18", price: 32000 },
    "CandyJar": { hex: "#fe9e84", price: 85000 },
    "Capybara": { hex: "#c48c5b", price: 25000 },
    "ChristmasSnake": { hex: "#9af660", price: 38000 },
    "ChristmasTree": { hex: "#49fefc", price: 42000 },
    "Cigar": { hex: "#fc5d3c", price: 130000 },
    "Coconut": { hex: "#dbd4c3", price: 22000 },
    "Cybertruck": { hex: "#a9c1e1", price: 40000 },
    "Dog": { hex: "#83ae15", price: 28000 },
    "Durov": { hex: "#ffd2a5", price: 150000 },
    "EgyptianCat": { hex: "#2e8ec5", price: 45000 },
    "Fan": { hex: "#625c60", price: 20000 },
    "GamingChair": { hex: "#b9b9b9", price: 8000 },
    "GoldHelmet": { hex: "#fce991", price: 75000 },
    "GoldRing": { hex: "#c2c2c2", price: 12000 },
    "HeartJar": { hex: "#f3cefd", price: 180000 },
    "Icosohedron": { hex: "#e90e0e", price: 140000 },
    "JediSword": { hex: "#acccdd", price: 200000 },
    "Joystick": { hex: "#ff27d7", price: 95000 },
    "Mask": { hex: "#9f849f", price: 48000 },
    "Money": { hex: "#fce527", price: 60000 },
    "MoneyBouquet": { hex: "#f8d347", price: 55000 },
    "Noodles": { hex: "#fff487", price: 250000 },
    "PaperCrane": { hex: "#d8d7f4", price: 220000 },
    "PhotoCamera": { hex: "#ff93a5", price: 120000 },
    "RacingHelmet": { hex: "#dd339e", price: 100000 },
    "Shark": { hex: "#7cacd7", price: 35000 },
    "Shoes": { hex: "#262a31", price: 18000 },
    "Sneakers": { hex: "#fdfcfc", price: 5000 },
    "Socks": { hex: "#35425c", price: 15000 },
    "StarsButton": { hex: "#fcfcbd", price: 65000 },
    "StarsPack": { hex: "#fee22a", price: 70000 },
    "Tea": { hex: "#d5ba57", price: 30000 },
    "UfcPack": { hex: "#d80013", price: 110000 },
    
    // Кастомные цвета
    "AbyssalTeal": { hex: "#0a4c5c", price: 50000 },
    "DustyRose": { hex: "#b57a7a", price: 60000 },
    "SmokedAmethyst": { hex: "#6b4a7a", price: 70000 },
    "BurntSaffron": { hex: "#c47a3a", price: 80000 },
    "FrostedMint": { hex: "#7ab8a8", price: 90000 },
    "ShadowPlum": { hex: "#4a2a5a", price: 100000 },
    "GoldenAmber": { hex: "#c4903a", price: 110000 },
    "StormySage": { hex: "#6a7a5a", price: 120000 },
    "VelvetMagenta": { hex: "#8a2a5a", price: 130000 },
    "FoggyLavender": { hex: "#9a8aaa", price: 140000 },
    "RustyCrimson": { hex: "#8a2a2a", price: 150000 },
    "SteelBlue": { hex: "#4a6a8a", price: 160000 }
};

// ---- Главный конфиг NFT (всё в одном месте!) ----
const NFT_Config = [
    { id: "Airpods", name: "Airpods", background: "Airpods", color: "Airpods", icons: "headphones", file: "airpods.webp", basePrice: 1000000 },
    { id: "Backpack", name: "Рюкзак", background: "Backpack", color: "Backpack", icons: "suitcase", file: "backpack.webp", basePrice: 75000 },
    { id: "Book", name: "Книга", background: "Book", color: "Book", icons: "book", file: "book.webp", basePrice: 10000 },
    { id: "BoxRing", name: "Коробка с кольцом", background: "BoxRing", color: "BoxRing", icons: "gem", file: "boxRing.webp", basePrice: 200000 },
    { id: "Brain", name: "Мозг", background: "Brain", color: "Brain", icons: "brain", file: "brain.webp", basePrice: 26000 },
    { id: "Cactus", name: "Кактус", background: "Cactus", color: "Cactus", icons: "seedling", file: "cactus.webp", basePrice: 28000 },
    { id: "CandyJar", name: "Банка конфет", background: "CandyJar", color: "CandyJar", icons: "candy", file: "candyJar.webp", basePrice: 150000 },
    { id: "Capybara", name: "Капибара", background: "Capybara", color: "Capybara", icons: "paw", file: "capybara.webp", basePrice: 85000 },
    { id: "ChristmasSnake", name: "Рождественская змея", background: "ChristmasSnake", color: "ChristmasSnake", icons: "snake", file: "christmasSnake.webp", basePrice: 120000 },
    { id: "ChristmasTree", name: "Рождественская ёлка", background: "ChristmasTree", color: "ChristmasTree", icons: "tree", file: "christmasTree.webp", basePrice: 350000 },
    { id: "Cigar", name: "Сигара", background: "Cigar", color: "Cigar", icons: "smoking", file: "cigar.webp", basePrice: 900000 },
    { id: "Coconut", name: "Кокос", background: "Coconut", color: "Coconut", icons: "circle", file: "coconut.webp", basePrice: 18000 },
    { id: "Cybertruck", name: "Кибертрак", background: "Cybertruck", color: "Cybertruck", icons: "car", file: "cybertruck.webp", basePrice: 700000 },
    { id: "Dog", name: "Собачка", background: "Dog", color: "Dog", icons: "paw", file: "dog.webp", basePrice: 55000 },
    { id: "Durov", name: "Павел Дуров", background: "Durov", color: "Durov", icons: "person", file: "durov.webp", basePrice: 1200000 },
    { id: "EgyptianCat", name: "Египетская кошка", background: "EgyptianCat", color: "EgyptianCat", icons: "paw", file: "egyptianCat.webp", basePrice: 90000 },
    { id: "Fan", name: "Фен", background: "Fan", color: "Fan", icons: "wind", file: "fan.webp", basePrice: 100000 },
    { id: "GamingChair", name: "Игровое кресло", background: "GamingChair", color: "GamingChair", icons: "chair", file: "gamingChair.webp", basePrice: 450000 },
    { id: "GoldHelmet", name: "Золотой шлем", background: "GoldHelmet", color: "GoldHelmet", icons: "helmet", file: "goldHelmet.webp", basePrice: 400000 },
    { id: "GoldRing", name: "Золотое кольцо", background: "GoldRing", color: "GoldRing", icons: "circle", file: "goldRing.webp", basePrice: 550000 },
    { id: "HeartJar", name: "Зелье сердца", background: "HeartJar", color: "HeartJar", icons: "heart", file: "heartJar.webp", basePrice: 2000000 },
    { id: "Icosohedron", name: "Магический куб", background: "Icosohedron", color: "Icosohedron", icons: "hexagon", file: "icosohedron.webp", basePrice: 1500000 },
    { id: "JediSword", name: "Световой меч", background: "JediSword", color: "JediSword", icons: "shield", file: "jediSword.webp", basePrice: 5000000 },
    { id: "Joystick", name: "Джойстик", background: "Joystick", color: "Joystick", icons: "gamepad", file: "joystick.webp", basePrice: 65000 },
    { id: "Mask", name: "Маска", background: "Mask", color: "Mask", icons: "mask", file: "mask.webp", basePrice: 480000 },
    { id: "Money", name: "Деньги", background: "Money", color: "Money", icons: "shield", file: "money.webp", basePrice: 600000 },
    { id: "MoneyBouquet", name: "Денежный букет", background: "MoneyBouquet", color: "MoneyBouquet", icons: "dollar", file: "moneyBouquet.webp", basePrice: 250000 },
    { id: "Noodles", name: "Лапша", background: "Noodles", color: "Noodles", icons: "bowl", file: "noodles.webp", basePrice: 23000 },
    { id: "PaperCrane", name: "Бумажный журавлик", background: "PaperCrane", color: "PaperCrane", icons: "dove", file: "paperCrane.webp", basePrice: 180000 },
    { id: "PhotoCamera", name: "Фото-камера", background: "PhotoCamera", color: "PhotoCamera", icons: "camera", file: "photoCamera.webp", basePrice: 280000 },
    { id: "RacingHelmet", name: "Гоночный шлем", background: "RacingHelmet", color: "RacingHelmet", icons: "flag", file: "racingHelmet.webp", basePrice: 800000 },
    { id: "Shark", name: "Акула", background: "Shark", color: "Shark", icons: "fish", file: "shark.webp", basePrice: 60000 },
    { id: "Shoes", name: "Туфли", background: "Shoes", color: "Shoes", icons: "shoe", file: "shoes.webp", basePrice: 70000 },
    { id: "Sneakers", name: "Кроссовки", background: "Sneakers", color: "Sneakers", icons: "shoe", file: "sneakers.webp", basePrice: 500000 },
    { id: "Socks", name: "Носки", background: "Socks", color: "Socks", icons: "socks", file: "socks.webp", basePrice: 12000 },
    { id: "StarsButton", name: "Кнопка звёзд", background: "StarsButton", color: "StarsButton", icons: "star", file: "starsButton.webp", basePrice: 220000 },
    { id: "StarsPack", name: "Коробка звёзд", background: "StarsPack", color: "StarsPack", icons: "star", file: "starsPack.webp", basePrice: 300000 },
    { id: "Tea", name: "Пакетик \"чая\"", background: "Tea", color: "Tea", icons: "leaf", file: "tea.webp", basePrice: 1300000 },
    { id: "UfcPack", name: "UFC пак", background: "UfcPack", color: "UfcPack", icons: "star", file: "ufcPack.webp", basePrice: 40300 }
];

// ---- Функция для расчёта полной цены NFT ----
function calculateNFTPrice(nftId) {
    const nft = NFT_Config.find(item => item.id === nftId);
    if (!nft) return 0;
    
    const basePrice = nft.basePrice || 0;
    const backgroundPrice = NFT_Backgrounds[nft.background]?.price || 0;
    const colorPrice = NFT_Colors[nft.color]?.price || 0;
    const iconPrice = NFT_Icons[nft.icons]?.price || 0;
    
    return basePrice + backgroundPrice + colorPrice + iconPrice;
}

// ---- Функция для получения полной информации об NFT ----
function getNFTInfo(nftId) {
    const nft = NFT_Config.find(item => item.id === nftId);
    if (!nft) return null;
    
    return {
        ...nft,
        backgroundGradient: NFT_Backgrounds[nft.background]?.gradient || "",
        colorHex: NFT_Colors[nft.color]?.hex || "",
        iconCode: NFT_Icons[nft.icons]?.code || "",
        totalPrice: calculateNFTPrice(nftId)
    };
}

// ---- Делаем всё глобально доступным ----
window.NFT_Icons = NFT_Icons;
window.NFT_Backgrounds = NFT_Backgrounds;
window.NFT_Colors = NFT_Colors;
window.NFT_Config = NFT_Config;
window.calculateNFTPrice = calculateNFTPrice;
window.getNFTInfo = getNFTInfo;

// ---- Тестовый вывод ----
console.log('✅ NFT Config загружен!');
console.log('Пример цены Airpods:', calculateNFTPrice("Airpods")); 
// 1,000,000 + 15,000 + 160,000 + 110,000 = 1,285,000

console.log('Пример информации о Book:', getNFTInfo("Book"));
// { id: "Book", name: "Книга", background: "Book", ... totalPrice: 77000 }

console.log('Всего NFT в конфиге:', NFT_Config.length);