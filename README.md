# Tutorial: aplicaciones Web con React y Next I

## Clonar el repositorio https://github.com/PabloSzx/INFO104-2021-1

`git clone https://github.com/PabloSzx/INFO104-2021-1`

Este repositorio contiene una aplicación Web usando **React** y **Next.js**. React permite creación de interfaces de usuario **reactivas** y **dinámicas**. **Next.js** es un framework que que combina **React** y **Node.js** para que podamos construir aplicaciones Web completas en javascript (front-end y back-end) con una orientación a componentes. Revisar definiciones acá [tutorial de Pablo](https://observablehq.com/@pabloszx/info104-2020-2-introduccion-a-react?collection=@pabloszx/info104-2020-2)

## Instalar dependencias, módulos node

Una vez se haya descargado el repositorio, entrar en la carpeta del repositorio y hacer

`$ npm install`

Esto descarga todos los módulos (de node) necesarios que no se versionan en el repositorio (por qué crees que estos módulos no se versionan en el repositorio que clonamos??). Puede demorar algunos minutos dependiendo de tu conexión, porque descarga varios módulos, entre ellos next y react, además de módulos para _levantar_ servidores Web de desarrollo, herramientas de com.

## Correr la aplicación Web en un servidor Web

El proyeto contienen una plaicación Web que necesita _correr_ en un servidor Web, es decir, la aplicación Web necesita ser _servida_. Para esto hacemos:

`$ npm run dev`

Esto _corre_ (run) la aplicación Web en un entorno de desarrollo (dev)
Para ver la aplicación, carga entu navegador la siguiente dirección:

`http://localhost:3000`

## Estructura general de la aplicación

- /pages : aquí pondremos nuestro código javascript. Cada archivo es una página (siempre?)
- /public : contiene elementos (estáticos?) usados en la aplicación Web que se ofrecen 'publicamente' como imágenes y hojas de estilo
- /.gitignore este archivo oculto lista todos los archivos y carpetas que git ignorará (archivos que no son versionados... para qué?)
- /package.json : define atributos generales de la aplicación como nombre y versión, además de dependencias y versiones de librerías o módulos necesarios
- /package-lock.json : define en detalle todos los módulos y sus dependencias (por qué no en package.json?)
- /node_modules : contiene todo el software de base que usamos, los módulos node con los que construimos nuestra aplicación, como next, react, entre otros. Esta carpeta es pesada :S

Al correr la aplicación y cuando cargamos una ruta en el navegador el http://localhost:3000, la aplicación carga el archivo pages/index.js. Podemos cargar directamente una página si agregamos el nombre de la página en la URL (sin .js)

Ej: `http://localhost:3000/response`

(sin embargo, **no** se puede cargar index así http://localhost:3000/index !!)

## Agregando una página

Creemos el archivo `pages/about.js`. En este archivo escribe

```
import Head from "next/head";

const About = () => {
  return ();
};
export default About;
```

Este es nuestro código base. Luego escribiremos el contenido de la página en el return (). El contenido puede combinar javascript (entre {}), JSX, HTML, CSS, ... Mira el ejemplo en las páginas index.js o response.js.

# Tutorial: aplicaciones Web con React y Next, parte II

## Actualizar el repositorio local

Ir a la carpeta del proyecto y hacer

`$ git pull origin main`

Esto descargará del repositorio remoto varias nuevas páginas y componentes

## Estableciendo un layout común

El componente Layout (components/layout.js) define la organización completa de cada página en términos del header que presenta un menú para acceder a las páginas, y el contenido (main). Lego cada pagina (ver por ejemplo page1.js) carga el componente Layout pasándole parámetros que en react se conocen como _props_ (properties).

El componente Layout recibe dos props:

- _pageId_ que se pasa como propiedad de la etiqueta Layout. Por ejemplo en page1.js

`<Layout pageId="page1">`

- _children_ que representa todos los elementos (componentes, etiquetas html) dentro de Layout

## Comunicando componentes

Hay varias formas de pasar información entre componentes. Entre un parent y un child (componente padre contiene componentes hijos), se puede pasar información via _props_ como se ejemplifica en la sección anterior. Para pasar información desde un componente a su _parent_ se pueden usar funciones **callback**.

El componente ViewCount ejemplifica esto. ViewCount es cargado en Layout, como último elemento en el menu (header). Al cargarlo se le pasan dos props: count y reset.

`<ViewCount count={nViews} reset={resetViews} />`

Notar que a la prop reset se le pasa una función. Esta función es un callback, porque estña definida el el componente parent Layout y ViewCount la invocará cada vez que el evento click de un botón.

`<button onClick={props.reset}>reset</button>`

## Cargando contenido

Hay varias formas de cargar contenido, ya sea de archivos en el computador, de una dirección web (via http o https) o una base de datos. En este ejemplo usaremos fetch de una URL.

Se incluye la carpeta /public/data con un archivo json que contiene una lista de cosas por hacer (To Do List). Este contenido se ha puesto un public porque cargaremos este json usando fetch de una url. La carga de este contenido se hace en la página pageList.js usando la función `getServerSideProps`. Notar que esta función agrega a props la variable _data_ y que PageList lo declara: `export default function PageList({data})...`

Luego PageList agega un componente _TodoItem_ por cada elemento de _data_

```
{
  data.map((item) => (
    <TodoItem item={item} />
  ))
}
```

# Tutoral parte III: haciendo que los checkboxes _recuerden_

La idea es que al seleccionar y deseleccionar checkboxes (los componentes TodoItem que se agregan en PageList) éstos recuerden su estado cuando hay cambio de página. La complejidad de esto radica en que cada vez que la página se carga hay un proceso de _rendereo_ de componentes que vuelve a leer el archivo todo.json y vuelve a mostrar la información tal cual definida originalmente y se pierden las selecciones / deselecciones realizadas. Para solucionar esto necesitamos almacenar de alguna forma los valores modificados y luego usar estos valores almacenados al desplegar los componentes TodoItem. Luego debemos intervenir TodoItem y hacer que almacene el nuevo valor una vez que los cambiemos.

Antes de implementar estas nuevas funcionalidades, modificaremos un poco nuestra data y agregaremos un atributo _id_ a cada item del arreglo en **todo.json**. Si te fijas en todo.json, por ejemplo el primer elemento, ahora tiene id:

```
[ {"id": "todo-1", "title":"estudiar programación con react","done":true},... ]
```

## Usando el localStorage

Los navegadores proveen un espacio para almacenar datos que se denomina localStorage. LocalStorage es una alternativa a las tradicionales _cookies_. En nuestro caso, queremos que al leer del archivo todo.json, almacenemos en el localStorage el estado _done_ de cada item en el arreglo. Para esto, modificamos pageList.js.

Primero importaremos useEffect de React

`import { useEffect } from "react";`

useEffect permite definir acciones que se realizan cuando los componentes se inician o cuando cambian valores durante la ejecución del programa. Debemos usar useEffect de lo contrario no podremos acceder al localStorage que reside en el navegador. Recordar que gran parte de nuestro código, incluidos los componentes que usamos _actúan_ o se procesan (se _renderean_) para generar código html y javascript que recibe el navegador.

En el componente PageList, invocamos useEffect de la siguiente forma:

```
export default function PageList({ data }) {
  useEffect(() => {
    data.map((item, index) => {
      console.log(item.id);
      if (localStorage.getItem(item.id) === null) {
        localStorage.setItem(item.id, JSON.stringify(item.done));
      }
    });
  }, []);

  return ( ... )

```

Esto significa:

- Se invoca useEffect() y se le pasan dos parámetros, una función que está definida _inline_ y un arreglo vacío []
- useEffect es un _hook_ y define que cuando los elementos contenidos en el arreglo (en este caso vacío) cambien durante la ejecución (en el navegador), se ejecutará la función definida
- El arreglo vacío significa que esto sólo se ejecutará al momento que el componente (PageList) es _montado_, es decir rendereado y listo para ser desplegado
- La funión definida usa el localStorage. getItem permite encontrar un elemento en el localStorage. Devuelve null si el elemento buscado no existe. Los datos almacenados en el localStorage se identifican con un _key_. En nuetro caso usamos el atributo _id_ de cada _todo_ item
- Notar el uso de JSON.stringify en setItem. Esto es porque localStorage almacena sólo datos de tipo cadena. Como item.done es un boolean, localStorage almacenará el string 'true' o 'false'.

Podemos ver el localStorage en las herramientas de desarrollo en el navegador. En Chrome se encuentra en la parte de Application.

Notar que aunque PageList accede al localStorage, los componentes TodoItem reciben la información obtenida del json todo.json, no los valores almacenados en el localStorage. Esto, denuevo, es así porque los componente TodoItem se renderan antes de que se ejecute el useEffect al montar el componente.

## TodoItem funcional

Ahora necesitamos modificar TodoItem para que haga dos cosas: obtenga el estado respectivo almacenado en el localStorage al _montarse_, y modifique el localStorage al seleccionar/deseleccionar el checkbox. Usaremos useEffect también, además de useState.

Primero importamos useEffect y useState.

```
import { useState, useEffect } from "react";
```

Luego crearmos un _state_ para almacenar el estado del checkbox

```
const [checked, setChecked] = useState(item.done);
```

Un useState es también un _hook_ que engancha un componente a una variable en "tiempo de ejecución". En nuestro caso creamos la variable _checked_, inicializada con el valor original del item (item.done) y su setter _setChecked_.

Luego se agregan dos useEffect. El primer useEffect define lo que pasará una vez el componente se _monte_. Esto ocurrirá siempre una vez al comienzo, al cargar la página. El efecto logrado es checked tomará e valor almacenado el el localStorage. Notar que es fundamental la existencia del _id_.
El segundo useEffect define que ocurrirá cuando _checked_ cambie, y en este caso es cambiar el valor respectivo en el localStorage.

```
  useEffect(() => {
    setChecked(JSON.parse(localStorage.getItem(item.id)));
  }, []);

  useEffect(() => {
    localStorage.setItem(item.id, JSON.stringify(checked));
  }, [checked]);
```

El último paso consiste en especificar qué pasa cuando el checkbox cambia (onChange)

```
<input
  type="checkbox"
  checked={checked}
  onChange={(e) => {
    setChecked(!checked);
  }}
/>
```

Notar como el atributo checked del input se asocia a la varibale checked (podríamos haber usado cualquier otro nombre de variable, no es necesario que se llamen igual :S ). Notar también como onChange usa setChecked (el setter creado por el useState) para reestablecer _checked_ con su valor negado. El setter setChecked cambiará sólo la variable (el state) _checked_, y luego el useEffect respectivo reaccionará, alacenando el nuevo valore en el localStorage.
