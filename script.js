/***************
 *** GALLERY ***
 ***************/
document
  .getElementById('logo-cazador-de-dragones')
  .addEventListener('click', function () {
    let palabraSecretaUsuario = prompt(
      'Introduce la palabra secreta correcta para poder acceder a la galería de imágenes:'
    );

    if (palabraSecretaUsuario === 'Fotinchis') {
      window.location.href = 'gallery.html';
    } else {
      location.reload();
    }
  });

/*------------------------------------------ */

/********************************************
 *** FUNCIONALIDAD PARA EL AÑO DEL FOOTER ***
 ********************************************/

// Obtenemos el año actual (para la función de mostrarTodosCumpleanos)
const hoy = new Date();
const año = hoy.getFullYear();
// Cargamos el año en el footer de las páginas html
const añoFooter = document.getElementsByClassName('ano-footer')[0];
añoFooter.innerHTML = año;

/*------------------------------------------ */

verificarLogrosDesbloqueados();

/*****************
 *** VARIABLES ***
 ****************/

let xp = 0;
let salud = 100;
let oro = 9;
let currentWeapon = 0;
let fighting;
let monsterSalud;
let inventory = ['palo'];
let vanquishedMonsters = 0;

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
currentWeaponText.style.color = 'black';
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
    text: 'Estás en la plaza del pueblo.\n\n Ves un letrero de madera que señala varias direcciones. En él puedes leer: "Tienda", "Cuevas" y "Salida del Pueblo".\n\n ¿A dónde quieres ir?',
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
    text: 'Has entrado en la cueva pero... ¡está plagada de monstruos!\n\n ¿Decides pelear o huyes de nuevo al pueblo?',
  },
  {
    name: 'lucha',
    'button text': ['Atacar', 'Intentar Parry', 'Huir'],
    'button functions': [playerAttack, playerDodge, goTown],
    text: 'Te enfrentas a un monstruo.',
  },
  {
    name: 'matar monstruo',
    'button text': [
      'Ir a la plaza del pueblo',
      'Seguir luchando',
      'Ir a la plaza del pueblo',
    ],
    'button functions': [goTown, goCave, easterEgg],
    text: 'El monstruo grita "¡Arg!" al morir.\n\n Ganas puntos de experiencia y encuentras oro.',
  },
  {
    name: 'perder',
    'button text': ['REJUGAR?', 'REJUGAR?', 'REJUGAR?'],
    'button functions': [restart, restart, restart],
    text: 'Has muerto. ☠️ \n\n La última esperanza para vencer al malvado dragón se ha esfumado con tu deceso y los aldeanos han perdido la esperanza.\n\n Con el paso del tiempo algunos mueren lentamente de inanición, mientras que otros deciden acabar con su vida de formas diversas.\n\n Finalmente el pueblo es devorado por las llamas del dragón y este se marcha en busca de un nuevo pueblo que consumir.',
  },
  {
    name: 'ganar',
    'button text': ['REJUGAR?', 'REJUGAR?', 'REJUGAR?'],
    'button functions': [restart, restart, restart],
    text: '¡Has vencido al malvado dragón!\n\n Los aldeanos no se lo pueden creer. Al final tú, el jóven discípulo del gran guerrero ModBer has dado la talla, demostrando tu valía, valentía y honor.\n\n El pueblo entero vitorea tus hazañas y se inician los preparativos para una gran fiesta en tu honor. 🎉',
  },
  {
    name: 'easter egg',
    'button text': ['2', '8', 'Ir a la plaza del pueblo?'],
    'button functions': [pickTwo, pickEight, goTown],
    text: '¡ATENCIÓN!\n Desde un callejón oscuro, uno de los aldeanos te hace un gesto para que te acerques y te propone un juego.\n\n Él va a elegir 10 números del 0 al 10 que serán los 10 números ganadores.\n Te dará a elegir entre dos números y uno de estos dos números será uno de los 10 ganadores y el otro no.\n Tendrás que elegir uno de esos dos números.\n\n Si aciertas te dará 20 monedas de oro. Si pierdes te dará un puñetazo y perderás 10 puntos de salud.\n Puedes jugar hasta hacerte rico, hasta morir por los golpes o hasta que decidas marcharte.',
  },
  {
    name: 'one punch man',
    'button text': ['REJUGAR?', 'REJUGAR?', 'REJUGAR?'],
    'button functions': [restart, restart, restart],
    text: '¡Sin experiencia, ni armas, ni vida extra, decides enfrentar al dragón directamente!\n\n El dragón te toma por un necio y comienza a reírse de ti.\n\n El poder de tu maestro ModBer comienza a acumularse alrededor de tu puño y lo descargas contra la cabeza del dragón.\n\n El puñetazo legendario hace que la cabeza del dragón se desintegre y su cuerpo caiga muerto al suelo.\n\n ¡Has vencido al malvado dragón!\n\n Los aldeanos no se lo pueden creer. Al final tú, el jóven discípulo del gran guerrero ModBer has dado la talla, demostrando tu valía, valentía y honor.\n\n El pueblo entero vitorea tus hazañas y se inician los preparativos para una gran fiesta en tu honor. 🎉',
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

/*****************
 *** FUNCIONES ***
 ****************/

function mostrarPopup(imagenUrl, texto) {
  var popup = document.getElementById('custom-popup');
  var imagen = document.getElementById('popup-image');
  var textoElement = document.getElementById('popup-text');

  // Asignar valores
  imagen.src = imagenUrl;
  textoElement.textContent = texto;

  // Mostrar el popup
  popup.style.display = 'block';
}

function cerrarPopup() {
  var popup = document.getElementById('custom-popup');
  popup.style.display = 'none';
}

function cambiarSrcDeImagen(nuevaUrl) {
  // Obtener el elemento img por su id
  var imagen = document.getElementById('fotoLocalizacionEnTexto');

  // Verificar si el elemento existe
  if (imagen) {
    // Cambiar la URL del atributo src
    imagen.src = nuevaUrl;
  } else {
    console.error('El elemento img no se encontró con el ID proporcionado.');
  }
}

function cambiarSrcDeImagenArma(nuevaUr2) {
  // Obtener el elemento img por su id
  var imagenArma = document.getElementById('fotoArmaActual');

  // Verificar si el elemento existe
  if (imagenArma) {
    // Cambiar la URL del atributo src
    imagenArma.src = nuevaUr2;
  } else {
    console.error('El elemento img no se encontró con el ID proporcionado.');
  }
}

/*------------------------------------------------------------------------------------------------------------*/

function showInstructions() {
  if (instructionsPanel.classList.contains('doNotShow')) {
    // Si la tiene, la remueve y agrega la clase 'show'
    instructionsPanel.classList.remove('doNotShow');
    instructionsButton.classList.remove('notButtonActive');
    instructionsPanel.classList.add('show');
    instructionsButton.classList.add('buttonActive');
  } else {
    // Si no la tiene, la remueve y agrega la clase 'doNotShow'
    instructionsPanel.classList.remove('show');
    instructionsButton.classList.remove('buttonActive');
    instructionsPanel.classList.add('doNotShow');
    instructionsButton.classList.add('notButtonActive');
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
  cambiarSrcDeImagen('Medios/localizaciones/pueblo.jpeg');
  update(locations[0]);
}

function goStore() {
  cambiarSrcDeImagen('/Medios/localizaciones/tendero.jpeg');
  update(locations[1]);
}

function goCave() {
  cambiarSrcDeImagen('/Medios/localizaciones/cueva.jpeg');
  update(locations[2]);
}

function buySalud() {
  if (oro >= 10) {
    oro -= 10;
    salud += 10;
    goldText.innerText = oro;
    healthText.innerText = salud;
    if (salud >= 500 && salud < 1000) {
      ifYouAreHealthy();
    } else if (salud >= 1000) {
      ifYouAreSoHealthy();
    }
  } else {
    text.innerText = 'No tienes suficiente oro para comprar salud.';
  }
}

function actualizarFotoDeArma() {
  if (weapons[currentWeapon].name == 'palo') {
    cambiarSrcDeImagenArma('Medios/armas/palo.jpeg');
  } else if (weapons[currentWeapon].name == 'daga') {
    cambiarSrcDeImagenArma('Medios/armas/daga.jpeg');
  } else if (weapons[currentWeapon].name == 'martillo') {
    cambiarSrcDeImagenArma('Medios/armas/martillo.jpeg');
  } else if (weapons[currentWeapon].name == 'espada') {
    cambiarSrcDeImagenArma('Medios/armas/espada.jpeg');
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
      console.log('Arma actual', weapons[currentWeapon].name);
      actualizarFotoDeArma();
    } else {
      text.innerText = 'No tienes suficiente oro para comprar nuevas armas.';
    }
  } else {
    text.innerText =
      'No puedes comprar más armas.\n\n Ya has adquirido el arma más poderosa del tendero!\n\n Pero puedes vender tus armas menos poderosas para ganar oro.';
    button2.innerText = 'Vender arma por 15 de oro';
    button2.onclick = sellWeapon;
  }
  console.log('Número de armas', inventory.length);
}

function sellWeapon() {
  if (inventory.length > 1) {
    oro += 15;
    goldText.innerText = oro;
    if (oro >= 500 && oro < 1000) {
      ifYouAreRich();
    } else if (oro >= 1000) {
      ifYourAreSoRich();
    }
    let soldWeapon = inventory.shift();
    text.innerText = 'Has vendido un/a ' + soldWeapon + '.';
    text.innerText += ' En tu inventario tienes: ' + inventory;
    currentWeaponText.innerText = weapons[currentWeapon].name;
    numberOfWeaponsText.innerText = inventory.length;
    if (inventory.length == 1 && inventory[0] === 'espada') {
      mostrarPopup(
        '/Medios/estadosylogros/espadamaestra.jpeg',
        `LOGRO DESBLOQUEADO\n\n Tu espada ha comenzado a brillar y se ha vuelto indestructible.\n\n Cuenta la leyenda que se trata de la auténtica Espada Maestra.\n\n (Revisa tu lista de logros en la parte inferior del juego).`
      );
      text.innerText +=
        ' !MILAGRO!\n\n Tu espada ha comenzado a brillar y se ha vuelto indestructible.\n\n Cuenta la leyenda que se trata de la auténtica Espada Maestra.';
      currentWeaponText.innerText = 'Master Sword';
      currentWeaponText.style.color = 'blue';

      unlockAchievements('logro3'); // Llamamos a la función para desbloquear el logro 3
      const siTienesLogroEspadaMaestra = document.getElementById('logro3');

      // Ponemos la foto de la espada maestra
      if (
        weapons[currentWeapon].name == 'espada' &&
        siTienesLogroEspadaMaestra.classList.contains('show') &&
        inventory.length == '1'
      ) {
        cambiarSrcDeImagenArma('Medios/estadosylogros/espadamaestra.jpeg');
      }
      verificarLogrosDesbloqueados();
    }
  } else {
    text.innerText = '¡No puedes vender tu única arma!';
  }
  console.log('Número de armas', inventory.length);
}

function ifYouAreRich() {
  const siTienesLogroDinero = document.getElementById('logro2');
  // Ponemos la foto del logro
  if (siTienesLogroDinero.classList.contains('show')) {
    return;
  } else {
    mostrarPopup(
      '/Medios/estadosylogros/dinero.jpeg',
      `LOGRO DESBLOQUEADO\n\n Has conseguido más de 500 monedas de oro.\n\n (Revisa tu lista de logros en la parte inferior del juego).`
    );
    unlockAchievements('logro2'); // Llamamos a la función para desbloquear el logro 2
    verificarLogrosDesbloqueados();
  }
}

function ifYourAreSoRich() {
  const siTienesLogroDinero2 = document.getElementById('logro6');
  // Ponemos la foto del logro
  if (siTienesLogroDinero2.classList.contains('show')) {
    return;
  } else {
    mostrarPopup(
      '/Medios/estadosylogros/dinero2.jpeg',
      `LOGRO DESBLOQUEADO\n\n Has conseguido más de 1000 monedas de oro.\n\n (Revisa tu lista de logros en la parte inferior del juego).`
    );
    unlockAchievements('logro6'); // Llamamos a la función para desbloquear el logro 6
    verificarLogrosDesbloqueados();
  }
}

function ifYouAreHealthy() {
  const siTienesLogroVida = document.getElementById('logro7');
  // Ponemos la foto del logro
  if (siTienesLogroVida.classList.contains('show')) {
    return;
  } else {
    mostrarPopup(
      '/Medios/estadosylogros/vida.jpeg',
      `LOGRO DESBLOQUEADO\n\n Has conseguido más de 500 puntos de salud.\n\n (Revisa tu lista de logros en la parte inferior del juego).`
    );
    unlockAchievements('logro7'); // Llamamos a la función para desbloquear el logro 7
    verificarLogrosDesbloqueados();
  }
}

function ifYouAreSoHealthy() {
  const siTienesLogroVida2 = document.getElementById('logro8');
  // Ponemos la foto del logro
  if (siTienesLogroVida2.classList.contains('show')) {
    return;
  } else {
    mostrarPopup(
      '/Medios/estadosylogros/vida2.jpeg',
      `LOGRO DESBLOQUEADO\n\n Has conseguido más de 1000 puntos de salud.\n\n (Revisa tu lista de logros en la parte inferior del juego).`
    );
    unlockAchievements('logro8'); // Llamamos a la función para desbloquear el logro 8
    verificarLogrosDesbloqueados();
  }
}

function ifYouAreExperienced() {
  const siTienesLogroxp = document.getElementById('logro9');
  // Ponemos la foto del logro
  if (siTienesLogroxp.classList.contains('show')) {
    return;
  } else {
    mostrarPopup(
      '/Medios/estadosylogros/xp.jpeg',
      `LOGRO DESBLOQUEADO\n\n Has conseguido más de 50 puntos de xp.\n\n (Revisa tu lista de logros en la parte inferior del juego).`
    );
    unlockAchievements('logro9'); // Llamamos a la función para desbloquear el logro 9
    verificarLogrosDesbloqueados();
  }
}

function ifYouAreAKiller() {
  const siTienesLogroKills = document.getElementById('logro10');
  // Ponemos la foto del logro
  if (siTienesLogroKills.classList.contains('show')) {
    return;
  } else {
    mostrarPopup(
      '/Medios/estadosylogros/killer.jpeg',
      `LOGRO DESBLOQUEADO\n\n Has conseguido vencer a más de 20 enemigos.\n\n (Revisa tu lista de logros en la parte inferior del juego).`
    );
    unlockAchievements('logro10'); // Llamamos a la función para desbloquear el logro 10
    verificarLogrosDesbloqueados();
  }
}

function fightSlime() {
  cambiarSrcDeImagen('/Medios/personajes/jabali.jpeg');
  fighting = 0;
  goFight();
}

function fightBeast() {
  cambiarSrcDeImagen('/Medios/personajes/orco.jpeg');
  fighting = 1;
  goFight();
}

function fightDragon() {
  // Comprobamos si el jugador tiene 0 puntos de experiencia, ninguna arma y ninguna vida extra
  if (xp === 0 && currentWeapon === 0 && inventory.length === 1) {
    alternativeWinGame(); // Llamamos a una función alternativa a winGame
  } else {
    cambiarSrcDeImagen('/Medios/personajes/dragon.jpeg');
    fighting = 2;
    goFight();
  }
}

function goFight() {
  monsterSalud = monsters[fighting].salud;
  monsterName.innerText = monsters[fighting].name;
  monsterSaludText.innerText = monsterSalud;
  monsterStats.style.display = 'block';

  text.innerText = `¡Te enfrentas a un ${monsters[fighting].name}!\n\n`;

  monsterAttack();
}

function monsterAttack() {
  text.innerText += `El ${monsters[fighting].name} te ataca.\n\n`;

  // Mostrar opciones al jugador
  text.innerText += '¿Qué quieres hacer?\n';
  button1.innerText = 'Atacar';
  button1.onclick = playerAttack;
  button2.innerText = 'Esquivar';
  button2.onclick = playerDodge;
  button3.innerText = 'Huir';
  button3.onclick = goTown;
}

function recalcularSaludMonstruos() {
  // Factor de aumento de salud basado en la experiencia del jugador
  const factorAumentoSalud = xp * 0.1; // Por ejemplo, aumenta un 10% por cada 10 de experiencia

  // Recorremos el arreglo de monstruos y actualizamos su salud
  monsters.forEach((monster) => {
    // Calculamos la nueva salud del monstruo basada en su nivel y el factor de aumento
    const nuevaSalud = Math.floor(
      monster.salud + monster.level * factorAumentoSalud
    );

    // Actualizamos la salud del monstruo en el arreglo original
    monster.salud = nuevaSalud;
  });
}

function reiniciarSaludMonstruos() {
  monsters[0].salud = 15;
  monsters[1].salud = 60;
  monsters[2].salud = 300;
}

function playerAttack() {
  // Calcular daño del monstruo
  const monsterHit = getMonsterAttackValue(monsters[fighting].level);
  // Reducir la salud del jugador
  salud -= monsterHit;
  healthText.innerText = salud;
  // Mostrar resultado del ataque del monstruo
  text.innerText = `¡El ${monsters[fighting].name} te ha infligido ${monsterHit} puntos de daño!\n\n`;
  if (salud <= 0) {
    lose();
  } else {
    // Mostrar resultado del ataque del jugador
    text.innerText += `Atacas al ${monsters[fighting].name} con tu ${weapons[currentWeapon].name}.`;

    if (isMonsterHit()) {
      // Calcular el daño del jugador
      const thePlayerDamageText =
        weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
      const thePlayerDamage = (monsterSalud -= thePlayerDamageText);
      monsterSaludText.innerText = monsterSalud;

      text.innerText += ` ¡Has infligido ${thePlayerDamageText} puntos de daño!\n\n`;

      if (Math.random() <= 0.1 && inventory.length !== 1) {
        const armaRota = inventory[inventory.length - 1];
        if (armaRota == 'daga') {
          mostrarPopup(
            '/Medios/armas/daga-rota.jpg',
            `Tu ${armaRota} se ha roto.`
          );
          cambiarSrcDeImagenArma('Medios/armas/palo.jpeg');
        } else if (armaRota == 'martillo') {
          mostrarPopup(
            '/Medios/armas/martillo-roto.jpg',
            `Tu ${armaRota} se ha roto.`
          );
          cambiarSrcDeImagenArma('Medios/armas/daga.jpeg');
        } else if (armaRota == 'espada') {
          mostrarPopup(
            '/Medios/armas/espada-rota.jpg',
            `Tu ${armaRota} se ha roto.`
          );
          cambiarSrcDeImagenArma('Medios/armas/martillo.jpeg');
        }
        text.innerText += ' Tu ' + inventory.pop() + ' se ha roto.';
        currentWeapon--;
        numberOfWeaponsText.innerText = inventory.length;
        currentWeaponText.innerText = weapons[currentWeapon].name;
      }
    } else {
      text.innerText += ' Pero has fallado.\n\n';
    }

    // Verificar si el monstruo ha sido derrotado
    if (monsterSalud <= 0) {
      fighting === 2 ? winGame() : defeatMonster();
    } else {
      // Turno del monstruo después del ataque del jugador
      monsterAttack();
    }
  }
}

function playerDodge() {
  // Determinar si el jugador esquiva con éxito
  const dodgeSuccess = Math.random() <= 0.5 + xp / 100;

  if (dodgeSuccess) {
    text.innerText = 'Haces un parry al ' + monsters[fighting].name + '.\n\n';
    // Mostrar resultado del ataque del jugador
    text.innerText += `Atacas al ${monsters[fighting].name} con tu ${weapons[currentWeapon].name}.`;

    if (isMonsterHit()) {
      // Calcular el daño del jugador
      const thePlayerDamageText =
        weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
      const thePlayerDamage = (monsterSalud -= thePlayerDamageText);
      monsterSaludText.innerText = monsterSalud;

      text.innerText += ` ¡Has infligido ${thePlayerDamageText} puntos de daño con tu parry!\n\n`;

      if (Math.random() <= 0.1 && inventory.length !== 1) {
        const armaRota = inventory[inventory.length - 1];
        if (armaRota == 'daga') {
          mostrarPopup(
            '/Medios/armas/daga-rota.jpg',
            `Tu ${armaRota} se ha roto.`
          );
          cambiarSrcDeImagenArma('Medios/armas/palo.jpeg');
        } else if (armaRota == 'martillo') {
          mostrarPopup(
            '/Medios/armas/martillo-roto.jpg',
            `Tu ${armaRota} se ha roto.`
          );
          cambiarSrcDeImagenArma('Medios/armas/daga.jpeg');
        } else if (armaRota == 'espada') {
          mostrarPopup(
            '/Medios/armas/espada-rota.jpg',
            `Tu ${armaRota} se ha roto.`
          );
          cambiarSrcDeImagenArma('Medios/armas/martillo.jpeg');
        }
        text.innerText += ' Tu ' + inventory.pop() + ' se ha roto.';
        currentWeapon--;
        numberOfWeaponsText.innerText = inventory.length;
        currentWeaponText.innerText = weapons[currentWeapon].name;
      }
    } else {
      text.innerText += ' Pero has fallado tu contraataque.\n\n';
    }
  } else {
    text.innerText = `No consigues evitar el ataque del ${monsters[fighting].name}.`;
    // Calcular daño del monstruo
    const monsterHit = getMonsterAttackValue(monsters[fighting].level);
    // Reducir la salud del jugador
    salud -= monsterHit;
    healthText.innerText = salud;
    // Mostrar resultado del ataque del monstruo
    text.innerText += `¡El ${monsters[fighting].name} te ha infligido ${monsterHit} puntos de daño!\n\n`;
  }

  if (salud <= 0) {
    lose();
  } else {
    // Verificar si el monstruo ha sido derrotado
    if (monsterSalud <= 0) {
      fighting === 2 ? winGame() : defeatMonster();
    } else {
      // Turno del monstruo después del ataque del jugador
      monsterAttack();
    }
  }
}

/*------------------------------------------ */

/*El daño que te hace el monstruo el resultado de multiplicar el nivel del enemigo * 5 y restarle el resultado de multiplicar un número aleatorio entre 0 y 1 por tu xp. Es decir, cuanto más nivel tenga más te quita pero cuanto más nivel tengas tú más reduces el daño que te hace. */
function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log('Daño de atque del monstruo', hit);
  return hit > 0 ? hit : 0;
}

/*Tienes un 80% de probabilidades de hace run hit al atacar. Haces hit fijo si la salud del monstro es <20 */
function isMonsterHit() {
  return Math.random() > 0.2 || salud < 20;
}

function defeatMonster() {
  oro += Math.floor(monsters[fighting].level * 6.7);
  if (oro >= 500 && oro < 1000) {
    ifYouAreRich();
  } else if (oro >= 1000) {
    ifYourAreSoRich();
  }
  xp += monsters[fighting].level;
  if (xp >= 50) {
    ifYouAreExperienced();
  }
  vanquishedMonsters++;
  console.log('Enemigos derrotados', vanquishedMonsters);
  if (vanquishedMonsters >= 20) {
    ifYouAreAKiller();
  }
  goldText.innerText = oro;
  xpText.innerText = xp;
  recalcularSaludMonstruos();
  update(locations[4]);
}

function lose() {
  cambiarSrcDeImagen('/Medios/estadosylogros/derrota.jpeg');
  update(locations[5]);
}

function winGame() {
  mostrarPopup(
    '/Medios/estadosylogros/vencerdragon.jpeg',
    `LOGRO DESBLOQUEADO\n\n Enhorabuena, derrotaste al dragón.\n\n (Revisa tu lista de logros en la parte inferior del juego).`
  );
  update(locations[6]);
  unlockAchievements('logro1'); // Llamamos a la función para desbloquear el logro 1

  verificarLogrosDesbloqueados();
}

function restart() {
  xp = 0;
  salud = 100;
  oro = 9;
  currentWeapon = 0;
  inventory = ['palo'];
  vanquishedMonsters = 0;
  goldText.innerText = oro;
  healthText.innerText = salud;
  xpText.innerText = xp;

  currentWeaponText.innerText = weapons[currentWeapon].name;
  numberOfWeaponsText.innerText = inventory.length;

  reiniciarSaludMonstruos();
  cambiarSrcDeImagenArma('Medios/armas/palo.jpeg');
  goTown();
}

/**********************************
 *** EASTER EGG (ONE PUNCH MAN) ***
 *********************************/
function alternativeWinGame() {
  mostrarPopup(
    '/Medios/estadosylogros/onepunchman.jpeg',
    `LOGRO DESBLOQUEADO\n\n Enhorabuena, te has bajado al dragón con un buen puñetazo al estilo Saitama. ¡Eres un auténtico bestia!\n\n (Revisa tu lista de logros en la parte inferior del juego).`
  );
  cambiarSrcDeImagen('/Medios/estadosylogros/onepunchman.jpeg');
  update(locations[8]);
  unlockAchievements('logro5'); // Llamamos a la función para desbloquear el logro 5
  verificarLogrosDesbloqueados();
}

/**********************************
 *** EASTER EGG (JUEGO DE AZAR) ***
 *********************************/
function easterEgg() {
  mostrarPopup(
    '/Medios/localizaciones/azar.jpeg',
    `LOGRO DESBLOQUEADO\n\n Has encontrado el Easter Egg JUEGO DE AZAR.\n\n (Revisa tu lista de logros en la parte inferior del juego).`
  );
  cambiarSrcDeImagen('/Medios/localizaciones/juego-de-azar.jpeg');
  update(locations[7]);
  unlockAchievements('logro4'); // Llamamos a la función para desbloquear el logro 4

  verificarLogrosDesbloqueados();
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
      '¡Correcto!\n Has demostrado que eres el elegido y el aldeano te ha dado 20 monedas de oro!';
    oro += 20;
    goldText.innerText = oro;
    if (oro >= 500 && oro < 1000) {
      ifYouAreRich();
    } else if (oro >= 1000) {
      ifYourAreSoRich();
    }
  } else {
    text.innerText +=
      '¡Incorrecto!\n El aldeano se ha decepcionado y piensa que están todos perdidos tras depositar sus esperanzas en ti. Te arrea una colleja y pierdes 10 puntos de salud.';
    salud -= 10;
    healthText.innerText = salud;
    if (salud <= 0) {
      lose();
    }
  }
}

/********************************************
 *** COMRPOBAR SI TIENES TODOS LOS LOGROS ***
 *******************************************/
function verificarLogrosDesbloqueados() {
  // Obtén todos los elementos <li> que representan los logros
  const logros = document.querySelectorAll('.ul-de-logros li');

  // Verifica si todos los logros tienen la clase "show"
  const todosDesbloqueados = Array.from(logros).every((logro) =>
    logro.classList.contains('show')
  );

  // Retorna el resultado
  if (!window.location.href.includes('wingame.html')) {
    if (todosDesbloqueados) {
      console.log('¡Todos los logros están desbloqueados!');
      //Borramos los logros
      localStorage.removeItem('achievements');
      logrosDesbloqueados.classList.remove('show');
      logrosDesbloqueados.classList.add('doNotShow');
      // Redirigimos a la página winGame
      window.location.href = './wingame.html';
    } else {
      console.log(
        'Aún no has desbloqueado todos los logros, pero sigue así ;).'
      );
    }
  }
}
