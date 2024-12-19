import Pair from "@/interfaces/Pair";
import { Dispatch, SetStateAction } from "react";

export interface AddPairTypes {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setPairs: Dispatch<SetStateAction<Pair[]>>;
}