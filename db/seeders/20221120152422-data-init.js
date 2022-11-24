'use strict';
const { ROLE_TABLE } = require("./../models/role.model");
const { GENDER_TABLE } = require("./../models/gender.model");
const { REGION_TABLE } = require("./../models/region.model");
const { CITY_TABLE } = require("./../models/city.model");
const { SPECIES_TABLE } = require("./../models/species.model");
const { BREED_TABLE } = require("./../models/breed.model");

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(ROLE_TABLE, [
      {
        name: "Admin",
      },
      {
        name: "Individual",
      },
      {
        name: "Organization",
      }
    ], {});

    await queryInterface.bulkInsert(GENDER_TABLE, [
      {
        name: "Macho",
      },
      {
        name: "Hembra",
      },
    ], {});

    await queryInterface.bulkInsert(REGION_TABLE, [
      {name:"Región de Arica y Parinacota"},{name:"Región de Tarapacá"},{name:"Región de Antofagasta"},{name:"Región de Atacama"},{name:"Región de Coquimbo"},{name:"Región de Valparaíso"},{name:"Región del Libertador General Bernardo O'Higgins"},{name:"Región del Maule"},{name:"Región de Ñuble"},{name:"Región del Biobío"},{name:"Región de La Araucanía"},{name:"Región de Los Ríos"},{name:"Región de Los Lagos"},{name:"Región de Aysén del G. Carlos Ibáñez del Campo"},{name:"Región de Magallanes y de la Antártica Chilena"},{name:"Región Metropolitana de Santiago"},
    ], {});

    await queryInterface.bulkInsert(CITY_TABLE, [
      {name:"Arica",regionId:1},{name:"Camarones",regionId:1},{name:"General Lagos",regionId:1},
      {name:"Putre",regionId:1},{name:"Alto Hospicio",regionId:2},{name:"Camiña",regionId:2},
      {name:"Colchane",regionId:2},{name:"Huara",regionId:2},{name:"Iquique",regionId:2},
      {name:"Pica",regionId:2},{name:"Pozo Almonte",regionId:2},{name:"Antofagasta",regionId:3},
      {name:"Calama",regionId:3},{name:"María Elena",regionId:3},{name:"Mejillones",regionId:3},{name:"Ollagüe",regionId:3},
      {name:"San Pedro de Atacama",regionId:3},{name:"Sierra Gorda",regionId:3},{name:"Taltal",regionId:3},
      {name:"Tocopilla",regionId:3},{name:"Alto del Carmen",regionId:4},{name:"Caldera",regionId:4},{name:"Chañaral",regionId:4},
      {name:"Copiapó",regionId:4},{name:"Diego de Almagro",regionId:4},{name:"Freirina",regionId:4},
      {name:"Huasco",regionId:4},{name:"Tierra Amarilla",regionId:4},{name:"Vallenar",regionId:4},{name:"Andacollo",regionId:5},
      {name:"Canela",regionId:5},{name:"Combarbalá",regionId:5},{name:"Coquimbo",regionId:5},{name:"Illapel",regionId:5},
      {name:"La Higuera",regionId:5},{name:"La Serena",regionId:5},{name:"Los Vilos",regionId:5},{name:"Monte Patria",regionId:5},
      {name:"Ovalle",regionId:5},{name:"Paihuano",regionId:5},{name:"Punitaqui",regionId:5},{name:"Río Hurtado",regionId:5},
      {name:"Salamanca",regionId:5},{name:"Vicuña",regionId:5},{name:"Algarrobo",regionId:6},{name:"Cabildo",regionId:6},
      {name:"Calera",regionId:6},{name:"Calle Larga",regionId:6},{name:"Cartagena",regionId:6},{name:"Casablanca",regionId:6},{name:"Catemu",regionId:6},
      {name:"Concón",regionId:6},{name:"El Quisco",regionId:6},{name:"El Tabo",regionId:6},{name:"Hijuelas",regionId:6},{name:"Isla de Pascua",regionId:6},
      {name:"Juan Fernández",regionId:6},{name:"La Cruz",regionId:6},{name:"La Ligua",regionId:6},{name:"Limache",regionId:6},{name:"Llaillay",regionId:6},{name:"Los Andes",regionId:6},
      {name:"Nogales",regionId:6},{name:"Olmué",regionId:6},{name:"Panquehue",regionId:6},{name:"Papudo",regionId:6},{name:"Petorca",regionId:6},{name:"Puchuncaví",regionId:6},
      {name:"Putaendo",regionId:6},{name:"Quillota",regionId:6},{name:"Quilpué",regionId:6},{name:"Quintero",regionId:6},
      {name:"Rinconada",regionId:6},{name:"San Antonio",regionId:6},{name:"San Esteban",regionId:6},{name:"San Felipe",regionId:6},{name:"Santa María",regionId:6},{name:"Santo Domingo",regionId:6},{name:"Valparaíso",regionId:6},{name:"Villa Alemana",regionId:6},{name:"Viña del Mar",regionId:6},
      {name:"Zapallar",regionId:6},{name:"Chépica",regionId:7},{name:"Chimbarongo",regionId:7},{name:"Codegua",regionId:7},{name:"Coínco",regionId:7},{name:"Coltauco",regionId:7},{name:"Doñihue",regionId:7},{name:"Graneros",regionId:7},{name:"La Estrella",regionId:7},{name:"Las Cabras",regionId:7},{name:"Litueche",regionId:7},{name:"Lolol",regionId:7},{name:"Machalí",regionId:7},{name:"Malloa",regionId:7},{name:"Marchihue",regionId:7},
      {name:"Mostazal",regionId:7},{name:"Nancagua",regionId:7},{name:"Navidad",regionId:7},{name:"Olivar",regionId:7},{name:"Palmilla",regionId:7},{name:"Paredones",regionId:7},{name:"Peralillo",regionId:7},{name:"Peumo",regionId:7},{name:"Pichidegua",regionId:7},{name:"Pichilemu",regionId:7},{name:"Placilla",regionId:7},{name:"Pumanque",regionId:7},{name:"Quinta de Tilcoco",regionId:7},{name:"Rancagua",regionId:7},{name:"Rengo",regionId:7},{name:"Requínoa",regionId:7},{name:"San Fernando",regionId:7},{name:"Santa Cruz",regionId:7},{name:"San Vicente",regionId:7},{name:"Cauquenes",regionId:8},{name:"Chanco",regionId:8},{name:"Colbún",regionId:8},{name:"Constitución",regionId:8},{name:"Curepto",regionId:8},{name:"Curicó",regionId:8},{name:"Empedrado",regionId:8},{name:"Hualañé",regionId:8},{name:"Licantén",regionId:8},{name:"Linares",regionId:8},{name:"Longaví",regionId:8},{name:"Maule",regionId:8},{name:"Molina",regionId:8},{name:"Parral",regionId:8},
      {name:"Pelarco",regionId:8},{name:"Pelluhue",regionId:8},{name:"Pencahue",regionId:8},{name:"Rauco",regionId:8},{name:"Retiro",regionId:8},{name:"Río Claro",regionId:8},{name:"Romeral",regionId:8},{name:"Sagrada Familia",regionId:8},{name:"San Clemente",regionId:8},{name:"San Javier",regionId:8},{name:"San Rafael",regionId:8},{name:"Talca",regionId:8},{name:"Teno",regionId:8},{name:"Vichuquén",regionId:8},{name:"Villa Alegre",regionId:8},{name:"Yerbas Buenas",regionId:8},{name:"Bulnes",regionId:9},{name:"Chillán",regionId:9},{name:"Chillán Viejo",regionId:9},{name:"Cobquecura",regionId:9},{name:"Coelemu",regionId:9},{name:"Coihueco",regionId:9},{name:"El Carmen",regionId:9},{name:"Ninhue",regionId:9},{name:"Ñiquén",regionId:9},{name:"Pemuco",regionId:9},{name:"Pinto",regionId:9},{name:"Portezuelo",regionId:9},{name:"Quillón",regionId:9},{name:"Quirihue",regionId:9},{name:"Ránquil",regionId:9},{name:"San Carlos",regionId:9},{name:"San Fabián",regionId:9},
      {name:"San Ignacio",regionId:9},{name:"San Nicolás",regionId:9},{name:"Treguaco",regionId:9},{name:"Yungay",regionId:9},{name:"Alto Biobío",regionId:10},{name:"Antuco",regionId:10},{name:"Arauco",regionId:10},{name:"Cabrero",regionId:10},{name:"Cañete",regionId:10},{name:"Chiguayante",regionId:10},{name:"Concepción",regionId:10},{name:"Contulmo",regionId:10},
      {name:"Coronel",regionId:10},{name:"Curanilahue",regionId:10},{name:"Florida",regionId:10},{name:"Hualpén",regionId:10},{name:"Hualqui",regionId:10},{name:"Laja",regionId:10},{name:"Lebu",regionId:10},{name:"Los Alamos",regionId:10},{name:"Los Angeles",regionId:10},{name:"Lota",regionId:10},{name:"Mulchén",regionId:10},{name:"Nacimiento",regionId:10},{name:"Negrete",regionId:10},{name:"Penco",regionId:10},{name:"Quilaco",regionId:10},
      {name:"Quilleco",regionId:10},{name:"San Pedro de la Paz",regionId:10},{name:"San Rosendo",regionId:10},{name:"Santa Bárbara",regionId:10},{name:"Santa Juana",regionId:10},{name:"Talcahuano",regionId:10},{name:"Tirúa",regionId:10},{name:"Tomé",regionId:10},{name:"Tucapel",regionId:10},{name:"Yumbel",regionId:10},{name:"Angol",regionId:11},{name:"Carahue",regionId:11},{name:"Cholchol",regionId:11},{name:"Collipulli",regionId:11},{name:"Cunco",regionId:11},{name:"Curacautín",regionId:11},{name:"Curarrehue",regionId:11},{name:"Ercilla",regionId:11},{name:"Freire",regionId:11},{name:"Galvarino",regionId:11},{name:"Gorbea",regionId:11},{name:"Lautaro",regionId:11},{name:"Loncoche",regionId:11},{name:"Lonquimay",regionId:11},{name:"Los Sauces",regionId:11},{name:"Lumaco",regionId:11},{name:"Melipeuco",regionId:11},{name:"Nueva Imperial",regionId:11},{name:"Padre Las Casas",regionId:11},{name:"Perquenco",regionId:11},{name:"Pitrufquén",regionId:11},{name:"Pucón",regionId:11},
      {name:"Purén",regionId:11},{name:"Renaico",regionId:11},{name:"Saavedra",regionId:11},{name:"Temuco",regionId:11},{name:"Teodoro Schmidt",regionId:11},{name:"Toltén",regionId:11},{name:"Traiguén",regionId:11},{name:"Victoria",regionId:11},{name:"Vilcún",regionId:11},{name:"Villarrica",regionId:11},{name:"Corral",regionId:12},{name:"Futrono",regionId:12},{name:"Lago Ranco",regionId:12},{name:"Lanco",regionId:12},{name:"La Unión",regionId:12},{name:"Los Lagos",regionId:12},{name:"Máfil",regionId:12},{name:"Mariquina",regionId:12},{name:"Paillaco",regionId:12},{name:"Panguipulli",regionId:12},{name:"Río Bueno",regionId:12},{name:"Valdivia",regionId:12},{name:"Ancud",regionId:13},{name:"Calbuco",regionId:13},{name:"Castro",regionId:13},{name:"Chaitén",regionId:13},{name:"Chonchi",regionId:13},{name:"Cochamó",regionId:13},{name:"Curaco de Vélez",regionId:13},{name:"Dalcahue",regionId:13},{name:"Fresia",regionId:13},{name:"Frutillar",regionId:13},{name:"Futaleufú",regionId:13},{name:"Hualaihué",regionId:13},
      {name:"Llanquihue",regionId:13},{name:"Los Muermos",regionId:13},{name:"Maullín",regionId:13},{name:"Osorno",regionId:13},{name:"Palena",regionId:13},{name:"Puerto Montt",regionId:13},{name:"Puerto Octay",regionId:13},{name:"Puerto Varas",regionId:13},{name:"Puqueldón",regionId:13},
      {name:"Purranque",regionId:13},{name:"Puyehue",regionId:13},{name:"Queilén",regionId:13},{name:"Quellón",regionId:13},{name:"Quemchi",regionId:13},{name:"Quinchao",regionId:13},{name:"Río Negro",regionId:13},{name:"San Juan de la Costa",regionId:13},{name:"San Pablo",regionId:13},
      {name:"Aysén",regionId:14},{name:"Chile Chico",regionId:14},{name:"Cisnes",regionId:14},{name:"Cochrane",regionId:14},{name:"Coyhaique",regionId:14},{name:"Guaitecas",regionId:14},{name:"Lago Verde",regionId:14},{name:"O'Higgins",regionId:14},{name:"Río Ibáñez",regionId:14},{name:"Tortel",regionId:14},{name:"Antártica",regionId:15},{name:"Cabo de Hornos",regionId:15},{name:"Laguna Blanca",regionId:15},{name:"Natales",regionId:15},{name:"Porvenir",regionId:15},{name:"Primavera",regionId:15},{name:"Punta Arenas",regionId:15},{name:"Río Verde",regionId:15},{name:"San Gregorio",regionId:15},{name:"Timaukel",regionId:15},{name:"Torres del Paine",regionId:15},{name:"Alhué",regionId:16},{name:"Buin",regionId:16},{name:"Calera de Tango",regionId:16},{name:"Cerrillos",regionId:16},{name:"Cerro Navia",regionId:16},{name:"Colina",regionId:16},{name:"Conchalí",regionId:16},{name:"Curacaví",regionId:16},{name:"El Bosque",regionId:16},{name:"El Monte",regionId:16},{name:"Estación Central",regionId:16},
      {name:"Huechuraba",regionId:16},{name:"Independencia",regionId:16},{name:"Isla de Maipo",regionId:16},{name:"La Cisterna",regionId:16},{name:"La Florida",regionId:16},{name:"La Granja",regionId:16},{name:"Lampa",regionId:16},{name:"La Pintana",regionId:16},{name:"La Reina",regionId:16},{name:"Las Condes",regionId:16},{name:"Lo Barnechea",regionId:16},{name:"Lo Espejo",regionId:16},{name:"Lo Prado",regionId:16},{name:"Macul",regionId:16},{name:"Maipú",regionId:16},{name:"María Pinto",regionId:16},{name:"Melipilla",regionId:16},{name:"Ñuñoa",regionId:16},{name:"Padre Hurtado",regionId:16},{name:"Paine",regionId:16},{name:"Pedro Aguirre Cerda",regionId:16},{name:"Peñaflor",regionId:16},{name:"Peñalolén",regionId:16},{name:"Pirque",regionId:16},{name:"Providencia",regionId:16},{name:"Pudahuel",regionId:16},{name:"Puente Alto",regionId:16},{name:"Quilicura",regionId:16},{name:"Quinta Normal",regionId:16},{name:"Recoleta",regionId:16},{name:"Renca",regionId:16},{name:"San Bernardo",regionId:16},
      {name:"San Joaquín",regionId:16},{name:"San José de Maipo",regionId:16},{name:"San Miguel",regionId:16},{name:"San Pedro",regionId:16},{name:"San Ramón",regionId:16},{name:"Santiago",regionId:16},{name:"Talagante",regionId:16},{name:"Tiltil",regionId:16},{name:"Vitacura",regionId:16},

    ], {});

    await queryInterface.bulkInsert(SPECIES_TABLE, [
      {
      name: "Perro"
      },
      {
      name: "Gato"
      },
      {
      name: "Roedor"
      },
      {
      name: "Ave"
      },
      {
      name: "Reptil"
      },
      {
      name: "Pez"
      },
      {
      name: "Arácnido"
      },
      {
      name: "Mustélido"
      },
      {
      name: "Conejo"
      },

    ], {});

    await queryInterface.bulkInsert(BREED_TABLE, [
      {
        name:"Otro - perro",
        speciesId:1
      },
      {
      name:"Poodle",
      speciesId:1
      },
      {
      name:"Pastor Alemán",
      speciesId:1
      },
      {
      name:"Yorkshire Terrier",
      speciesId:1
      },
      {
      name:"Fox Terrier",
      speciesId:1
      },
      {
      name:"Golden Retriever",
      speciesId:1
      },
      {
      name:"Bulldog",
      speciesId:1
      },
      {
      name:"Border Collie",
      speciesId:1
      },
      {
      name:"Pug",
      speciesId:1
      },
      {
      name:"Schnauzer",
      speciesId:1
      },
      {
      name:"Chihuahua",
      speciesId:1
      },
      {
      name:"Otro - gato",
      speciesId:2
      },
      {
      name:"Persa",
      speciesId:2
      },
      {
      name:"Siamés",
      speciesId:2
      },
      {
      name:"Maine Coon",
      speciesId:2
      },
      {
      name:"Esfinge",
      speciesId:2
      },
      {
      name:"Bengala",
      speciesId:2
      },
      {
      name:"Exotico de Pelo Corto",
      speciesId:2
      },
      {
      name:"British Shorthair",
      speciesId:2
      },
      {
      name:"Otro - roedor",
      speciesId:3
      },
      {
        name:"Hámster",
        speciesId:3
      },
      {
      name:"Degú",
      speciesId:3
      },
      {
      name:"Chinchilla",
      speciesId:3
      },
      {
      name:"Cuy",
      speciesId:3
      },
      {
      name:"Ratón Doméstico",
      speciesId:3
      },
      {
      name:"Otro - ave",
      speciesId:4
      },
      {
      name:"Canario",
      speciesId:4
      },
      {
      name:"Periquito Australiano",
      speciesId:4
      },
      {
      name:"Loro",
      speciesId:4
      },
      {
      name:"Agapornis",
      speciesId:4
      },
      {
      name:"Cacatúa",
      speciesId:4
      },
      {
      name:"Serpiente",
      speciesId:5
      },
      {
      name:"Iguana",
      speciesId:5
      },
      {
      name:"Tortuga Terrestre",
      speciesId:5
      },
      {
      name:"Tortuga de Agua",
      speciesId:5
      },
      {
      name:"Camaleón",
      speciesId:5
      },
      {
      name:"Dragón de Agua Chino",
      speciesId:5
      },
      {
      name:"Otro - pez",
      speciesId:6
      },
      {
      name:"Pez Ángel",
      speciesId:6
      },
      {
      name:"Pez Betta",
      speciesId:6
      },
      {
      name:"Pez Guppy",
      speciesId:6
      },
      {
      name:"Pez Disco",
      speciesId:6
      },
      {
      name:"Otro - arácnido",
      speciesId:7
      },
      {
      name:"Tarántula",
      speciesId:7
      },
      {
      name:"Araña Pollito",
      speciesId:7
      },
      {
      name:"Araña Escupidora",
      speciesId:7
      },
      {
      name:"Araña Hormiga",
      speciesId:7
      },
      {
      name:"Otro - mustélido",
      speciesId:8
      },
      {
      name:"Hurón",
      speciesId:8
      },
      {
      name:"Otro - conejo",
      speciesId:9
      },
      {
      name:"Conejo Enano",
      speciesId:9
      },
      {
      name:"Belier",
      speciesId:9
      },
      {
      name:"Conejo Hotot",
      speciesId:9
      },
      {
      name:"Rex",
      speciesId:9
      },
      {
      name:"Gigante de Flandes",
      speciesId:9
      },

    ], {});
},

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(ROLE_TABLE, {name: {[Op.in]: ["Admin","Individual","Organization"]}}, {}); //con ,null, elimina todo
    await queryInterface.bulkDelete(GENDER_TABLE, null, {});
    await queryInterface.bulkDelete(REGION_TABLE, null, {});
    await queryInterface.bulkDelete(CITY_TABLE, null, {});
    await queryInterface.bulkDelete(SPECIES_TABLE, null, {});
    await queryInterface.bulkDelete(BREED_TABLE, null, {});
  }
};
