import { Component,  } from '@angular/core';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent {
  characterAmount: number = 10;
  uppercase: boolean = false;
  numbers: boolean = false;
  symbols: boolean = false;
  passwordOutput: string = 'YOUR PASSWORD';
  LOWERCASE_CHARS_CODES = this.fromLowtoHigh(97, 122)
  UPPERCASE_CHARS_CODES = this.fromLowtoHigh(65, 90)
  NUMBERS_CHARS_CODES = this.fromLowtoHigh(48, 57)
  SYMBOLS_CHARS_CODES = this.fromLowtoHigh(33, 47)
                .concat(this.fromLowtoHigh(58, 64));


  fromLowtoHigh(low: number, high: number) {
    const array: Array<number> = []
    for (let i = low; i <= high; i++) {
      array.push(i)
    }
    return array
  }

  generatePassword(characterAmount: number, uppercase: boolean, numbers: boolean, symbols: boolean) {
    let charCodes: number[] = this.LOWERCASE_CHARS_CODES
    if (uppercase) {
      charCodes = charCodes.concat(this.UPPERCASE_CHARS_CODES)
    }
    if (numbers) {
      charCodes = charCodes.concat(this.NUMBERS_CHARS_CODES)
    }
    if (symbols) {
      charCodes = charCodes.concat(this.SYMBOLS_CHARS_CODES)
    }

    const passwordChars = []
    for (let i = 0; i < characterAmount; i++) {
      const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
      passwordChars.push(String.fromCharCode(characterCode))
    }
    this.passwordOutput = passwordChars.join('')
    return this.passwordOutput
  }

  submitPassword() {
    this.generatePassword(this.characterAmount,
      this.uppercase,
      this.numbers,
      this.symbols)
  }

  constructor() {  }

}
