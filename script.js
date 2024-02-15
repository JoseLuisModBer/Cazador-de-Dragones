/*****************
 *** VARIABLES ***
 ****************/

let xp = 0;
let salud = 100;
let oro = 50;
let currentWeapon = 0;
let fighting;
let monsterSalud;
let inventory = ['palo'];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const instructionsButton = document.querySelector('#instructionsButton');
const borrarLocalStorageButton = document.querySelector(
  '#borrarLocalStorageButton'
);
const logrosDesbloqueados = document.querySelector('#logrosDesbloqueados');

const instructionsPanel = document.querySelector('#instructionsPanel');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const currentWeaponText = document.querySelector('#currentWeaponText');
const numberOfWeaponsText = document.querySelector('#numberOfWeaponsText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterSaludText = document.querySelector('#monsterSalud');
const weapons = [
  { name: 'palo', power: 5 },
  { name: 'daga', power: 30 },
  { name: 'martillo', power: 50 },
  { name: 'espada', power: 100 },
];
const monsters = [
  {
    name: 'jabalí',
    level: 2,
    salud: 15,
  },
  {
    name: 'orco',
    level: 8,
    salud: 60,
  },
  {
    name: 'dragón',
    level: 20,
    salud: 300,
  },
];
const locations = [
  {
    name: 'plaza del pueblo',
    'button text': ['Ir a la tienda', 'Ir a la cueva', 'Enfrentar al Dragón'],
    'button functions': [goStore, goCave, fightDragon],
    text: 'Estás en la plaza del pueblo. Ves un letrero de madera que señala varias direcciones. En él puedes leer: "Tienda", "Cuevas" y "Salida del Pueblo". ¿A dónde quieres ir?',
  },
  {
    name: 'Tienda',
    'button text': [
      '+10 de salud (10 oro)',
      'Nueva arma (30 oro)',
      'Ir a la plaza del pueblo',
    ],
    'button functions': [buySalud, buyWeapon, goTown],
    text: 'Has entrado en la tienda.',
  },
  {
    name: 'cueva',
    'button text': [
      'Pelear contra el jabalí',
      'Pelear contra el orco',
      'Ir a la plaza del pueblo',
    ],
    'button functions': [fightSlime, fightBeast, goTown],
    text: 'Has entrado en la cueva pero... ¡está plagada de monstruos! ¿Decides pelear o huyes de nuevo al pueblo?',
  },
  {
    name: 'lucha',
    'button text': ['Atacar', 'Esquivar', 'Huir'],
    'button functions': [attack, dodge, goTown],
    text: 'Te enfrentas a un monstruo.',
  },
  {
    name: 'matar monstruo',
    'button text': [
      'Ir a la plaza del pueblo',
      'Ir a la plaza del pueblo',
      'Ir a la plaza del pueblo',
    ],
    'button functions': [goTown, goTown, easterEgg],
    text: 'El monstruo grita "¡Arg!" al morir. Ganas puntos de experiencia y encuentras oro.',
  },
  {
    name: 'perder',
    'button text': ['REJUGAR?', 'REJUGAR?', 'REJUGAR?'],
    'button functions': [restart, restart, restart],
    text: 'Has muerto. ☠️ La última esperanza para vencer al malvado dragón se ha esfumado con tu deceso. Los aldeanos han perdido la esperanza. Con el paso del tiempo algunos mueren lentamente de inanición mientras que otros deciden acabar con su vida de formas diversas. Finalmente el pueblo es devorado por las llamas del dragón y este se marcha en busca de un nuevo pueblo que destruir.',
  },
  {
    name: 'ganar',
    'button text': ['REJUGAR?', 'REJUGAR?', 'REJUGAR?'],
    'button functions': [restart, restart, restart],
    text: '¡Has vencido al malvado dragón! Los aldeanos no se lo pueden creer. Al final tú, el jóven discípulo del gran guerrero ModBer has dado la talla, demostrando tu valía, valentía y honor. El pueblo entero vitorea tus hazañas y se inician los preparativos para una gran fiesta en tu honor. 🎉',
  },
  {
    name: 'easter egg',
    'button text': ['2', '8', 'Ir a la plaza del pueblo?'],
    'button functions': [pickTwo, pickEight, goTown],
    text: '¡ATENCIÓN! Desde un callejón oscuro, uno de los aldeanos te hace un gesto para que te acerques. Te propone un juego. Él va a elegir 10 números del 0 al 10 que serán los 10 números ganadores. Te dará a elegir entre dos números y uno de estos dos números será uno de los 10 ganadores y el otro no. Tendrás que elegir uno de esos dos números. Si aceritas te dará 20 monedas de oro. Si pierdes te dará un puñetazo y perderás 10 puntos de salud. Puedes jugar hasta hacerte rico, hasta morir por los golpes o hasta que decidas marcharte.',
  },
  {
    name: 'one punch man',
    'button text': ['REJUGAR?', 'REJUGAR?', 'REJUGAR?'],
    'button functions': [restart, restart, restart],
    text: '¡Sin experiencia, armas ni vida extra, decides enfrentar al dragón directamente! El dragón te toma por un necio y comienza a reírse de ti. El poder de tu maestro ModBer comienza a acumularse alrededor de tu puño y lo descargas contra la cabeza del dragón. El puñetazo legendario hace que la cabeza del dragón se desintegre y su cuerpo caiga muerto al suelo. ¡Has vencido al malvado dragón! Los aldeanos no se lo pueden creer. Al final tú, el jóven discípulo del gran guerrero ModBer has dado la talla, demostrando tu valía, valentía y honor. El pueblo entero vitorea tus hazañas y se inician los preparativos para una gran fiesta en tu honor. 🎉',
  },
];

/*------------------------------------------------------------------------------------------------------------*/

/*****************
 *** BOTONES ***
 ****************/
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
instructionsButton.onclick = showInstructions;
borrarLocalStorageButton.onclick = borrarLocalStorage;

/*------------------------------------------------------------------------------------------------------------*/
/***************************************
 *** OBTENER DATOS DEL LOCAL STORAGE ***
 **************************************/
// Cargar logros desde el localStorage al inicio del juego
loadAchievements();
function loadAchievements() {
  const achievements = JSON.parse(localStorage.getItem('achievements')) || {};
  for (const key in achievements) {
    if (achievements.hasOwnProperty(key) && achievements[key]) {
      const logroElement = document.getElementById(key);
      if (logroElement) {
        logroElement.classList.remove('doNotShow'); // Retiramos la clase que evita que se muestre el logro.
        logroElement.classList.add('show'); // Agregamos la clase para mostrar el logro
        logrosDesbloqueados.classList.remove('doNotShow');
        logrosDesbloqueados.classList.add('show');
      }
    }
  }
}
/*****************************************
 *** GUARDAR DATOS EN EL LOCAL STORAGE ***
 ****************************************/
// Desbloquear logros y mostrarlos en la interfaz
function unlockAchievements(logroId) {
  const logroElement = document.getElementById(logroId);
  if (logroElement) {
    logroElement.classList.remove('doNotShow'); // Retiramos la clase que evita que se muestre el logro.
    logroElement.classList.add('show'); // Agregamos la clase para mostrar el logro
  }

  const achievements = JSON.parse(localStorage.getItem('achievements')) || {};
  achievements[logroId] = true;
  localStorage.setItem('achievements', JSON.stringify(achievements));
  logrosDesbloqueados.classList.remove('doNotShow');
  logrosDesbloqueados.classList.add('show');
}

/**************************************
 *** BORRAR DATOS DEL LOCAL STORAGE ***
 *************************************/
function borrarLocalStorage() {
  localStorage.removeItem('achievements');
  logrosDesbloqueados.classList.remove('show');
  logrosDesbloqueados.classList.add('doNotShow');
}
/*------------------------------------------------------------------------------------------------------------*/
if (oro > 500) {
  ifYouAreRich();
}
console.log('oro', oro);
/*------------------------------------------------------------------------------------------------------------*/

/*****************
 *** FUNCIONES ***
 ****************/
function showInstructions() {
  if (instructionsPanel.classList.contains('doNotShow')) {
    // Si la tiene, la remueve y agrega la clase 'show'
    instructionsPanel.classList.remove('doNotShow');
    instructionsPanel.classList.add('show');
  } else {
    // Si no la tiene, la remueve y agrega la clase 'doNotShow'
    instructionsPanel.classList.remove('show');
    instructionsPanel.classList.add('doNotShow');
  }
}

function update(location) {
  monsterStats.style.display = 'none';
  button1.innerText = location['button text'][0];
  button2.innerText = location['button text'][1];
  button3.innerText = location['button text'][2];
  button1.onclick = location['button functions'][0];
  button2.onclick = location['button functions'][1];
  button3.onclick = location['button functions'][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buySalud() {
  if (oro >= 10) {
    oro -= 10;
    salud += 10;
    goldText.innerText = oro;
    healthText.innerText = salud;
  } else {
    text.innerText = 'No tienes suficiente oro para comprar salud.';
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (oro >= 30) {
      oro -= 30;
      currentWeapon++;
      goldText.innerText = oro;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = 'Has comprado un/a ' + newWeapon + '.';
      inventory.push(newWeapon);
      text.innerText += ' En tu inventario tienes: ' + inventory;
      currentWeaponText.innerText = weapons[currentWeapon].name;
      numberOfWeaponsText.innerText = inventory.length;
    } else {
      text.innerText = 'No tienes suficiente oro para comprar nuevas armas.';
    }
  } else {
    text.innerText = 'Has adquirido el arma más poderosa!';
    button2.innerText = 'Vender arma por 15 de oro';
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    oro += 15;
    goldText.innerText = oro;
    let soldWeapon = inventory.shift();
    text.innerText = 'Has vendido un/a ' + soldWeapon + '.';
    text.innerText += ' En tu inventario tienes: ' + inventory;
    currentWeaponText.innerText = weapons[currentWeapon].name;
    numberOfWeaponsText.innerText = inventory.length;
    if (inventory.length == 1 && inventory[0] === 'espada') {
      text.innerText +=
        ' !MILAGRO! Tu espada ha comenzado a brillar y se ha vuelto indestructible siempre y cuando no adquieras ningún arma más.';
      unlockAchievements('logro3'); // Llamamos a la función para desbloquear el logro 3
    }
  } else {
    text.innerText = 'No puedes vender tu única arma!';
  }
}

function ifYouAreRich() {
  unlockAchievements('logro2'); // Llamamos a la función para desbloquear el logro 2
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  // Comprobamos si el jugador tiene 0 puntos de experiencia, ninguna arma y ninguna vida extra
  if (xp === 0 && currentWeapon === 0 && inventory.length === 1) {
    alternativeWinGame(); // Llamamos a una función alternativa a winGame
  } else {
    fighting = 2;
    goFight();
  }
}

function goFight() {
  update(locations[3]);
  monsterSalud = monsters[fighting].salud;
  monsterStats.style.display = 'block';
  monsterName.innerText = monsters[fighting].name;
  monsterSaludText.innerText = monsterSalud;
}

function attack() {
  text.innerText = 'El ' + monsters[fighting].name + ' te ataca.';
  text.innerText += ' Tú le atacas con tu ' + weapons[currentWeapon].name + '.';
  salud -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterSalud -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += ' Has fallado.';
  }
  healthText.innerText = salud;
  monsterSaludText.innerText = monsterSalud;
  if (salud <= 0) {
    lose();
  } else if (monsterSalud <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += ' Tu ' + inventory.pop() + ' se ha roto.';
    currentWeapon--;
    numberOfWeaponsText.innerText = inventory.length;
    currentWeaponText.innerText = weapons[currentWeapon].name;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || salud < 20;
}

function dodge() {
  text.innerText = 'Has esquivado el ataque del ' + monsters[fighting].name;
}

function defeatMonster() {
  oro += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = oro;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
  unlockAchievements('logro1'); // Llamamos a la función para desbloquear el logro 1
}

function restart() {
  xp = 0;
  salud = 100;
  oro = 50;
  currentWeapon = 0;
  inventory = ['palo'];
  goldText.innerText = oro;
  healthText.innerText = salud;
  xpText.innerText = xp;
  goTown();
}

/**********************************
 *** EASTER EGG (ONE PUNCH MAN) ***
 *********************************/
function alternativeWinGame() {
  update(locations[8]);
  unlockAchievements('logro5'); // Llamamos a la función para desbloquear el logro 5
}

/**********************************
 *** EASTER EGG (JUEGO DE AZAR) ***
 *********************************/
function easterEgg() {
  update(locations[7]);
  unlockAchievements('logro4'); // Llamamos a la función para desbloquear el logro 4
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText =
    'Has elegido ' + guess + '. Aquí están los números aleatorios:\n';
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + '\n';
  }
  if (numbers.includes(guess)) {
    text.innerText +=
      '¡Correcto! Has demostrado que eres el elegido y el aldeano te ha dado 20 monedas de oro!';
    oro += 20;
    goldText.innerText = oro;
  } else {
    text.innerText +=
      '¡Incorrecto! El aldeano se ha decepcionado y piensa que están todos perdidos tras depositar sus esperanzas en ti. Te arrea una colleja y pierdes 10 de salud.';
    salud -= 10;
    healthText.innerText = salud;
    if (salud <= 0) {
      lose();
    }
  }
}
