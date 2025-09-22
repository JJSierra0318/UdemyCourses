# Notas Generales

## Señales

- Las señales envían actualizaciones solo a los componentes donde ocurrió un cambio, en vez de actualizar toda la página o el componente o manejar funciones de verificación de cambios. (Introducido en Angular despúes de la versión 18).
- Anteriormente se usaba ZoneJS (una librería externa) para el ciclo de detección de cambios, pero tiene problemas con el `async-await` y es una librería relativamente pesada.
- Añadir `changeDetection: ChangeDetectionStrategy.OnPush` a los componentes es una forma de volverlo Zoneless. De esta forma cualquier actualización que no se produzca por una señal no se va a ver reflejada en el DOM.
- Las señales de solo lectura (`computed()`) solo se actualizan cuando sus dependencias (siendo otras señales) cambien.
- `linkedSignal` funciona similar a una señal, con la diferencia que esta se usa cuando se debe inicializar una señal con un valor computarizado, (una función, el valor de un input o el valor de otra señal) `inputValue = linkedSignal<string>(() => this.initialValue())`

## Rutas

- Para generar redirecciones de rutas en Angular se usar el parámetro routerLink (e.g. `<a routerLink="/">Home</a>`) y se añade una importación en el component de RouterLink.
- RouterLinkActive permite agregar una clase a un componente HTML si la ruta se encuentra activa o es la que está viendo el usuario.
- `[routerLinkActiveOptions]="{ exact: true }` Hace que routerLink solo aplique si la ruta está exacta y no esté solo un fragmento.
- Al momento de desplegar la aplicación, hay que tener en cuenta que Angular era quien administraba las rutas, si el servidor no tiene las configuraciones necesarias, la aplicación no va a ser capaz de resolver rutas que no pasen por el "root" ("/"), para eso se usa puede agregar una configuración al `app.config.ts`:
```js
{
  provide: LocationStrategy,
  useClass: HashLocationStrategy,
}
```
- En los archivos the rutas, es posible especificar un componente para que se cargue de manera perezosa en vez de llamarlo directamente: `component: () => Component.then(m => m.routes)`, el .then se puede omitir si en el archivo del componete o rutas siendo importado, se incluye un export default.
- El lazy loading hace que el componente solo se cargue cuando el usuario navegue a esa ruta.
- Se pueden usar archivos de rutas internos, los cuales el app.routes.ts llamaría por medio de `loadChildren` de la misma manera que llamaría un documento, usando la importación de las rutas internas en vez del nombre del componente.

### Rutas dinámicas

- Para rutas dinámicas se pueden usar parámetros las URLs: `path: 'route/:query'`
- Los parámetros se reciben con una inyección de la ActiveRoute, que funciona como un observable: `query = inject(ActivatedRoute).params.subscribe()`
- Un observable puede transformarse en una señal con: `query = toSignal(inject(ActivatedRoute.params))`, lo que permite manejar la información de manera más sencillas, y en caso de necesitar un parámetro específico, se pueden usar funciones como el Pipe.

## Control Flow

- A partir de Angular 17 se cambió el uso a `@for` y `@if` dentro de los componentes HTML para ciclos y condicionales. Por ejemplo:
```js
<ol>
  @for (item of items(); track item.id) {
    <li>{{ item.name }}</li>
  }
</ol>
```
- Por medio de parámetros como $index es posible obtener información de la listo y ciclo, como el conteo, índice o determinar si es el elemento es primero, último, par o impar.

## Input / Output

- Angular realiza la comunicación entre componentes por medio de inputs y outputs.
- Los inputs establecen parámetros que los componentes requiren cuando son llamados. Se definen como `variable = input.required<type>()` (En caso de ser obligatorio), y este parámetro se envía una vez se llame el componente en el html, e.g. `<custom-component variable="name" />` (o `[variable]="name()"` en caso de ser variable o señal).
- Los outputs se establecen como variables a través de los cuales los componentes emiten cambios. Se definen como `variable = output<type>()` y envía los eventos: `output.emit(newValue)`. Para recibir los outputs se definen como eventos cuando se declara el componente del que se recibe el evento: `<custom-component (variable)="method($event)" />`

## Servicios

- Escribir `a-services` sirve como Shortcut para un servicios template en Angular.
- Los servicios funcionan como un Singleton (Siempre va a tener la misma instancia).
- La forma recomendad de "instanciar" servicios en los componentes es como una propiedad:
  `public myService = inject(MyService)`

## Inyección de Dependencias

- El patrón de inyección de dependencias separa la creación de la clase de su uso.
- En vez de crear o instancias la clase, lo recibes de alguien más (un "contenedor" o "fábrica").

## Effect

- `effect(() => {})` es una herramienta de Angular que se ejecuta cada vez que cualquier señal que tenga dentro reciba un cambio.
- Recibe como parámetro una función que se ejectua cada vez que el componente del efecto se destruye, o cada vez que el efecto se vuelve a activar.
```js
debounceEffect = effect((onCleanup) => {
    const timeout = setTimeout(() => {
      // Do something here
    }, 500);
    // Resets / cleans the timeout
    onCleanup(() => clearTimeout(timeout))
  })
```

## HTTP

- Angular ofrece llamados HTTP por medio de HttpClient, que se puede considerar como algo más poderoso al fetch normal.
- Las peticiones Http retornan un observable, por ende es necesario suscribirse a la petición para recibir la respuesta.
- HttpClient se inyecta en el servicio (`private http = inject(HttpClient)`) y se debe proveer en el app.config.ts (`provideHttpClient(withFetch())`)

## RxJS

- Por medio de `.pipe()` podemos "interceptar" y modificar lo que pasa a través de un observable, todas los operadores que definamos dentro del pipe se ejecutan antes de emitir el resultado.
- `tap()` es un operador de RxJS que permite hacer efectos secundarios.
- `map()` es un operador que permite transformar los datos del observable.
- `firstValueFrom()` Toma el primer valor de un observable y lo vuelve una promesa.

## ViewCHild

- Es posible tomar referencias del HTML template por medio de viewChild() y viewChildren(), que reciben una referencia, id, clase, etc... que referencia el componente HTML

## Resources
- ***Angular19+ experimental feature***
- Es una forma de aplicar señales con datos que se manejan de manera asíncrona, como conseguir datos de un servidor.
- Un resource tiene dos componentes principales en su objeto de parámetro:
  - **params:** similar a computed, emite un valor de parámetro cada vez que las señales definidas dentro del param cambien.
  - **loader:** una función asíncrona que tiene asignado un estado. el resource llama al loader cada vez que params produce un nuevo valor.
```js
const userResource = resource({
  // Define a reactive computation.
  // The params value recomputes whenever any read signals change.
  params: () => ({id: userId()}),
  // Define an async loader that retrieves data.
  // The resource calls this function every time the `params` value changes.
  loader: ({params}) => fetchUser(params),
});
```
- Podemos acceder a información sobre el recurso por medio de varias señales innatas al mismo, algunas de estas son: value, hasValue, error, isLoading, status.

## RxResources
- ***Angular19+ experimental feature***
- Similar a los resources, la principal diferencia es que ahora trabaja con observables y no con promesas, gracias a esto el loader ya no haría uso de async-await.
- Solo hay que ajustar los returns que no sean observables, para eso se puede usar la función `of()` que retorna un observable con lo que tenga dentro.

## Snapshot
- Se usan snapshots, por ejemplo para las queryParams, cuando no es necesario tener reactividad cuando se realice un cambio.

## Pipes
- Angular permite modificar datos en los templates de HTML por medio de pipes (`|`), estás transformaciones son solo visuales, y se debe importar el Pipe usado dentro del componente.
- Cada pipe puede recibir varios parámetros para modificar la transformación, por ejemplo, el siguiente pipe modifica el número a un formato de dinero, con dólares canadienses, que no agregue el símbolo "CA" y que redondee a 2 decimales: `{{ totalSales() | currency : 'CAD' : 'symbol-narrow' : '1.2-2' }}`
