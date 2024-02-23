if (armaRota == 'daga') {
  mostrarPopup('/Medios/armas/daga.jpeg', `Tu ${armaRota} se ha roto.`);
} else if (armaRota == 'martillo') {
  mostrarPopup('/Medios/armas/martillo.jpeg', `Tu ${armaRota} se ha roto.`);
} else if (armaRota == 'espada') {
  mostrarPopup('/Medios/armas/espada.jpeg', `Tu ${armaRota} se ha roto.`);
}

mostrarPopup(
  '/Medios/localizaciones/tendero.jpeg',
  `Has entrado en la tienda.`
);

mostrarPopup('/Medios/localizaciones/cueva.jpeg', `Has entrado en la cueva.`);

mostrarPopup(
  '/Medios/localizaciones/pueblo.jpeg',
  `Estás en la plaza del pueblo.`
);

cambiarSrcDeImagen('Medios/localizaciones/pueblo.jpeg');
cambiarSrcDeImagen('/Medios/localizaciones/cueva.jpeg');
cambiarSrcDeImagen('/Medios/localizaciones/tendero.jpeg');
cambiarSrcDeImagen('/Medios/localizaciones/azaar.jpeg');

cambiarSrcDeImagen('/Medios/personajes/dragon.jpeg');
cambiarSrcDeImagen('/Medios/personajes/jabali.jpeg');
cambiarSrcDeImagen('/Medios/personajes/orco.jpeg');

mostrarPopup(
  '/Medios/estadosylogros/espadamaestra.jpeg',
  `!MILAGRO! Tu espada ha comenzado a brillar y se ha vuelto indestructible. Cuenta la leyenda que se trata de la auténtica Espada Maestra.`
);

cambiarSrcDeImagenArma('/Medios/armas/palo.jpeg');
cambiarSrcDeImagenArma('/Medios/armas/daga.jpeg');
cambiarSrcDeImagenArma('/Medios/armas/martillo.jpeg');
cambiarSrcDeImagenArma('/Medios/armas/espada.jpeg');

currentWeaponText.style.color = 'blue';
