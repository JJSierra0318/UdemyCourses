# NestJS

Useful information taken during the course "NestJS Zero to Hero - Modern TypeScript Back-end Development
"

## General Info

- Generate a new nest project from CLI: `nest new \*project_name\*`

## Modules

- Used to organize components in a project.
- AppModule es the root of the application.
- Modules are singletons.
- Defined by the `@module` decorator.
- It receives a list of properties.

## Controllers

- To access a Post request's Body:
```js
method(@Body('item1') param: string) {}
```
- To access a Get/Patch request's Params:
```js
method(@Param('item1') param: string) {}
```
- To access a request's Query:
```js
method(@Query('item1') param: string) {}
```

## Providers

- Defined by the  `@Injectable` decorator in constructors.
- Can be a plain value, class, factory, etc.
- They have to be provided into a module to be usable.
- Can be exported and imported by modules.

## Services

- Defined as providers.
- Can be defined as singleton when wrapped with `@Injectable`.
- Main source of business logic.

## Dependency Injection

- Any component can inject a provider.
- Dependencies are defined as parameters in the constructor of the class.
- NestJS handles the injection logic.