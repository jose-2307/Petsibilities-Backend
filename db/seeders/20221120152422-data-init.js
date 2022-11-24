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
      {name:"Arica",region_id:1},{name:"Camarones",region_id:1},{name:"General Lagos",region_id:1},
      {name:"Putre",region_id:1},{name:"Alto Hospicio",region_id:2},{name:"Camiña",region_id:2},
      {name:"Colchane",region_id:2},{name:"Huara",region_id:2},{name:"Iquique",region_id:2},
      {name:"Pica",region_id:2},{name:"Pozo Almonte",region_id:2},{name:"Antofagasta",region_id:3},
      {name:"Calama",region_id:3},{name:"María Elena",region_id:3},{name:"Mejillones",region_id:3},{name:"Ollagüe",region_id:3},
      {name:"San Pedro de Atacama",region_id:3},{name:"Sierra Gorda",region_id:3},{name:"Taltal",region_id:3},
      {name:"Tocopilla",region_id:3},{name:"Alto del Carmen",region_id:4},{name:"Caldera",region_id:4},{name:"Chañaral",region_id:4},
      {name:"Copiapó",region_id:4},{name:"Diego de Almagro",region_id:4},{name:"Freirina",region_id:4},
      {name:"Huasco",region_id:4},{name:"Tierra Amarilla",region_id:4},{name:"Vallenar",region_id:4},{name:"Andacollo",region_id:5},
      {name:"Canela",region_id:5},{name:"Combarbalá",region_id:5},{name:"Coquimbo",region_id:5},{name:"Illapel",region_id:5},
      {name:"La Higuera",region_id:5},{name:"La Serena",region_id:5},{name:"Los Vilos",region_id:5},{name:"Monte Patria",region_id:5},
      {name:"Ovalle",region_id:5},{name:"Paihuano",region_id:5},{name:"Punitaqui",region_id:5},{name:"Río Hurtado",region_id:5},
      {name:"Salamanca",region_id:5},{name:"Vicuña",region_id:5},{name:"Algarrobo",region_id:6},{name:"Cabildo",region_id:6},
      {name:"Calera",region_id:6},{name:"Calle Larga",region_id:6},{name:"Cartagena",region_id:6},{name:"Casablanca",region_id:6},{name:"Catemu",region_id:6},
      {name:"Concón",region_id:6},{name:"El Quisco",region_id:6},{name:"El Tabo",region_id:6},{name:"Hijuelas",region_id:6},{name:"Isla de Pascua",region_id:6},
      {name:"Juan Fernández",region_id:6},{name:"La Cruz",region_id:6},{name:"La Ligua",region_id:6},{name:"Limache",region_id:6},{name:"Llaillay",region_id:6},{name:"Los Andes",region_id:6},
      {name:"Nogales",region_id:6},{name:"Olmué",region_id:6},{name:"Panquehue",region_id:6},{name:"Papudo",region_id:6},{name:"Petorca",region_id:6},{name:"Puchuncaví",region_id:6},
      {name:"Putaendo",region_id:6},{name:"Quillota",region_id:6},{name:"Quilpué",region_id:6},{name:"Quintero",region_id:6},
      {name:"Rinconada",region_id:6},{name:"San Antonio",region_id:6},{name:"San Esteban",region_id:6},{name:"San Felipe",region_id:6},{name:"Santa María",region_id:6},{name:"Santo Domingo",region_id:6},{name:"Valparaíso",region_id:6},{name:"Villa Alemana",region_id:6},{name:"Viña del Mar",region_id:6},
      {name:"Zapallar",region_id:6},{name:"Chépica",region_id:7},{name:"Chimbarongo",region_id:7},{name:"Codegua",region_id:7},{name:"Coínco",region_id:7},{name:"Coltauco",region_id:7},{name:"Doñihue",region_id:7},{name:"Graneros",region_id:7},{name:"La Estrella",region_id:7},{name:"Las Cabras",region_id:7},{name:"Litueche",region_id:7},{name:"Lolol",region_id:7},{name:"Machalí",region_id:7},{name:"Malloa",region_id:7},{name:"Marchihue",region_id:7},
      {name:"Mostazal",region_id:7},{name:"Nancagua",region_id:7},{name:"Navidad",region_id:7},{name:"Olivar",region_id:7},{name:"Palmilla",region_id:7},{name:"Paredones",region_id:7},{name:"Peralillo",region_id:7},{name:"Peumo",region_id:7},{name:"Pichidegua",region_id:7},{name:"Pichilemu",region_id:7},{name:"Placilla",region_id:7},{name:"Pumanque",region_id:7},{name:"Quinta de Tilcoco",region_id:7},{name:"Rancagua",region_id:7},{name:"Rengo",region_id:7},{name:"Requínoa",region_id:7},{name:"San Fernando",region_id:7},{name:"Santa Cruz",region_id:7},{name:"San Vicente",region_id:7},{name:"Cauquenes",region_id:8},{name:"Chanco",region_id:8},{name:"Colbún",region_id:8},{name:"Constitución",region_id:8},{name:"Curepto",region_id:8},{name:"Curicó",region_id:8},{name:"Empedrado",region_id:8},{name:"Hualañé",region_id:8},{name:"Licantén",region_id:8},{name:"Linares",region_id:8},{name:"Longaví",region_id:8},{name:"Maule",region_id:8},{name:"Molina",region_id:8},{name:"Parral",region_id:8},
      {name:"Pelarco",region_id:8},{name:"Pelluhue",region_id:8},{name:"Pencahue",region_id:8},{name:"Rauco",region_id:8},{name:"Retiro",region_id:8},{name:"Río Claro",region_id:8},{name:"Romeral",region_id:8},{name:"Sagrada Familia",region_id:8},{name:"San Clemente",region_id:8},{name:"San Javier",region_id:8},{name:"San Rafael",region_id:8},{name:"Talca",region_id:8},{name:"Teno",region_id:8},{name:"Vichuquén",region_id:8},{name:"Villa Alegre",region_id:8},{name:"Yerbas Buenas",region_id:8},{name:"Bulnes",region_id:9},{name:"Chillán",region_id:9},{name:"Chillán Viejo",region_id:9},{name:"Cobquecura",region_id:9},{name:"Coelemu",region_id:9},{name:"Coihueco",region_id:9},{name:"El Carmen",region_id:9},{name:"Ninhue",region_id:9},{name:"Ñiquén",region_id:9},{name:"Pemuco",region_id:9},{name:"Pinto",region_id:9},{name:"Portezuelo",region_id:9},{name:"Quillón",region_id:9},{name:"Quirihue",region_id:9},{name:"Ránquil",region_id:9},{name:"San Carlos",region_id:9},{name:"San Fabián",region_id:9},
      {name:"San Ignacio",region_id:9},{name:"San Nicolás",region_id:9},{name:"Treguaco",region_id:9},{name:"Yungay",region_id:9},{name:"Alto Biobío",region_id:10},{name:"Antuco",region_id:10},{name:"Arauco",region_id:10},{name:"Cabrero",region_id:10},{name:"Cañete",region_id:10},{name:"Chiguayante",region_id:10},{name:"Concepción",region_id:10},{name:"Contulmo",region_id:10},
      {name:"Coronel",region_id:10},{name:"Curanilahue",region_id:10},{name:"Florida",region_id:10},{name:"Hualpén",region_id:10},{name:"Hualqui",region_id:10},{name:"Laja",region_id:10},{name:"Lebu",region_id:10},{name:"Los Alamos",region_id:10},{name:"Los Angeles",region_id:10},{name:"Lota",region_id:10},{name:"Mulchén",region_id:10},{name:"Nacimiento",region_id:10},{name:"Negrete",region_id:10},{name:"Penco",region_id:10},{name:"Quilaco",region_id:10},
      {name:"Quilleco",region_id:10},{name:"San Pedro de la Paz",region_id:10},{name:"San Rosendo",region_id:10},{name:"Santa Bárbara",region_id:10},{name:"Santa Juana",region_id:10},{name:"Talcahuano",region_id:10},{name:"Tirúa",region_id:10},{name:"Tomé",region_id:10},{name:"Tucapel",region_id:10},{name:"Yumbel",region_id:10},{name:"Angol",region_id:11},{name:"Carahue",region_id:11},{name:"Cholchol",region_id:11},{name:"Collipulli",region_id:11},{name:"Cunco",region_id:11},{name:"Curacautín",region_id:11},{name:"Curarrehue",region_id:11},{name:"Ercilla",region_id:11},{name:"Freire",region_id:11},{name:"Galvarino",region_id:11},{name:"Gorbea",region_id:11},{name:"Lautaro",region_id:11},{name:"Loncoche",region_id:11},{name:"Lonquimay",region_id:11},{name:"Los Sauces",region_id:11},{name:"Lumaco",region_id:11},{name:"Melipeuco",region_id:11},{name:"Nueva Imperial",region_id:11},{name:"Padre Las Casas",region_id:11},{name:"Perquenco",region_id:11},{name:"Pitrufquén",region_id:11},{name:"Pucón",region_id:11},
      {name:"Purén",region_id:11},{name:"Renaico",region_id:11},{name:"Saavedra",region_id:11},{name:"Temuco",region_id:11},{name:"Teodoro Schmidt",region_id:11},{name:"Toltén",region_id:11},{name:"Traiguén",region_id:11},{name:"Victoria",region_id:11},{name:"Vilcún",region_id:11},{name:"Villarrica",region_id:11},{name:"Corral",region_id:12},{name:"Futrono",region_id:12},{name:"Lago Ranco",region_id:12},{name:"Lanco",region_id:12},{name:"La Unión",region_id:12},{name:"Los Lagos",region_id:12},{name:"Máfil",region_id:12},{name:"Mariquina",region_id:12},{name:"Paillaco",region_id:12},{name:"Panguipulli",region_id:12},{name:"Río Bueno",region_id:12},{name:"Valdivia",region_id:12},{name:"Ancud",region_id:13},{name:"Calbuco",region_id:13},{name:"Castro",region_id:13},{name:"Chaitén",region_id:13},{name:"Chonchi",region_id:13},{name:"Cochamó",region_id:13},{name:"Curaco de Vélez",region_id:13},{name:"Dalcahue",region_id:13},{name:"Fresia",region_id:13},{name:"Frutillar",region_id:13},{name:"Futaleufú",region_id:13},{name:"Hualaihué",region_id:13},
      {name:"Llanquihue",region_id:13},{name:"Los Muermos",region_id:13},{name:"Maullín",region_id:13},{name:"Osorno",region_id:13},{name:"Palena",region_id:13},{name:"Puerto Montt",region_id:13},{name:"Puerto Octay",region_id:13},{name:"Puerto Varas",region_id:13},{name:"Puqueldón",region_id:13},
      {name:"Purranque",region_id:13},{name:"Puyehue",region_id:13},{name:"Queilén",region_id:13},{name:"Quellón",region_id:13},{name:"Quemchi",region_id:13},{name:"Quinchao",region_id:13},{name:"Río Negro",region_id:13},{name:"San Juan de la Costa",region_id:13},{name:"San Pablo",region_id:13},
      {name:"Aysén",region_id:14},{name:"Chile Chico",region_id:14},{name:"Cisnes",region_id:14},{name:"Cochrane",region_id:14},{name:"Coyhaique",region_id:14},{name:"Guaitecas",region_id:14},{name:"Lago Verde",region_id:14},{name:"O'Higgins",region_id:14},{name:"Río Ibáñez",region_id:14},{name:"Tortel",region_id:14},{name:"Antártica",region_id:15},{name:"Cabo de Hornos",region_id:15},{name:"Laguna Blanca",region_id:15},{name:"Natales",region_id:15},{name:"Porvenir",region_id:15},{name:"Primavera",region_id:15},{name:"Punta Arenas",region_id:15},{name:"Río Verde",region_id:15},{name:"San Gregorio",region_id:15},{name:"Timaukel",region_id:15},{name:"Torres del Paine",region_id:15},{name:"Alhué",region_id:16},{name:"Buin",region_id:16},{name:"Calera de Tango",region_id:16},{name:"Cerrillos",region_id:16},{name:"Cerro Navia",region_id:16},{name:"Colina",region_id:16},{name:"Conchalí",region_id:16},{name:"Curacaví",region_id:16},{name:"El Bosque",region_id:16},{name:"El Monte",region_id:16},{name:"Estación Central",region_id:16},
      {name:"Huechuraba",region_id:16},{name:"Independencia",region_id:16},{name:"Isla de Maipo",region_id:16},{name:"La Cisterna",region_id:16},{name:"La Florida",region_id:16},{name:"La Granja",region_id:16},{name:"Lampa",region_id:16},{name:"La Pintana",region_id:16},{name:"La Reina",region_id:16},{name:"Las Condes",region_id:16},{name:"Lo Barnechea",region_id:16},{name:"Lo Espejo",region_id:16},{name:"Lo Prado",region_id:16},{name:"Macul",region_id:16},{name:"Maipú",region_id:16},{name:"María Pinto",region_id:16},{name:"Melipilla",region_id:16},{name:"Ñuñoa",region_id:16},{name:"Padre Hurtado",region_id:16},{name:"Paine",region_id:16},{name:"Pedro Aguirre Cerda",region_id:16},{name:"Peñaflor",region_id:16},{name:"Peñalolén",region_id:16},{name:"Pirque",region_id:16},{name:"Providencia",region_id:16},{name:"Pudahuel",region_id:16},{name:"Puente Alto",region_id:16},{name:"Quilicura",region_id:16},{name:"Quinta Normal",region_id:16},{name:"Recoleta",region_id:16},{name:"Renca",region_id:16},{name:"San Bernardo",region_id:16},
      {name:"San Joaquín",region_id:16},{name:"San José de Maipo",region_id:16},{name:"San Miguel",region_id:16},{name:"San Pedro",region_id:16},{name:"San Ramón",region_id:16},{name:"Santiago",region_id:16},{name:"Talagante",region_id:16},{name:"Tiltil",region_id:16},{name:"Vitacura",region_id:16},

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
        species_id:1
      },
      {
      name:"Poodle",
      species_id:1
      },
      {
      name:"Pastor Alemán",
      species_id:1
      },
      {
      name:"Yorkshire Terrier",
      species_id:1
      },
      {
      name:"Fox Terrier",
      species_id:1
      },
      {
      name:"Golden Retriever",
      species_id:1
      },
      {
      name:"Bulldog",
      species_id:1
      },
      {
      name:"Border Collie",
      species_id:1
      },
      {
      name:"Pug",
      species_id:1
      },
      {
      name:"Schnauzer",
      species_id:1
      },
      {
      name:"Chihuahua",
      species_id:1
      },
      {
      name:"Otro - gato",
      species_id:2
      },
      {
      name:"Persa",
      species_id:2
      },
      {
      name:"Siamés",
      species_id:2
      },
      {
      name:"Maine Coon",
      species_id:2
      },
      {
      name:"Esfinge",
      species_id:2
      },
      {
      name:"Bengala",
      species_id:2
      },
      {
      name:"Exotico de Pelo Corto",
      species_id:2
      },
      {
      name:"British Shorthair",
      species_id:2
      },
      {
      name:"Otro - roedor",
      species_id:3
      },
      {
        name:"Hámster",
        species_id:3
      },
      {
      name:"Degú",
      species_id:3
      },
      {
      name:"Chinchilla",
      species_id:3
      },
      {
      name:"Cuy",
      species_id:3
      },
      {
      name:"Ratón Doméstico",
      species_id:3
      },
      {
      name:"Otro - ave",
      species_id:4
      },
      {
      name:"Canario",
      species_id:4
      },
      {
      name:"Periquito Australiano",
      species_id:4
      },
      {
      name:"Loro",
      species_id:4
      },
      {
      name:"Agapornis",
      species_id:4
      },
      {
      name:"Cacatúa",
      species_id:4
      },
      {
      name:"Serpiente",
      species_id:5
      },
      {
      name:"Iguana",
      species_id:5
      },
      {
      name:"Tortuga Terrestre",
      species_id:5
      },
      {
      name:"Tortuga de Agua",
      species_id:5
      },
      {
      name:"Camaleón",
      species_id:5
      },
      {
      name:"Dragón de Agua Chino",
      species_id:5
      },
      {
      name:"Otro - pez",
      species_id:6
      },
      {
      name:"Pez Ángel",
      species_id:6
      },
      {
      name:"Pez Betta",
      species_id:6
      },
      {
      name:"Pez Guppy",
      species_id:6
      },
      {
      name:"Pez Disco",
      species_id:6
      },
      {
      name:"Otro - arácnido",
      species_id:7
      },
      {
      name:"Tarántula",
      species_id:7
      },
      {
      name:"Araña Pollito",
      species_id:7
      },
      {
      name:"Araña Escupidora",
      species_id:7
      },
      {
      name:"Araña Hormiga",
      species_id:7
      },
      {
      name:"Otro - mustélido",
      species_id:8
      },
      {
      name:"Hurón",
      species_id:8
      },
      {
      name:"Otro - conejo",
      species_id:9
      },
      {
      name:"Conejo Enano",
      species_id:9
      },
      {
      name:"Belier",
      species_id:9
      },
      {
      name:"Conejo Hotot",
      species_id:9
      },
      {
      name:"Rex",
      species_id:9
      },
      {
      name:"Gigante de Flandes",
      species_id:9
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
