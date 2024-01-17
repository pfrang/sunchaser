export class Temperature {
  constructor(private readonly temperature: string | number) {}

  static from(temperature: number) {
    return new Temperature(temperature);
  }

  toString() {
    return `${this.temperature}°`;
  }
}
