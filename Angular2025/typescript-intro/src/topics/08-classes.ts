export class Person {
  constructor(
    public name: string,
    private address: string = 'No Address'
  ) { }
}

/* export class Hero extends Person {
  constructor(
    public alterEgo: string,
    public age: number,
    public realName: string,
  ) {
    super(alterEgo, 'New York');
  }
} */

export class Hero {
  constructor(
    public alterEgo: string,
    public age: number,
    public person: Person,
  ) {

  }
}

const tony = new Person('Tony Stark', 'New York')
const ironman = new Hero('Iron Man', 45, tony);

console.log(ironman);
