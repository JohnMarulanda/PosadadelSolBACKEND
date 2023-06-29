
-- Creación de la tabla users
CREATE TABLE users (
  id VARCHAR(10) PRIMARY KEY,
  nombres VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
	contrasena VARCHAR(50) NOT NULL,
);


-- Creación de la tabla Gerente
CREATE TABLE Gerente (
  dni VARCHAR(10) PRIMARY KEY,
  nombres VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

-- Creación de la tabla Empleado
CREATE TABLE Empleado (
  dni VARCHAR(10) PRIMARY KEY,
  nombres VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  puesto VARCHAR(50) NOT NULL
);

-- Creación de la tabla Servicio
CREATE TABLE Servicio (
  servicio_id SERIAL PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL
);

-- Creación de la tabla Habitacion
CREATE TABLE Habitacion (
  habitacion_id SERIAL PRIMARY KEY,
  numero VARCHAR(10) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  capacidad INTEGER NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  servicios_basicos VARCHAR(200),
  piso_asignado VARCHAR(10),
  fecha_dispo DATE,
  descripcion VARCHAR(200)
);

-- Creación de la tabla Plan
CREATE TABLE Plan (
  plan_id SERIAL PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL
);

-- Creación de la tabla Reserva
CREATE TABLE Reserva (
  reserva_id SERIAL PRIMARY KEY,
  id INTEGER REFERENCES users(id),
  habitacion_id INTEGER REFERENCES Habitacion(habitacion_id),
  plan_id INTEGER REFERENCES Plan(plan_id),
  servicio_id INTEGER REFERENCES Servicio(servicio_id),
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  estado VARCHAR(50) NOT NULL
);

-- Creación de la tabla Factura
CREATE TABLE Factura (
  factura_id SERIAL PRIMARY KEY,
  reserva_id INTEGER REFERENCES Reserva(reserva_id),
  fecha_emision DATE NOT NULL,
  total DECIMAL(10, 2) NOT NULL
);

-- Creación de la tabla Reserva_Servicio
CREATE TABLE Reserva_Servicio (
  reserva_id INTEGER REFERENCES Reserva(reserva_id),
  servicio_id INTEGER REFERENCES Servicio(servicio_id),
  PRIMARY KEY (reserva_id, servicio_id)
);

-- Creación de la tabla Reserva_Habitacion
CREATE TABLE Reserva_Habitacion (
  reserva_id INTEGER REFERENCES Reserva(reserva_id),
  habitacion_id INTEGER REFERENCES Habitacion(habitacion_id),
  PRIMARY KEY (reserva_id, habitacion_id)
);

--Insertar datos:

-- Insertar el primer gerente
INSERT INTO Gerente (dni, nombres, apellidos, email) 
VALUES ('1234567890', 'Juan', 'Pérez', 'juanperez@example.com');

-- Insertar el segundo gerente
INSERT INTO Gerente (dni, nombres, apellidos, email) 
VALUES ('0987654321', 'María', 'López', 'marialopez@example.com');


-- Insertar el primer empleado
INSERT INTO Empleado (dni, nombres, apellidos, email, puesto) 
VALUES ('1111111111', 'Carlos', 'Gómez', 'carlosgomez@example.com', 'chef');

-- Insertar el segundo empleado
INSERT INTO Empleado (dni, nombres, apellidos, email, puesto) 
VALUES ('2222222222', 'Laura', 'Hernández', 'laurahernandez@example.com', 'recepcionista');

-- Insertar el tercer empleado
INSERT INTO Empleado (dni, nombres, apellidos, email, puesto) 
VALUES ('3333333333', 'Pedro', 'López', 'pedrolopez@example.com', 'aseador');

-- Insertar el cuarto empleado
INSERT INTO Empleado (dni, nombres, apellidos, email, puesto) 
VALUES ('4444444444', 'Ana', 'Martínez', 'anamartinez@example.com', 'administrador');

-- Insertar servicios
INSERT INTO Servicio (tipo, descripcion, precio)
VALUES 
    ('transporte', 'Servicio de transporte para traslados hasta el hotel, dentro y fuera de la ciudad', 50000),
    ('desayuno', 'Desayuno completo con una variedad de opciones y bebidas', 30000),
    ('almuerzo', 'Almuerzo con menú del día que incluye plato principal, entrada y postre', 40000),
    ('cena', 'Cena gourmet con opciones de alta cocina', 50000),
    ('lavandería', 'Servicio de lavandería con lavado, secado y planchado de prendas', 60000),
    ('cuarto', 'Servicio de acondicionamiento, comida al cuarto y limpieza del cuarto durante la estadía', 50000);

INSERT INTO Plan (tipo, descripcion, precio)
VALUES ('Relax Total', 'Disfruta de un completo descanso y relajación en nuestro resort.', 50000.00);

INSERT INTO Plan (tipo, descripcion, precio)
VALUES ('Aventura', 'Vive emocionantes experiencias llenas de adrenalina y diversión.', 50000.00);

INSERT INTO Plan (tipo, descripcion, precio)
VALUES ('Romance en el Paraíso', 'Celebra el amor y la pasión en un entorno paradisíaco.', 50000.00);

INSERT INTO Plan (tipo, descripcion, precio)
VALUES ('Escapada Cultural', 'Sumérgete en la riqueza cultural de nuestra región y descubre lugares históricos.', 50000.00);

-- Creación de habitaciones sencillas
INSERT INTO Habitacion (numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion)
VALUES ('101', 'Sencilla', 1, 100000, 'Wifi, TV', '1', '2023-06-28', 'Habitación individual con servicios básicos');

INSERT INTO Habitacion (numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion)
VALUES ('102', 'Sencilla', 1, 100000, 'Wifi, TV', '1', '2023-06-28', 'Habitación individual con servicios básicos');

-- Creación de habitaciones doble
INSERT INTO Habitacion (numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion)
VALUES ('201', 'Doble', 2, 200000, 'Wifi, TV, Minibar', '2', '2023-06-28', 'Habitación para dos personas con servicios básicos');

INSERT INTO Habitacion (numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion)
VALUES ('202', 'Doble', 2, 200000, 'Wifi, TV, Minibar', '2', '2023-06-28', 'Habitación para dos personas con servicios básicos');

-- Creación de habitaciones triples
INSERT INTO Habitacion (numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion)
VALUES ('301', 'Triple', 3, 300000, 'Wifi, TV, Minibar', '3', '2023-06-28', 'Habitación para tres personas con servicios básicos');

INSERT INTO Habitacion (numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion)
VALUES ('302', 'Triple', 3, 300000, 'Wifi, TV, Minibar', '3', '2023-06-28', 'Habitación para tres personas con servicios básicos');

-- Creación de habitaciones empresariales
INSERT INTO Habitacion (numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion)
VALUES ('401', 'Empresarial', 1, 400000, 'Wifi, TV, Escritorio', '4', '2023-06-28', 'Habitación empresarial con servicios básicos y escritorio');

INSERT INTO Habitacion (numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion)
VALUES ('402', 'Empresarial', 1, 400000, 'Wifi, TV, Escritorio', '4', '2023-06-28', 'Habitación empresarial con servicios básicos y escritorio');

-- Creación de habitaciones penthouse
INSERT INTO Habitacion (numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion)
VALUES ('501', 'Penthouse', 2, 500000, 'Wifi, TV, Jacuzzi, Terraza', '5', '2023-06-28', 'Penthouse con servicios de lujo, jacuzzi y terraza');

INSERT INTO Habitacion (numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion)
VALUES ('502', 'Penthouse', 2, 500000, 'Wifi, TV, Jacuzzi, Terraza', '5', '2023-06-28', 'Penthouse con servicios de lujo, jacuzzi y terraza');
