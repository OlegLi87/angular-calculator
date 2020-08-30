import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  calculate(
    leftSideValue: string,
    rightSideValue: string,
    operation: string
  ): string {
    const a = this.parseInput(leftSideValue);
    const b = this.parseInput(rightSideValue);
    switch (operation) {
      case '÷':
        return this.parseCalculatedValue(a / b);
      case '×':
        return this.parseCalculatedValue(a * b);
      case '-':
        return this.parseCalculatedValue(a - b);
      case '+':
        return this.parseCalculatedValue(a + b);
      case '%':
        return this.parseCalculatedValue(b * 0.01);
    }
  }

  private parseInput(value: string): number {
    if (!value) return null;
    if (value.includes('.')) return parseFloat(value);
    else return parseInt(value, 10);
  }

  private parseCalculatedValue(value: number): string {
    let parsedValueString = value.toString();
    if (parsedValueString.includes('.')) {
      const floatValueString = parsedValueString.substring(
        parsedValueString.indexOf('.') + 1
      );
      for (let i = 0; i < floatValueString.length; i++) {
        if (floatValueString[i] === '0' && i + 3 < floatValueString.length) {
          if (
            floatValueString[i + 1] === '0' &&
            floatValueString[i + 2] === '0' &&
            floatValueString[i + 3] === '0'
          ) {
            parsedValueString = parsedValueString.substring(
              0,
              parsedValueString.indexOf('.') + i + 1
            );
          }
        }
      }
    }
    if (parsedValueString[parsedValueString.length - 1] === '.')
      parsedValueString = parsedValueString.substring(
        0,
        parsedValueString.indexOf('.')
      );

    return parsedValueString;
  }
}
