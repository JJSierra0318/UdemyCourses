# Notas Generales

## Señales

- Las señales envían actualizaciones solo a los componentes donde ocurrió un cambio, en vez de actualizar toda la página o el componente o manejar funciones de verificación de cambios. (Introducido en Angular despúes de la versión 18).
- Anteriormente se usaba ZoneJS (una librería externa) para el ciclo de detección de cambios, pero tiene problemas con el `async-await` y es una librería relativamente pesada.
- Añadir `changeDetection: ChangeDetectionStrategy.OnPush` a los componentes es una forma de volverlo Zoneless. De esta forma cualquier actualización que no se produzca por una señal no se va a ver reflejada en el DOM.
- Las señales de solo lectura (`compute()`) solo se actualizan cuando sus dependencias (siendo otras señales) cambien.

## Rutas

- Para generar rutas en Angular se usar el parámetro routerLink (e.g. `<a routerLink="/">Home</a>`) y se añade una importación en el component de RouterLink.
- RouterLinkActive permite agregar una clase a un componente HTML si la ruta se encuentra activa o es la que está viendo el usuario.
- `[routerLinkActiveOptions]="{ exact: true }` Hace que routerLink solo aplique si la ruta está exacta y no esté solo un fragmento.
- Al momento de desplegar la aplicación, hay que tener en cuenta que Angular era quien administraba las rutas, si el servidor no tiene las configuraciones necesarias, la aplicación no va a ser capaz de resolver rutas que no pasen por el "root" ("/"), para eso se usa puede agregar una configuración al `app.config.ts`:
```
{
  provide: LocationStrategy,
  useClass: HashLocationStrategy,
}
```

## Control Flow

- A partir de Angular 17 se cambió el uso a `@for` y `@if` dentro de los componentes HTML para ciclos y condicionales. Por ejemplo:
```
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

## HTTP

- Angular ofrece llamados HTTP por medio de HttpClient, que se puede considerar como algo más poderoso al fetch normal.
- Las peticiones Http retornan un observable, por ende es necesario suscribirse a la petición para recibir la respuesta.
- HttpClient se inyecta en el servicio (`private http = inject(HttpClient)`) y se debe proveer en el app.config.ts (`provideHttpClient(withFetch())`)

## RxJS

- Por medio de `.pipe()` podemos "interceptar" y modificar lo que pasa a través de un observable, todas los operadores que definamos dentro del pipe se ejecutan antes de emitir el resultado.
- `tap()` es un operador de RxJS que permite hacer efectos secundarios.
- `map()` es un operador que permite transformar los datos del observable.