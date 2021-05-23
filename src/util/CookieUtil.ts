export default class CookieUtil {
    public getCookie(key: string): string {
        let token;
        document
            .cookie
            .split(";")
            .map(cookie => {
                if (cookie.includes(key))
                    return cookie.split("=")
                        .map(keyValue => {
                            if (keyValue !== key) {
                                token = keyValue;
                            }
                            return null;
                        })
                return null;
            });
        return token === undefined ? "" : token;
    }

    public setCookie(name: string, value: string, days: number): void {
        let expires: string = "";
        if (days) {
            let date: Date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
}