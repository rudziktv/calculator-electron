export class Calculator {

    numbers: MathNumber[];
    operators: MathOperators[];

    constructor() {
        this.numbers = [];
        this.operators = [];
    }

    append(number: string | '.') {

        
        if (this.numbers.length == this.operators.length) {
            this.numbers.push(new MathNumber(number));
        } else if (this.numbers.length > this.operators.length) {
            this.numbers[this.numbers.length - 1].append(number);
        }
    }

    del() {
        if (this.numbers.length > 0) {

            if (this.numbers.length == this.operators.length) {
                this.operators.pop();
            } else {
                if (this.numbers[this.numbers.length - 1].backspace()) {
                    this.numbers.pop();
                }
            }

        }
    }

    clear() {
        this.operators = [];
        this.numbers = [];
    }

    operate(char: MathOperators) {
        if (this.numbers.length > 0) {
            if (this.numbers.length == this.operators.length) {

                if (char == "√") {
                    this.numbers.push(new MathNumber("1"));
                    this.operators.push(char);
                    return;
                }

                if (this.operators.length > 0) {
                    this.operators[this.operators.length - 1] = char;
                }
            } else if (this.numbers.length > this.operators.length) {
                this.operators.push(char);
            }
        } else if (char == "√") {
            this.numbers.push(new MathNumber("1"));
            this.operators.push(char);
        }
    }

    alternately<T>(lista1: T[], lista2: T[]): T[] {
        let wynik = [];
        let dlugosc = Math.max(lista1.length, lista2.length);
        
        for (let i = 0; i < dlugosc; i++) {
            if (i < lista1.length) {
                wynik.push(lista1[i]);
            }
            if (i < lista2.length) {
                wynik.push(lista2[i]);
            }
        }
        
        return wynik;
    }

    buildCalculationString() {
        const elements = this.alternately(this.numbers.map((i) => i.value), this.operators);

        return elements.join('');
    }

    buildCalculationNode() {
        const elements = this.alternately(this.numbers.map((i) => i.value), this.operators);

        return elements.join('');
    }

    build() {
        if (this.numbers.length == this.operators.length)
            this.operators = this.operators.slice(0, -1);

        this.stage1loop();
        this.stage2loop();
        this.stage3loop();
    }

    stage1loop(): boolean {
        let done = false;

        for (let i = 0; i < this.operators.length; i++) {
            const operator = this.operators[i];
            
            if (operator == '^' || operator == '√') {
                done = true;

                const a = this.numbers[i];
                const b = this.numbers[i + 1];

                if (operator == '^') {
                    this.numbers[i] = new MathNumber(Math.pow(a.build(), b.build()).toString());
                } else {
                    this.numbers[i] = new MathNumber((a.build() * Math.sqrt(b.build())).toString());
                }

                this.numbers.splice(i + 1, 1);
                this.operators.splice(i, 1);
            }
        }

        return done ? this.stage1loop() : false;
    }

    stage2loop(): boolean {
        let done = false;

        for (let i = 0; i < this.operators.length; i++) {
            const operator = this.operators[i];
            
            if (operator == '*' || operator == '/') {
                done = true;

                const a = this.numbers[i];
                const b = this.numbers[i + 1];

                if (operator == '*') {
                    this.numbers[i] = new MathNumber((a.build() * b.build()).toString());
                } else {
                    this.numbers[i] = new MathNumber((a.build() / b.build()).toString());
                }

                this.numbers.splice(i + 1, 1);
                this.operators.splice(i, 1);
            }
        }

        return done ? this.stage1loop() : false;
    }

    stage3loop(): boolean {
        let done = false;

        for (let i = 0; i < this.operators.length; i++) {
            const operator = this.operators[i];
            
            if (operator == '+' || operator == '-') {
                done = true;

                const a = this.numbers[i];
                const b = this.numbers[i + 1];

                if (operator == '+') {
                    this.numbers[i] = new MathNumber((a.build() + b.build()).toString());
                } else {
                    this.numbers[i] = new MathNumber((a.build() - b.build()).toString());
                }

                this.numbers.splice(i + 1, 1);
                this.operators.splice(i, 1);
            }
        }

        return done ? this.stage1loop() : false;
    }
}

export type MathOperators = '+' | '-' | '/' | '*' | '^' | '√';

class MathNumber {
    value: string;

    constructor(value = "0") {
        this.value = value;
        if (value == ".")
            this.value = "0.";
    }

    append(number: string | '.') {

        if (this.value.length == 1 && this.value == "0") {
            if (number != ".")
                return;
        }

        this.value += number;
    }

    backspace() {
        this.value = this.value.slice(0, -1);

        return this.value.length == 0;
    }

    build() {
        if (this.value[-1] == ".") {
            return +this.value.slice(0, -1);
        }
        return +this.value;
    }
}