# Markdown-Proyect

<a href="http://www.freeimagehosting.net/commercial-photography/"><img src="https://i.imgur.com/9AOzjLg.jpg" alt="Commercial Photography"></a>

_Esta es una libreria de NodeJS que contiene un extractor de links, recibe una ruta de archivo en formato “.md” y retorna por medio de la consola un listado de todos los enlaces que contiene el proyecto, así como la línea del archivo donde se encuentra alojado. 
Además si se añade la opción de validar, puede comprobar que los enlaces están funcionando  o de lo contrario están “rotos”._

[link a NPM](https://www.npmjs.com/package/marielk-mdlinks)

## Sobre el proyecto 🚀

Este proyecto se encuentra en su versión 2.4.0 en la cual se añadió la validación de links, por el momento estamos trabajando en una mejor implementación y más opciones de validación como obtener un promedio de links con status ok. 
Por el momento solo es posible analizar archivos de tipo “.md” y solo es posible ver los resultados en la consola, si el archivo no contiene links no retorna nada.

### Pre-requisitos 📋

_Debes tener instalado npm (sudo) npm install -g_
Para usarlo en la terminal (git Bash) 
Debes instalar de forma global las siguientes librerías con las que trabaja este markdown extractor (de forma global para que esté disponible en cualquiera de tus proyectos, de lo contrario en lugar de "-g" debes escribir "--save"): 

```
$npm install marked -g
$npm install marked-terminal -g
$npm install chalk -g 
$npm install node-fetch -g

```

### Instalación 🔧

_Pasos para instalar esta librería_

```
$npm install marielk-mdlinks -g 
```
A continuación debes ejecutar el comando 

```
$ mdlinks <nombre-de-tu-archivo.md> 
```

Esto devolverá un listado con los links encontrados en tu archivo con su título y la linea de codigo donde se encuentra.

La siguiente opción es 

```
$mdlinks <nombre-de-tu-archivo.md> -validate
```

Esto te devolverá lo mismo que el comando anterior además de un status de cada link, 200 si esta funcionando, y 404 si no existe el enlace. 

## Ejemplos de uso ⚙️

Usa la librería como un paquete completo, instalando con npm, se guardará el fichero en la carpeta node_modules, marielk-mdlinks. Luego en tu archivo js puedes usarlo directamente con "require", ejemplo:

		```
		const links = require('./node_modules/marielk-mdlinks/lib/md-links').mdlinks(nombreDeTuArchivo.md, -validate);
		```
<a href="http://www.freeimagehosting.net/commercial-photography/"><img src="https://i.imgur.com/9AOzjLg.jpg" alt="Commercial Photography"></a>
<a href="http://www.freeimagehosting.net/commercial-photography/"><img src="https://i.imgur.com/xbFKfA7.jpg" alt="Commercial Photography"></a>

### Flujo de la aplicación ⌨️

<a href="http://www.freeimagehosting.net/commercial-photography/"><img src="https://i.imgur.com/etr2wOa.jpg" alt="Commercial Photography"></a>

## Documentación usada 📦

**CLI**
https://medium.freecodecamp.org/writing-command-line-applications-in-nodejs-2cf8327eee2
https://www.youtube.com/watch?v=C9xGEJ80jjs
https://www.youtube.com/watch?v=oKinLQXxE38

**Leer archivos** 
https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback
https://www.w3schools.com/nodejs/nodejs_filesystem.asp
https://nodejs.org/api/path.html#path_path_resolve_paths

**Marked** 
https://www.npmjs.com/package/marked-terminal
https://github.com/markedjs/marked
https://marked.js.org/#/USING_ADVANCED.md#options
https://www.npmjs.com/package/chalk

**Found Line**
https://stackoverflow.com/questions/2044642/finding-out-what-line-number-an-element-in-the-dom-occurs-on-in-javascript


**Debug nodejs**
https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27


**Error con el modulo de Marked-terminal**
Durante la ejecución del proyecto arrojó un error recurrente con la libreria de Marked, por lo  que el fallo fue reportado en su cuenta de github, este Issue tuvo una respuesta positiva por parte de un miembro del equipo y fue incluido en las mejoras que se lanzaran en la próxima versión de esta librería. 

https://github.com/markedjs/marked/issues/1323

## Planificación del proyecto🛠️

_La organización de este trabajo se detalla en el siguiente enlace_

* [Trello](https://trello.com/b/PV2CGwKc/markdown) - Organizador de tareas

## Autores ✒️

_Proyecto realizado para Laboratoria Chile, proceso de Bootcamp 2018_

* **Mariel Quezada** - *Developer* - [Marielk](https://github.com/Marielk)

También puedes mirar el repositorio original de este proyecto [Laboratoria-Markdown](https://github.com/Laboratoria/scl-2018-01-FE-markdown) quíenes han creado este desafío para las estudiantes de este curso 
:woman: :computer:. 


