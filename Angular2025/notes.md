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

## Control Flow

- A partir de Angular 17 se cambió el uso a `@for` y `@if` dentro de los componentes HTML para ciclos y condicionales. Por ejemplo:
```
<ol>
  @for (item of items(); track item.id) {
    <li>{{ item.name }}</li>
  }
</ol>
```
- Por medio de parámetros como $index es posible obtener información de la listo y ciclo, como el conteo, indice o determinar si es el primero, último, par o impar.