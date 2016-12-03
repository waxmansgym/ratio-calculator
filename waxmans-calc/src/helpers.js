function isNumber(value) {
    if(isNaN(value)) return false;
    if(value === null) return false;
    if(value === '') return false;
    return true;
}

export {isNumber};
