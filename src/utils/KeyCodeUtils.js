class KeyCodeUtils {

    static UP = 38;

    static DOWN = 40;

    static TAB = 9;

    static ENTER = 13;

    static E = 69;

    static ESCAPE = 27;

    //kiểm tra có liên quan đến các hành động điều hướng hay không
    static isNavigation(e) {
        return (e >= 33 && e <= 40) || e === 9 || e === 8 || e === 46 || e === 14 || e === 13;
    }

    //kiểm tra xem có thuộc bàn phím số hay không
    static isNumeric(e) {
        return (e >= 48 && e <= 57) || (e >= 96 && e <= 105);
    }

    //kiểm tra chữ cái hay không
    static isAlphabetic(e) {
        return (e >= 65 && e <= 90);
    }

    // kiểm tra xem có liên quan tới các kí tự thập phân (chấm, phẩy) không
    static isDecimal(e) {
        return e === 190 || e === 188 || e === 108 || e === 110;
    }

    //kt xem có liên quan đến các dấu hay không
    static isDash(e) {
        return e === 109 || e === 189;
    }
}

export default KeyCodeUtils;