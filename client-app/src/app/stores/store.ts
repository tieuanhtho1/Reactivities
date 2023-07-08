import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import userStore from "./userStore";
import ModalStore from "./modalStore";

interface Store{
    activityStore: ActivityStore,
    commonStore: CommonStore,
    userStore: userStore,
    modalStore: ModalStore,
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new userStore(),
    modalStore: new ModalStore(),
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}