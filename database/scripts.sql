CREATE TABLE driver (
    id_driver SERIAL PRIMARY KEY,
    name_driver VARCHAR(255) NOT NULL,
    description_driver TEXT NOT NULL,
    vehicle_driver VARCHAR(255) NOT NULL,
    rate_driver FLOAT NOT NULL,
    rating_driver FLOAT NOT NULL CHECK (rating_driver BETWEEN 0 AND 5),
    comment_driver TEXT NOT NULL,
    km_min_driver FLOAT NOT NULL
);

INSERT INTO driver (id_driver, name_driver, description_driver, vehicle_driver, rate_driver, rating_driver, comment_driver, km_min_driver)
VALUES
    (1, 'Homer Simpson', 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 'Plymouth Valiant 1973 rosa e enferrujado', 2.5, 2, 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.', 1),
    (2, 'Dominic Toretto', 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada', 'Dodge Charger R/T 1970 modificado', 5, 4, 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!', 5),
    (3, 'James Bond', 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 'Aston Martin DB5 clássico', 10, 5, 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.', 10);

CREATE TABLE ride (
    id_ride SERIAL PRIMARY KEY,
    customer_id VARCHAR(255) NOT NULL,
    date_ride TIMESTAMP NOT NULL,
    origin_ride TEXT NOT NULL,
    destination_ride TEXT NOT NULL,
    distance_ride FLOAT NOT NULL,
    duration_ride VARCHAR(255) NOT NULL,
    id_driver INT NOT NULL,
    value_ride FLOAT NOT NULL,
    CONSTRAINT fk_driver FOREIGN KEY (id_driver) REFERENCES driver (id_driver)
);

