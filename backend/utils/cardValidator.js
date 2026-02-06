const isValidLuhn = (number) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i));
        if (shouldDouble) { if ((digit *= 2) > 9) digit -= 9; }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
};

const getCardBrand = (number) => {
    const patterns = {
        Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        MasterCard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/
    };
    for (const [brand, regex] of Object.entries(patterns)) { if (regex.test(number)) return brand; }
    return "Unknown";
};

const isExpired = (expiryDate) => {
    const [month, year] = expiryDate.split('/').map(num => parseInt(num));
    if (!month || !year) return true;
    const now = new Date();
    const currentYear = parseInt(now.getFullYear().toString().substr(-2));
    const currentMonth = now.getMonth() + 1;
    if (year < currentYear) return true;
    if (year === currentYear && month < currentMonth) return true;
    return false;
};

module.exports = { isValidLuhn, getCardBrand, isExpired };