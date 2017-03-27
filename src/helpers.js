function isNumber(value) {
    if(isNaN(value)) return false;
    if(value === null) return false;
    if(value === '') return false;
    if(value === 0) return false;
    return true;
}

let formatNumber = Math.round;

export {formatNumber, isNumber};
