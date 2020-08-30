import { KeyProviderService } from './../key-provider.service';
import { Key } from './../key.model';
import { CalculatorService } from './../calculator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  private selectedOperation: string = null;
  private leftSideValue: string = null;
  private resetDisplayOnNextType = false;
  valueToDisplay = '0';
  keys: Array<Key>;
  validToReset = false;

  constructor(
    private keyProviderService: KeyProviderService,
    private calcService: CalculatorService
  ) {}

  ngOnInit(): void {
    this.keys = this.keyProviderService.getKeys(this);
  }

  resetDisplayedValue(): void {
    this.valueToDisplay = '0';
    this.validToReset = false;
    this.leftSideValue = null;
    this.selectedOperation = null;
  }

  digitClicked(digit: string): void {
    if (this.resetDisplayOnNextType) {
      this.resetDisplayOnNextType = false;
      this.valueToDisplay = digit;
      return;
    }
    if (this.valueToDisplay.length > 15) return;
    if (digit === '.') {
      if (this.valueToDisplay.includes(digit)) return;
      this.valueToDisplay += digit;
      this.validToReset = true;
      return;
    }
    if (this.valueToDisplay === '0' && digit === '0') return;
    if (this.valueToDisplay === '0') this.valueToDisplay = digit;
    else this.valueToDisplay += digit;
    this.validToReset = true;
  }

  arithmeticKeyClicked(arithmeticSymbol: string): void {
    if (arithmeticSymbol === '±') {
      this.valueToDisplay = this.valueToDisplay.includes('-')
        ? this.valueToDisplay.substring(1)
        : '-' + this.valueToDisplay;
      return;
    }
    if (arithmeticSymbol === '%') {
      this.valueToDisplay = this.calcService.calculate(
        this.leftSideValue,
        this.valueToDisplay,
        '%'
      );
      return;
    }
    if (this.selectedOperation)
      this.valueToDisplay = this.calcService.calculate(
        this.leftSideValue,
        this.valueToDisplay,
        this.selectedOperation
      );

    if (arithmeticSymbol === '=') {
      this.selectedOperation = null;
      this.leftSideValue = null;
      return;
    }

    this.selectedOperation = arithmeticSymbol;
    this.leftSideValue = this.valueToDisplay;
    if (this.valueToDisplay !== '0') this.resetDisplayOnNextType = true;
  }
}
