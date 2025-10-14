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
- Se puede conseguir el contexto de las rutas definidas importando la clase de routes en el componente:
```js
routes = routes.map(route => ({
  path: route.path,
  title: `${route.title ?? 'Title'}`
}))
```
- También se puede conseguir el contexto de la ruta actual y los eventos relacionadas a la misma:
```js
pageTitle$ = this.router.events.pipe(
  // Filtramos por el evento que tiene la información final de la ruta actual
  filter(event => event instanceof NavigationEnd),
  map(...),
)
```
- Se pueden programar parámetros en las rutas por medio de botones o redirecciones con `[queryparams]`, la única condición es que debe de tener también un `[routerLink]` para usarlo, si no se desea redireccionar para usar query params se puede dejar un arreglo vacío para que "redireccione" a la misma página de la siguiente manera:
```html
<button [routerLink]="[]" [queryParams]="{ page: pageNumber }">Button</button>
```

### Rutas dinámicas

- Para rutas dinámicas se pueden usar parámetros las URLs: `path: 'route/:query'`
- Los parámetros se reciben con una inyección de la ActiveRoute, que funciona como un observable: `query = inject(ActivatedRoute).params.subscribe()`
- Un observable puede transformarse en una señal con: `query = toSignal(inject(ActivatedRoute.params))`, lo que permite manejar la información de manera más sencillas, y en caso de necesitar un parámetro específico, se pueden usar funciones como el Pipe.
- toSignal también recibe valores iniciales:
```js
toSignal(*Observable*.pipe(
    // code
  ),
  {
    initialValue: 1,
  }
)
```

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
- Es posible inyectar servicios dentro del `app.config.ts` para computar valores, como el idioma por medio de:
```js
{
  provide: LOCALE_ID,
  deps: [LocaleService],
  useFactory: (localeService: LocaleService) => localeService.getLocale
}
```
- Cuando se inyecta un servicio, y un método por medio de useFactory, solo se ejecuta cada vez que se recargue la página, si se quieren reflejar los cambios es necesario agregar un `window.location.reload()` para que se reflejen los cambios.
- Si no se quiere recargar la página, se necesitaría usar librerías externas, con la desventaja de tener que cargar todos los idiomas disponibles en runtime para el ejemplo dado.

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

## Observables
- Son una implementación que permiten manejar flujos de datos asíncronos de manera declarativa, y son parte de RxJS.
- Son Lazy por defecto, lo que significa que no se ejecutan hasta que alguien se suscriba a ellos.
- Pueden emitir varios valores a lo largo del tiempo y pueden ser cancelados.
- Por convención, se suelen declarar con un "\$" al final de su nombre, e.g. `pageTitle$ = ...`

## RxJS

- Por medio de `.pipe()` podemos "interceptar" y modificar lo que pasa a través de un observable, todas los operadores que definamos dentro del pipe se ejecutan antes de emitir el resultado.
- `tap()` es un operador de RxJS que permite hacer efectos secundarios.
- `map()` es un operador que permite transformar los datos del observable.
- `firstValueFrom()` Toma el primer valor de un observable y lo vuelve una promesa.
- `switchMap()` Permite tranformar el observable un otro observable completamente diferente, (como el resultado de un http request).
- `combineLatest()` Recibe un array de observable y combina todas las peticiones, retornando el resultado cuando todas pasen.
- `catchError()` Atrapa cualquier error que ocurra durante la ejecución.

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
- Los pipes se pueden usar tanto dentro de componentes HTML como en expresiones computadas y en elemento "if" y "for"
- Los pipes de internacionalización permiten cambiar dinámicamente texto según varios parámetros como el género o cantidad, al momento de usarse deben de recibir un map o señal con las opciones según los parámetros:

- #### i18nSelectPipe:
```js
  invitationMap = {
      male: 'invitarlo',
      female: 'invitarla'
    }
```
``` html
  <p>Saludos {{ client().name }}, es un placer {{ client().gender | i18nSelect : invitationMap }} a nuestro evento</p>
```

- #### i18nPluralPipe:
```js
  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    other: 'tenemos # clientes esperando',
  })
```
``` html
  <p>Actualmente {{ clients().length | i18nPlural : clientsMap() }}</p>
```

## Content Projection
- Es posible enviar otros componente HTML o de Angular dentro de otros componentes por medio del \<ng-content\>:
```html
<custom-component>
  <h1>Hello</h1>
  <p>Text</p>
</custom-component>  
```
- En el ejemplo anterior, el `h1` y el `p` se van a encontrar poder visualizar en el custom-component si a este último se le agrega un \<ng-content\> en su HTML.

## Forms
- Los formularios en Angular se puede usar mediante el paquete de ReactiveFormsModule, con este primero representamos la estructura del formulario dentro de nuestro código:
```js
myForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  })
```
- De aquí, debemos pasarle las referencias al formulario dentro del HTML: `<form [formGroup]="myForm">` y a cada input: `<input formControlName="price">`
- Una vez hecho esto, tenemos acceso a información del formulario por medio de la variable declarada, como `.valid`, `.pristine`, `.touched`, `.value` y `.controls.*property*.value`
- Otra forma de inicializar el formulario desde el componente es haciendo uso del `FormBuilder`, que puede resultar más fácil de manejar y entender que el FormGroup y funciona de la misma manera:
```js
private fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    // property: [initialValue, syncValidators, asyncValidators]
    name: [''],
    price: [0],
    inStorage: [0],
  })
```
- Para manejar el envío  del formulario se recomienda usar el `(ngSubmit)` en vez del onSubmit o un método dentro del botón.
- Para evitar hacer submit del formulario al presionar enter en un input se puede usar: `(keydown.enter)="$event.preventDefault()`

### Validaciones
- Angular trae algunas validaciones por defecto del la función de `Validators`, que pueden se agregados a cada propiedad del formulario:
```js
name: ['', [Validators.required, Validators.minLength(3)]],
price: [0, [Validators.required, Validators.min(10)]],
inStorage: [0, [Validators.required, Validators.min(0)]],
```
- Los errores generados por las validaciones pueden ser accedidos por medio de `myForm.controls.*property*.errors`
- Sí se desea generar los errores en el momento en que se presione el botón de submit se puede usar la expresión `this.myForm.markAllAsTouched()`.
- Se pueden realizar validaciones a nivel del formulario de la siguiente manera:
```js
myForm = this.fb.group({
  name: ['', [Validators.required]],
  ...
}, {
  validators: [
    this.formUtils.isFieldOneEqualFieldTwo('password', 'password2')
  ]
})
```
- Las validaciones síncronas tienen prioridad sobre las validaciones asíncronas, si hay algún fallo en la primera no se va a realizar el proceso asíncrono.

### Validaciones Custom
- Se pueden crear funciones de validación personalizadas, para esto se debe retornar un método que recibe el formulario y retorne nulo en caso que la validación sea existosa, o un objeto en el caso contrario:
```js
static isFieldOneEqualFieldTwo(field1: string, field2: string) {
  return (formGroup: AbstractControl) => {
    const field1Value = formGroup.get(field1)?.value
    const field2Value = formGroup.get(field2)?.value

    return field1Value === field2Value ? null : { passwordsNotEqual: true }
  }
}
```
- Angular envía por defecto un AbstractControl a sus validators, de forma que algunos validators pueden llamarse sin parámetros, (como el `Validators.required`), y al momento de crear una validación custom funciona igual, lo importante al momento de crearla es especificar que recibe un control: AbstractControl:
```js
static notStrider(control: AbstractControl): ValidationErrors | null {
  return control.value === 'Strider' ? { invalidName: true } : null
}
```
- En el caso de `isFieldOneEqualFieldTwo` se envían parámetros porque se devuelve una función interna. Esta función interna es a la que Angular le va enviar el AbstractControl por defecto.

## Lifecycle Hooks
- Muchos de los hooks del ciclo de vida de Angular se han dejado de usar en favor de otros métodos de control, como los resources para los ngOnInit o la limpieza con effects para ngOnDestroy.
- Si bien los ciclos de vida se pueden usar sin necesidad de agregarles con un `implements`, pero hacerlo enfueza el uso del hook, que puede ser buena práctica para asegurarse que los componentes hacen uso de los ciclos de vida que se consideren necesarios.

## Styles
- Para instalar DaisyUI (que ya instala Tailwind por default) se puede user el siguiente comando:
```sh
npm install daisyui@latest tailwindcss@latest @tailwindcss/postcss@latest postcss@latest --force
```
- Luego se agrega un nuevo archivo `.postcssrc.json` con el siguiente contenido:
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```
- Finalmente, se añade la siguiente configuración al `styles.css`, el tema por default se puede cambiar o eliminar en caso de ser necesario:
```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: night --default;
 }
```

- Para añadir una fuente, se puede descargar el .ttf, agregarlo en un archivo de assets en la carpeta public y agregar la siguiente configuración al styles.css, donde, en caso de fallar va a usar el sans-serif como backup:
```css
@font-face {
  font-family: "montserrat";
  src: url("/assets/fonts/montserrat/Montserrat-Medium.ttf") format("truetype");
}

@theme {
  --font-montserrat: "montserrat", sans-serif;
}
```

## Interceptors
- Son un middleware que interceptan peticiones HTTP y modificarla o transformarla a necesidad. (e.g. agregar un Bearer Token).
- Anteriormente se utilizaban por medio de decoradores pero ahora se recomiendo hacerlo a partir de funciones.
- Primero se define una función que recibe cualquier petición HTTP y se encarga de que el flujo continue luego de interceptar:
```js
export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unkown>> {...}
```
- Dentro de la función manejamos el `next` por medio de un pipe a través del cuál se va a interceptar la petición:
```js
return next(req).pipe(
  tap(...)
)
```
- Para usar el interceptor solo hace falta agregarlo al provider del HttpClient:
```js
provideHttpClient(withInterceptors([loggingInterceptor])),
```
- Los interceptores no pueden modificar directamente un request o response, para eso se debe de crear un clon con `req.clone({...})`.