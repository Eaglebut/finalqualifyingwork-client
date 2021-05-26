import {IBackendable} from "./IBackendable";
import User from "../model/User";

export default interface IAppMenu extends IBackendable {
    anchorEl: HTMLElement | null;
    menuId: string;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    user: User | null;
}