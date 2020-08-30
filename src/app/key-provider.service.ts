import { CalculatorComponent } from './calculator/calculator.component';
import { Key } from './key.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyProviderService {
  private keySymbols = [
    '±',
    '%',
    '÷',
    '7',
    '8',
    '9',
    '×',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    '.',
    '=',
  ];

  constructor() {}

  getKeys(calcComponent: CalculatorComponent): Array<Key> {
    const keys = new Array<Key>();

    for (const symbol of this.keySymbols) {
      const displaySymbol = symbol;
      let className = null;
      let functionToCallWhenClicked = null;
      let id = null;

      if (!isNaN(parseInt(symbol, 10)) || symbol === '.') {
        className = 'key digit';
        functionToCallWhenClicked = calcComponent.digitClicked.bind(
          calcComponent
        );
        if (symbol === '0') id = 'zero';
      } else if (['÷', '×', '-', '+', '='].includes(symbol)) {
        className = 'key arithmetic';
        functionToCallWhenClicked = calcComponent.arithmeticKeyClicked.bind(
          calcComponent
        );
      } else {
        className = 'key util';
        functionToCallWhenClicked = calcComponent.arithmeticKeyClicked.bind(
          calcComponent
        );
      }
      keys.push(
        new Key(className, displaySymbol, functionToCallWhenClicked, id)
      );
    }
    return keys;
  }
}
