-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-06-2021 a las 04:06:40
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `athenas_ecommerce_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `idAdmin` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `contrasena` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`idAdmin`, `email`, `contrasena`) VALUES
(1, 'dcatalanmarchese@gmail.com', '$2y$10$sIKl47vavY1gZe/uQgkWv.u4XmKIr9Jr7U14hU2WDFeVeTOayDyJG'),
(2, 'ignavaldecace98@gmail.com', '$2y$10$77.ryPQS8zAnpLEMmb0FiuYozdXYc53h8qiPgmcxPKwPtRk6aRsxy'),
(3, 'sandra.cano@pucv.cl', '$2y$10$qOaD4sQ1qFZVBigiDCvAwOR.vnHMSk8suM.T2o048tSMsunpw/7jS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombreCategoria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombreCategoria`) VALUES
(1, 'football'),
(2, 'basketball'),
(3, 'rugby'),
(4, 'handball'),
(5, 'ciclismo'),
(6, 'boxeo'),
(7, 'tenis');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `idComentario` int(11) NOT NULL,
  `comentario` varchar(250) NOT NULL,
  `valoracion` float DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentario`
--

INSERT INTO `comentario` (`idComentario`, `comentario`, `valoracion`, `idProducto`, `idUsuario`) VALUES
(70, 'asdasdasd MALARDO', 3, 11, 9),
(71, 'que buena polera', 4, 18, 6),
(72, 'MALARDO XD', 3, 32, 9),
(73, 'asdasdasd', 5, 44, 9),
(74, 'Buen balón por el precio, no es la jabulani ', 4, 1, 6),
(75, 'Medias perfectas para jugar al balónpie', 5, 6, 6),
(76, 'Capitán como el cr7 SIUUUUU', 5, 37, 6),
(77, 'me caí de cabeza y no me paso nadcbafgasfsafsakapf', 5, 42, 6),
(78, 'Como diria el chino rios, nada es imposible wn niuna wea', 5, 58, 6),
(79, '¿Con quien aguantarias mas de 1 minuto? ¿Lana Rhoades o Mike Tyson ?', 4, 54, 6),
(80, 'muy buena calidad, cada vez que me enojo programando le pego al saco. He tenido 3 de estos', 4, 51, 6),
(81, 'Pésimos, ahorren 10 lucas y se compran los pro!', 2, 50, 6),
(82, 'muy buenos conos!', 5, 31, 6),
(83, 'Messi lo mas grande cuantas copas tene chilenito?  porfavor saquenme de argenzuela ', 5, 9, 6),
(84, 'Esta muy bueno el producto, entretenido para jugar con los niños.', 5, 14, 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `nombre` varchar(120) NOT NULL,
  `apellido` varchar(120) NOT NULL,
  `rut` varchar(20) NOT NULL,
  `direccion` varchar(20) NOT NULL,
  `region` varchar(20) NOT NULL,
  `comuna` varchar(20) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`idPedido`, `fecha`, `nombre`, `apellido`, `rut`, `direccion`, `region`, `comuna`, `idUsuario`) VALUES
(20, '2021-06-20 23:09:22', 'Diego', 'Catalán', '20.185.019', 'Manuel Rodríguez 384', 'Region de Valparaíso', 'Viña del Mar', 6),
(21, '2021-06-20 23:12:41', 'Diego', 'Catalán', '20.185.019', 'Manuel Rodríguez 384', 'Region de Valparaíso', 'Viña del Mar', 6),
(22, '2021-06-20 23:14:04', 'Ignacio', 'Valdebenito', '19.941.645', 'Siete sur 4056', 'Region de Valparaíso', 'Viña del Mar', 9),
(23, '2021-06-20 23:17:34', 'Diego', 'Catalán', '20.185.019', 'Manuel Rodríguez 384', 'Region de Valparaíso', 'Viña del Mar', 6),
(24, '2021-06-20 23:49:16', 'Ignacio', 'Valdebenito', '19.941.645', 'Siete sur 4056', 'Region de Valparaíso', 'Viña del Mar', 9),
(25, '2021-06-23 20:10:38', 'Ignacio', 'Valdebenito', '19.941.645', 'Siete sur 4056', 'Region de Valparaíso', 'Viña del Mar', 9),
(26, '2021-06-24 17:31:46', 'Manuel', 'Encina', '19.993.641-3', 'Calle Alameda', 'Región Metropolitana', 'Santiago', 9),
(27, '2021-06-25 13:00:52', 'Ignacio', 'Valdebenito', '19.941.645', 'Siete sur 4056', 'Region de Valparaíso', 'Valparaíso', 9),
(28, '2021-06-27 21:58:17', 'Ignacio', 'Valdebenito', '19.941.645', 'Siete sur 4056', 'Region de Valparaíso', 'Viña del Mar', 9),
(29, '2021-06-27 22:06:10', 'Ignacio', 'Valdebenito', '19.941.645', 'Siete sur 4056', 'Region de Valparaíso', 'Viña del Mar', 9),
(30, '2021-06-28 13:40:25', 'Ignacio', 'Valdebenito', '19.941.645', 'Siete sur 4056', 'Region de Valparaíso', 'Viña del Mar', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `nombreProducto` varchar(120) DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `precio` int(10) DEFAULT NULL,
  `stock` int(8) DEFAULT NULL,
  `valoracion` float NOT NULL,
  `idCategoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `nombreProducto`, `descripcion`, `precio`, `stock`, `valoracion`, `idCategoria`) VALUES
(1, 'MINI BALÓN FÚTBOL NEW BALANCE GEODESA TRAINING N°1 AMARILLO/NARANJO', 'Capa de tacto suave de espuma EVA de 2,5 mm. Configuración de 6 paneles.Cosido a máquina.', 7990, 15, 4, 1),
(2, 'CANILLERAS FÚTBOL NEW BALANCE FLEX STRAP GUARD AMARILLA', 'Suave forro interior sintético.Canilleras de perfil delgado.Composición: 95% polipropileno, 5% TPR', 5590, 20, 0, 1),
(3, 'POLERA FÚTBOL MUJER NIKE CHILE LOCAL 2020/2021 ROJO', '100% poliéster reciclado. Ajuste estándar para una sensación relajada y cómoda. Material Nike Breathe brinda una construcción altamente respirable.', 49990, 43, 0, 1),
(4, 'ZAPATOS FÚTBOL HOMBRE NIKE PHANTOM GT CLUB DYNAMIC FIT MG BLANCO', 'Cuello Dynamic Fit. Cordones descentrados. El cuero sintético duradero y fácil de limpiar.', 49990, 35, 0, 1),
(5, 'GUANTES DE ARQUERO NIÑO SPOGA FÉRULA 2019 BLANCO', 'Palma de látex sintético. Zona frontal de PU con mesh para favorecer respirabilidad del guante. Cinta wrap elástica de velcro.', 14990, 21, 0, 1),
(6, 'CALCETINES FÚTBOL HOMBRE NEW BALANCE ROJO', 'Los calcetines de fútbol New Balance se han diseñado para mantener los pies secos y cómodos durante el partido porque cuentan con refuerzo en el talón que ofrece una mayor durabilidad además del corte específico de pie izquierdo y derecho para proporcionar un mejor ajuste.', 5990, 75, 5, 1),
(7, 'ARCO DE FÚTBOL SKLZ KICKSTER BLANCO 2020', 'Utiliza la tecnología de marco Tension-Tite ™. Ligero y portátil para una configuración rápida y sencilla. Diseño de marco actualizado con nexos de esquina reforzados con metal para una mayor durabilidad.', 79990, 8, 0, 1),
(8, 'SHORT FÚTBOL HOMBRE ADIDAS TAN TRAINING NEGRO', 'Bolsillos frontales con cierre. Cintura elástica con cordón ajustable. Logo TAN en los costados de las calzas. Tejido Climalite absorbente.', 34990, 14, 0, 1),
(9, 'GYMSACK NIKE FC BARCELONA STADIUM AMARILLO/AZUL', 'Compartimiento principal con cierre con cordón ajustable. El divisor interior mantiene separado el equipo. Dimensiones: 43 cm de alto x 33 cm de ancho.', 14990, 0, 5, 1),
(10, 'BALÓN FUTBOLITO MATCH MITRE N 4 AMARILLO\r\n', 'Talla: N° 4. Material principal: Cuero. Bajo bote.', 22990, 17, 0, 1),
(11, 'BALÓN BÁSQUETBOL NIKE JORDAN ULTIMATE 8P N°7 NEGRO/DORADO', 'Diseño para interior y exterior.\r\nCanales profundos: precisa alineación y control de la mano. Tamaño: N°7', 34990, 27, 3, 2),
(12, 'CAMISETA TANK TOP BÁSQUETBOL HOMBRE NBA LOS ANGELES LAKERS LEBRON JAMES AMARILLO', 'Producto con licencia oficial de NBA. Camiseta para juego Lebron James con nombre y número.', 34990, 27, 2.66667, 2),
(13, 'ZAPATILLAS BÁSQUETBOL HOMBRE NIKE KD TREY 5 VIII NEGRO/VERDE', 'Soporte para el tobillo. Amortiguación de espuma suave. Entresuela de doble densidad para estabilidad.', 69990, 12, 0, 2),
(14, 'TABLERO BÁSQUETBOL SPALDING NBA LOGOMAN JR PORTABLE HOOP SYSTEM NEGRO', 'Llanta estándar. Tablero de 81,3 cm. Altura máxima del tablero: 1.98 mts.', 179990, 2, 5, 2),
(15, 'RODILLERA REHBAND RX NEGRA/MORADA\r\n', 'Ofrece estabilidad para una sensación mental y física de seguridad. La compresión ayuda a prevenir lesiones y aumenta la memoria muscular. Entrega calor para proteger las articulaciones y tejidos blandos de lesiones. ', 11990, 15, 0, 2),
(16, 'SHORT BÁSQUETBOL HOMBRE ADIDAS DOBLE FAZ CRAZY EXPLOSIVE AZUL', 'Cuenta con cintura elástica con cordón de ajuste. Dobladillo con aberturas laterales para máxima libertad de movimiento. Corte clásico.', 19990, 7, 0, 2),
(17, 'BOMBÍN BÁSQUETBOL NIKE JORDAN ESSENTIAL BALL PUMP NEGRO/ROJO', 'Bombín eficiente de doble acción: llenado rápido. Manguera de extensión desmontable. Incluye 1 aguja', 14990, 12, 0, 2),
(18, 'POLERA BÁSQUETBOL HOMBRE NBA CHICAGO BULLS NEGRA/ROJO', 'Producto con licencia oficial de NBA.\r\nComposición: 160 grs CVC (Algón/Polyester) +150 grs Polyester 100% Tejido Mesh.', 17990, 20, 4, 2),
(19, 'BALÓN DE BÁSQUEBOL NIKE DOMINATE 8P N°7 NEGRO/AMARILLO\r\n', 'Tamaño N° 7. Exterior de goma duradero. Composición: 100% Caucho.', 17990, 10, 0, 2),
(20, 'SHORT BÁSQUETBOL HOMBRE NBA BROOKLYN NETS NEGRO', 'Producto con licencia oficial de NBA.\r\nComposición: 100% POLYESTER HONEY MESH (DRY-FIT).', 19990, 18, 0, 2),
(21, 'PROTECTOR BUCAL ADULTO LISO AZUL SAFEJAWS', 'Cuenta con tecnología Fluid que permite mantener una estructura rígida y fuerte. La tecnología Jaw Secure proporciona una base perfilada para la estabilidad de la mandíbula. La característica Remodel Tech garantiza el ajuste perfecto.', 9990, 6, 4.4, 3),
(22, 'SHORT RUGBY HOMBRE CANTERBURY ADVANTAGE BLANCO', 'Bolsillo interno. 100% poliéster que absorbe la humedad. Cámara de goma mantiene la forma y la presión del aire.', 24990, 5, 4, 3),
(23, 'ZAPATOS RUGBY HOMBRE ADIDAS MALICE AMARILLO/CALIPSO', 'Exterior de material sintético ligero para una mayor estabilidad, comodidad y un ajuste inigualable. Tecnología NON STOP GRIP (NSG), una delgada capa de puntos en relieve aplicados al exterior. Sistema de amarre asimétrico para una mayor área de contacto con el balón.', 59990, 13, 0, 3),
(24, 'CALCETINES RUGBY HOMBRE BLANCO CANTERBURY', 'Calcetines aptos para todo calzado de rugby. Cuenta con banda elástica de mantenimiento. Compuesto 100% de poliamida.', 7990, 5, 0, 3),
(25, 'CASCO RUGBY HOMBRE CANTERBURY CLUB PLUS NEGRO', 'IRB aprobado. Forma de diamante , ultraligero, espuma de célula cerrada flexible y transpirable. Tratamiento antimicrobiano y barbilla de polialgodón con gestión de la humedad.', 49990, 3, 0, 3),
(26, 'POLERA RUGBY HOMBRE MITRE HOMBRERA LEAGUE NEGRO/AZUL', 'Acolchado en pecho y hombros. Relleno flexible. Tela de secado rápido.', 29490, 45, 0, 3),
(27, 'ZAPATOS RUGBY HOMBRE ADIDAS KAKARI ELITE SG NEGRO', 'Parte superior sintética muy ligera y resistente al desgaste. Tacos intercambiable 6x2. Configuración de tacos ideal para control en superficies naturales.', 44990, 13, 0, 3),
(28, 'POLERA RUGBY HOMBRE MITRE HOMBRERA LEAGUE NEGRO/ROJO', 'Acolchado en pecho y hombros. Relleno flexible. Tela de secado rápido.', 29490, 18, 0, 3),
(29, 'PROTECTOR BUCAL NIÑO LISO BLANCO SAFEJAWS', 'Cuenta con tecnología Fluid que permite mantener una estructura rígida y fuerte. La tecnología Jaw Secure proporciona una base perfilada para la estabilidad de la mandíbula. La característica Remodel Tech garantiza el ajuste perfecto.', 9990, 0, 0, 3),
(30, 'CASCO RUGBY MITRE PREMIER AZUL', 'Aberturas para las orejas. El grosor de su acolchado y sus dimensiones cumplen con las exigencias del Comité Internacional de Rugby. Probado por jugadores profesionales para una protección y rendimientos excelentes.', 26990, 3, 0, 3),
(31, 'PACK DE 40 CONOS ESSENTIAL 4 COLORES (AMARILLO, NARANJA, GRIS, AZUL)', 'Para delimitar una zona de juego en cualquier tipo de terreno, hemos desarrollado estos conos con forma de exclusiva de \"flecha\".', 14000, 5, 5, 4),
(32, 'BONBIN DOBLE ACCION AMARILLO NEGRO', 'Este bombín de doble acción, simple y compacto, ha sido desarrollado para que los jugadores y los entrenadores puedan inflar todo tipo de balones.', 6000, 0, 3, 4),
(33, 'BALÓN DE HANDBALL INICIACIÓN H100 AZUL Y AMARILLO', 'Este balón de handball se ha diseñado para que los niños o las niñas se diviertan aprendiendo fácilmente a controlar y comprender los rebotes, es ideal para la iniciación sobre el terreno.', 5000, 12, 0, 4),
(34, 'CAMISETA KEEPDRY 500 ADULTO MANGA CORTA AZUL', 'La Keepdry 500 está destinada a jugadores que gestionan sus esfuerzos y su intensidad de forma prolongada, con un primer grosor que evacúa muy bien el sudor para regular la temperatura corporal.', 12000, 2, 0, 4),
(35, 'PANTALÓN CORTO TÉRMICO TRANSPIRABLE NIÑOS KEEPDRY NEGRO', 'Este pantalón corto térmico conserva el cuerpo seco durante la práctica. Con efecto segunda piel para ofrecer mayor comodidad.', 8000, 7, 0, 4),
(36, 'BALÓN DE HANDBALL NIÑOS JET GRIP T00 AZUL OSCURO ROJO', 'Este balón de handball es muy resistente a la abrasión gracias a su revestimiento de caucho.', 6000, 0, 0, 4),
(37, 'CINTA DE CAPITÁN REVERSIBLE ROJA VIOLETA', 'Un equipo necesita un líder, por ello este brazalete ha sido concebido para identificar al capitán del equipo.\r\nEsta cinta de capitán se adapta a todos los brazos gracias a la pieza autoadherente de ajuste.', 4000, 28, 5, 4),
(38, 'BALÓN DE HANDBALL H500 T3 NEGRO / ROJO', 'Nuestros ingenieros jugadores de handball han ideado un balón adherente y resistente para entrenamientos y competiciones, para jugadores en perfeccionamiento.', 19000, 7, 0, 4),
(39, 'SALTAR AL COMIENZO DE LA GALERÍA DE IMÁGENES TRICOTA CICLISMO HOMBRE ALTITUDE AZUL', 'Material principal de tejido suave y transpirable que absorbe la humedad. Tres bolsillos abiertos traseros que te permiten acceder convenientemente a lo que necesites mientras pedaleas.\r\nEl corte Semi-ajustado se ciñe al cuerpo de forma aerodinámica para proporcionarte un mejor rendimiento', 29990, 0, 0, 5),
(40, 'BICICLETA NIÑO HILAND AX200 ARO 20 ROJA', 'Bicicleta de niño Aro 20”. Suspensión delantera Horquilla Rígida. Neumáticos 20 x 2.125.', 119900, 1, 0, 5),
(41, 'GUANTES CICLISMO BONTRAGER VELOCIS SOFTSHELL AMARILLO', 'Tejido Softshell resistente al viento y al agua para proteger de las inclemencias del tiempo. Material Thinsulate de 200 g que atrapa el calor y mantiene las manos secas y abrigadas. El tejido conductor de las yemas de los dedos es compatible con las pantallas táctiles.', 79990, 2, 0, 5),
(42, 'CASCO DE BICICLETA DE RUTA BONTRAGER XXX WAVECEL GRIS', 'Tecnología avanzada de casco WaveCel. Sistema de ajuste Boa® para asegurar y ajustar fácilmente el casco con una sola mano. Almohadilla NoSweat adicional con canal de silicona para mantener el sudor fuera de los ojos.', 249990, 5, 5, 5),
(43, 'CASCO MTB BONTRAGER RALLY WAVECEL AMARILLO', 'Tecnología avanzada de casco WaveCel.\r\nBOA® Fit System te permite asegurar y ajustar fácilmente el ajuste del casco con una mano. Almohadillas para casco lavables, suaves, cómodas y que absorben la humedad.', 149990, 10, 0, 5),
(44, 'BICICLETA MTB HILAND PRO XT290 NARANJA', 'Cuadro Aluminio 6061. Transmisión LTWOO 24 velocidades (3x8). Frenos Disco Mecánico.', 329900, 3, 5, 5),
(45, 'BICICLETA NIÑA HILAND PUSH-BIKE AX120 ARO 12 BLANCA', 'Bicicleta de aprendizaje niño aro 12.\r\nSuspensión delantera Horquilla Rígida.\r\nNeumáticos 12x1.125', 54990, 15, 0, 5),
(46, 'CARAMAGIOLA CICLISMO TREK VODA VERTICAL 769 ML TRANSPARENTE', 'Libre de BPA, BPS y ftalatos. Boquilla termoplástica suave con tapa PopTop fácil de abrir y cerrar. Diseño con sujeción segura que facilita la colocación y extracción del portacaramagiola.', 11990, 7, 0, 5),
(47, 'PORTABICICLETAS HOLLYWOOD RACKS 3 AMARRAS EXPRESS NEGRO', 'Capacidad: 3 Bicicletas. Se adapta a la mayoría de los vehículos. Cuñas de goma suave que ayudan a proteger tu bicicleta y automóvil.', 99990, 9, 0, 5),
(48, 'GUANTES CICLISMO MUJER ALTITUDE SHORT FINGER ROSADO/NEGRO', 'Palma con impresión de silicona para un mejor agarre. Guante corto con gel en las palmas para un menor desgaste al pedalear. Cierre de silicona/velcro y pestaña en los dedos para quitarlos fácilmente.', 14990, 11, 0, 5),
(49, 'BICICLETA MTB TREK MARLIN 4 DISCO MECÁNICO ROSADA 2019', 'Cuadro de aluminio adaptado, ligero como los de cross country y robusto como los de montaña. Suspensión delantera SR Suntour M-3030, coil spring, 75mm recorrido. Frenos Tektro M280 de disco mecánico. *Marco recto para todas las tallas.', 429900, 3, 0, 5),
(50, 'GUANTES FITNESS UNISEX EVERLAST BOX SPARK TRN 16OZ NEGRO', 'Material de cuero sintético. Acolchado de muñeca reforzado EverShield. Tecnología EverCool ayuda a que tus manos se mantengan frescas.', 39990, 8, 2, 6),
(51, 'SACO BOXEO EVERLAST NEVATEAR NEGRO/ROJO', 'Peso: 34 Kg. Material: Cuero sintético.\r\nDimensiones: 120 x 33 x 33 Cms.', 64990, 12, 4, 6),
(52, 'GUANTES FOCO BOXEO EVERLAST PRECISION MANTIS AMARILLO/NEGRO', 'Forro antimicrobiano. Material: Cuero sintético. Dimensiones: 25 x 12 x 20 Cms.', 17990, 2, 0, 6),
(53, 'VENDA BOX EVERLAST 120\" ROSADA', 'Mezcla de poliéster / nylon que proporcionan comodidad transpirable y seguridad durante el entrenamiento.\r\nTamaño compacto de 2 \"x 120\".\r\nCuenta con una correa para el pulgar y un cierre de velcro que brindan un ajuste seguro. Incluye: 2 Vendas.', 6990, 22, 0, 6),
(54, 'GUANTES DE BOX PRO STYLE ELITE TRAINING ROJOS EVERLAST', 'Proporciona transpirabilidad y comodidad. Mejor agarre y ajuste anatómico curvado. Construcción de piel sintética.', 44990, 6, 4, 6),
(55, 'GUANTILLA DE BOX MMA PRO STYLE NEGRA EVERLAST', 'Palma de tela respirable para mayor confort. El revestimiento anti-bacteriano mantiene la frescura. La correa completa en la muñeca permite un ajuste adaptable', 29990, 1, 0, 6),
(56, 'SACO ZIVA POWER CORE BAG 10K', 'Tela grado industrial. Correas de nylon\r\nFácil de limpiar.', 79900, 13, 0, 6),
(57, 'RAQUETA TENIS HEAD IG CHALLENGE LITE S30 PURPURA', 'Patrón de encordado: 16/19. Tamaño de cabeza: 690 cm² / 107 in². Tamaño de grip: 0-5.', 89990, 14, 0, 7),
(58, 'RAQUETA TENIS HEAD GRAPHENE 360 RADICAL PWR S30 BICOLOR', 'Patrón de encordado: 16/19, 14/19. Tamaño de cabeza: 710 cm² / 110 in².\r\nTamaño de grip: 1-5.', 169990, 9, 5, 7),
(59, 'BOLSO ENTRENAMIENTO HEAD DJOKOVIC DUFFLE BAG NEGRO', 'Incluye un compartimento para calzado y varios bolsillos pequeños para accesorios. Dimensiones: 55 x 28 x 28\r\nVolumen: 41', 39990, 6, 0, 7),
(60, 'SET CUERDA TENIS HEAD LYNX 17G GRIS OSCURO', 'Largo: 12 m. Indicador: 1.25 mm / 17 g.\r\nCuerda de monofilamento.', 11990, 7, 0, 7),
(61, 'ZAPATILLAS TENIS HOMBRE ASICS GEL-RESOLUTION 8 CLAY AZUL MARINO.', 'Superficie: Arcilla. Diseñada para garantizar una sensación de sujeción en transiciones rápidas. Tecnología DYNAWALL™ proporciona una mejor estabilidad en la parte media del pie.\r\nCapellada FLEXION FIT™ aporta una sujeción adaptable a las características de cada pie.', 99990, 5, 0, 7),
(62, 'POLERA TENIS NIÑO HEAD MADLEY T-SHIRT B BICOLOR', '100% polyester. Ajuste regular. UPF 50+.', 17990, 5, 0, 7),
(63, 'JOCKEY TENIS UNISEX HEAD GRAVITY MULTICOLOR', '100% Polyester. Malla en la nuca. Cinta para absorción del sudor.', 15990, 0, 0, 7),
(64, 'FALDA TENIS MUJER HEAD EASY COURT BLANCO', 'Pantalón interior fijo. 100% polyester interlock. Cintura con interior elástico.', 24990, 13, 0, 7),
(65, 'SHORT TENIS HOMBRE HEAD PERFORMANCE CELESTE', 'Construcción elástica en 4 direcciones y la pretina flexible prometen libertad de movimiento sin restricciones y un gran ajuste. Comodidad transpirable gracias a las inserciones de malla. Sensación seca a través de cómodos bolsillos con una toalla especial.', 36990, 8, 0, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productopedido`
--

CREATE TABLE `productopedido` (
  `idProductoPedido` int(11) NOT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `idPedido` int(11) DEFAULT NULL,
  `cantidadProductos` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productopedido`
--

INSERT INTO `productopedido` (`idProductoPedido`, `idProducto`, `idPedido`, `cantidadProductos`) VALUES
(6, 11, 20, 1),
(7, 15, 21, 1),
(8, 1, 21, 1),
(9, 11, 22, 1),
(10, 2, 22, 1),
(12, 21, 23, 1),
(13, 11, 24, 1),
(14, 2, 25, 1),
(15, 57, 26, 1),
(16, 41, 27, 2),
(18, 11, 28, 1),
(19, 11, 29, 1),
(20, 21, 30, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombres` varchar(120) NOT NULL,
  `apellidos` varchar(120) NOT NULL,
  `rut` varchar(10) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `region` varchar(50) NOT NULL,
  `comuna` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `contrasena` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombres`, `apellidos`, `rut`, `direccion`, `region`, `comuna`, `email`, `contrasena`) VALUES
(6, 'Diego', 'Catalán', '20185019-3', 'Manuel Rodríguez 384', 'Region de Valparaíso', 'Viña del Mar', 'dcatalanmarchese@gmail.com', '$2a$10$/da8rB6nl7Ua6woE0OSBOep0XOkjdAybABqYtqffFCZmjnuPH1bIa'),
(7, 'pepito', 'perez', '20185003-6', 'mi casa', 'Region de Tarapacá', 'Camiña', 'pepito@gmail.com', '$2a$10$GyrZ2bgKljvvOZbOfNwiiOvX2ToUS.v3qhIRZ.y6pkOCMq4HQj7Oi'),
(9, 'Ignacio', 'Valdebenito', '19941645-3', 'Siete sur 4056', 'Region de Valparaíso', 'Viña del Mar', 'ignavaldecace98@gmail.com', '$2a$10$49gQYV5wKNEzNTXt.WBjMuLaoZzRrQLk0CzXiHf0vGQF2p/J25xIK'),
(21, 'Alexis Alberto', 'Sanchez Sanchez', '17124362-9', 'Pozo grande 777', 'Region de Tarapacá', 'Pozo Almonte', 'thepowerofnaxox@gmail.com', '$2a$10$f7wC0iUnvMAKPYMEdVfnFe9p3yziBnQeVGHZJvOveuWUWTdEriMQ6');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`idComentario`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `productopedido`
--
ALTER TABLE `productopedido`
  ADD PRIMARY KEY (`idProductoPedido`),
  ADD KEY `idPedido` (`idPedido`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `idComentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `productopedido`
--
ALTER TABLE `productopedido`
  MODIFY `idProductoPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`);

--
-- Filtros para la tabla `productopedido`
--
ALTER TABLE `productopedido`
  ADD CONSTRAINT `productopedido_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`),
  ADD CONSTRAINT `productopedido_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
