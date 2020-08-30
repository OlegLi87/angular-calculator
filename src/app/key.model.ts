export class Key {
  constructor(
    public className: string,
    public displaySymbol: string,
    public functionToCallWhenClicked: (symbol) => {},
    public id?: string
  ) {}
}
