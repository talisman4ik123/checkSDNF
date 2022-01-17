// Лабораторная работа №1;
// Вариант D (проверка на СДНФ);
// Выполнил студент группы 821702, Зайцев Д.Е.

const ALPHABET = 'QWERTYUIOPASDFGHJKLZXCVBNM!\\/()';
const PROPOSITIONAL_LETTERS = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const LOGICAL_SIGNS = '!\\/';
const TECHNICAL_SIGNS = '()';

function run () {
    console.log('\\/ и \/\\');
    if(checkCorrectnessSDNF()) {
        alert ('Формула является СДНФ!');
    } else {
        alert ('Формула не является СДНФ!');
    }
}

function checkCorrectnessSDNF() {
    let formula = document.getElementById('probablySDNF').value;

    for (let i = 0; i < formula.length; i++) {
        if (!(ALPHABET.includes(formula[i]))) {
            return false;
        }
    }
    
    for (let i = 0; i < formula.length; i++) {
        if (formula[i] === '(' && PROPOSITIONAL_LETTERS.includes(formula[i+1]) && formula[i+2] === ')') {
            return false;
        }
    }
        
    if (formula != "") {
        if (formula.length == 1) {
            for (let i = 0; i < formula.length; i++) {
                if (PROPOSITIONAL_LETTERS.includes(formula[i])) {
                    return true;
                } else {
                    return false;
                }
            }
    } else {
        if (checkWithRegularExpressionFormula(formula)) {  //Проверка соответствия грамматике
            if (checkAllConjunctions(formula, '\\/')) {
                return true;
            } else {
                return false;
            }
        } else {
                return false;
            }
        }
    }
}

function checkAllConjunctions(expression, sep) {
    let conjunctionOperationsArray = expression.split(sep);
    if (conjunctionOperationsArray == false) {
        return false;
    }
    let j, k;
    let conj = '\/\\';
    let resBooltrue = false;
    let resBoolfalse = false;
    let eqResBool = false;
    for (j = 0; j < conjunctionOperationsArray.length; j++) {
        for (k = 0; k < conjunctionOperationsArray.length; k++) {
            if (j != k) {
                resBooltrue = compareConjunctions(conjunctionOperationsArray[j].split(conj), 
                conjunctionOperationsArray[k].split(conj), true);
                resBoolfalse = compareConjunctions(conjunctionOperationsArray[j].split(conj), 
                conjunctionOperationsArray[k].split(conj), false);
                if (resBooltrue == false || resBoolfalse == false) {
                    return false;
                }
            } else {
                eqResBool = compareSingleConjunction(conjunctionOperationsArray[j].split(conj));
                if (eqResBool == false) {
                    return false;
                } 
            }
        }
    }
    return true;
}


function compareConjunctions(first, second, type) {
    let x, y;
    let bool;
    if (first.length != second.length) {
        return false;
    }
    for (x = 0; x < first.length; x++) {
        bool = false;
        for (y = 0; y < second.length; y++) {
            if (type) {
                for (let i = 0; i < first[x].length; i++) {
                    if (first[x][i] === '!' || first[x][i] === '(' || first[x][i] === ')') {
                        first[x] = first[x].replace(first[x][i], '');
                        i--;
                    }
                }
                for (let i = 0; i < second[y].length; i++) {
                    if (second[y][i] === '!' || second[y][i] === '(' || second[y][i] === ')') {
                        second[y] = second[y].replace(second[y][i], '');
                        i--;
                    }
                }
            }

            if (first[x] == second[y]) {
                bool = true;
                break;
            }
        }
        if (type) {
            if (!bool) {
                return false;
            }
        } else {
            if (bool == false) {
                return true;
            }
        }
    }
    return type;
}


function compareSingleConjunction(first) {
    let x, y;
    let bool;
    for (x = 0; x < first.length; x++) {
        bool = true;
        for (y = 0; y < first.length; y++) {
            if (x != y) {
                for (let i = 0; i < first[x].length; i++) {
                    if (first[x][i] === '!' || first[x][i] === '(' || first[x][i] === ')') {
                        first[x] = first[x].replace(first[x][i], '');
                        i--;
                    }
                }
                for (let i = 0; i < first[y].length; i++) {
                    if (first[y][i] === '!' || first[y][i] === '(' || first[y][i] === ')') {
                        first[y] = first[y].replace(first[y][i], '');
                        i--;
                    }
                }
                if (first[x] == first[y]) {
                    return false;
                }
            }
        }
        if (bool != true) {
            return false;
        }
    }
    return bool;
}


function checkWithRegularExpressionFormula(formula) {
    let form = formula;

    if (form.length == 1 && (PROPOSITIONAL_LETTERS.includes(form) || form == 1 || form == 0)) {
        return true;
    } else {
        while (true) {
            let initLength = form.length;
            for (let i = 0; i < initLength; i++) {
                if (form[i] === '(' && (PROPOSITIONAL_LETTERS.includes(form[i+1]) || form[i+1] == 1 || form[i+1] == 0) && ((form[i+2] === '\\' && form[i+3] === '\/') || (form[i+2] === '\/' && form[i+3] === '\\')) && (PROPOSITIONAL_LETTERS.includes(form[i+4]) || form[i+4] == 1 || form[i+4] == 0) && form[i+5] === ')') {
                    let temp = form.replace(i, i+5);
                    form = form.replace(temp, '1');
                } else if (form[i] === '(' && form[i+1] === '!' && (PROPOSITIONAL_LETTERS.includes(form[i+2]) || form[i+2] == 1 || form[i+2] == 0) && form[i+3] === ')') {
                    let temp = form.replace(i, i+4);
                    form = form.replace(temp, '1');
                } else if (PROPOSITIONAL_LETTERS.includes(form[i]) || form[i] == 0 || form[i] == 1) {
                    let temp = form.replace(i, i+1);
                    form = form.replace(temp, '1');
                }
            }

            if (form.length === initLength) {
                break;
            }
        }
        if ((form.length === 1) && (form == 1)) {
            return true;
        } else {
            return false;
        }
    }
} 