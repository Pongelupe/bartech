export class Utils {

    public static isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i) && window.innerWidth < 768;
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i) && window.innerWidth < 768;
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) && window.innerWidth < 768;
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i) && window.innerWidth < 768;
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) && window.innerWidth < 768;
        },
        any: function () {
            return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
        }

    };

    public static isNullUndefinedOrEmpty(text: any): boolean { return text === null || text === undefined || text === ''; }
}

