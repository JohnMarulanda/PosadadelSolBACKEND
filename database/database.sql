CREATE DATABASE firstapi;

CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    firstName VARCHAR(40),
    lastName VARCHAR(40),
    email TEXT
);

INSERT INTO users (firstName, lastName, email) VALUES 
    ('John', 'Marulanda', 'John@gmail.com'),
    ('Diego', 'Marulanda', 'ryan@gmail.com');

CREATE TABLE habitaciones (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(255),
  precio NUMERIC(10, 2),
  pisoAsig INTEGER,
  tipo_Hab VARCHAR(50)
);

INSERT INTO habitaciones (descripcion, precio, pisoAsig, tipo_Hab)
VALUES 
    ('Habitación Sencilla, 1 Cama normal, 1 Baño, 1 Televisor', 100000, 1, 'Sencilla'),
    ('Habitación Doble, 2 Camas normales, 2 Baños', 200000, 2, 'Doble'),
    ('Habitación Triple, 3 Camas normales, 2 Baños', 300000, 3,  'Triple'),
    ('Habitación Penthouse, 1 Cama Queen, 2 Baños', 400000, 4,  'Penthouse'),
    ('Habitación Empresarial, 2 Camas Queen, 2 Baños,', 500000, 5, 'Empresarial');

-- Utilizando generate_series junto con una consulta INSERT INTO, 
-- podemos generar múltiples filas para insertar en una tabla, en este caso, las habitaciones.

-- Insertar 6 habitaciones Sencillas
INSERT INTO habitaciones (descripcion, precio, pisoAsig, tipo_Hab)
SELECT 'Habitación Sencilla, 1 Cama normal, 1 Baño, 1 Televisor', 100000, 1, 'Sencilla'
FROM generate_series(1, 6);

-- Insertar 6 habitaciones Dobles
INSERT INTO habitaciones (descripcion, precio, pisoAsig, tipo_Hab)
SELECT 'Habitación Doble, 2 Camas normales, 2 Baños', 200000, 2, 'Doble'
FROM generate_series(1, 6);

-- Insertar 6 habitaciones Triples
INSERT INTO habitaciones (descripcion, precio, pisoAsig, tipo_Hab)
SELECT 'Habitación Triple, 3 Camas normales, 2 Baños', 300000, 3,  'Triple'
FROM generate_series(1, 6);

-- Insertar 3 habitaciones Penthouse
INSERT INTO habitaciones (descripcion, precio, pisoAsig, tipo_Hab)
SELECT 'Habitación Penthouse, 1 Cama Queen, 2 Baños', 400000, 4,  'Penthouse'
FROM generate_series(1, 3);

-- Insertar 3 habitaciones Empresariales
INSERT INTO habitaciones (descripcion, precio, pisoAsig, tipo_Hab)
SELECT  'Habitación Empresarial, 2 Camas Queen, 2 Baños,', 500000, 5, 'Empresarial'
FROM generate_series(1, 3);



CREATE TABLE servicios (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(255),
  precio NUMERIC(10, 2),
  tipo_serv VARCHAR(50)
);

INSERT INTO servicios (tipo_serv, descripcion, precio)
VALUES 
    ('transporte', 'Servicio de transporte para traslados hasta el hotel, dentro y fuera de la ciudad', 50000),
    ('desayuno', 'Desayuno completo con una variedad de opciones y bebidas', 30000),
    ('almuerzo', 'Almuerzo con menú del día que incluye plato principal, entrada y postre', 40000),
    ('cena', 'Cena gourmet con opciones de alta cocina', 50000),
    ('lavandería', 'Servicio de lavandería con lavado, secado y planchado de prendas', 60000),
    ('cuarto', 'Servicio de acondicionamiento, comida al cuarto y limpieza del cuarto durante la estadía', 50000);



    CREATE TABLE contacto (
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    numero_telefono VARCHAR(20) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    mensaje TEXT NOT NULL
);

INSERT INTO contacto (nombres, apellidos, correo_electronico, numero_telefono, tipo, mensaje)
VALUES ('Juan', 'Pérez', 'juan@example.com', '123456789', 'sugerencias', 'Hola, tengo una sugerencia para mejorar el hotel.');


