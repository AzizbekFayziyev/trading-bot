import { AddPairData } from "@/interfaces/Pair";
import { getCookie } from "./utils";

async function postFetch(path: string, body: object) {
    return await fetch(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            body
        )
    }).then(res => res.json());
}

export async function checkUserExists() {
    const token = getCookie("token");

    return await postFetch(
        '/api/user/check-user-exists',
        { token }
    );
}

export async function getPairData(url: string) {
    const token = getCookie("token");

    return await postFetch(
        "/api/pair/get-pair-data", {
            url, token
        }
    );
}

export async function addPair(pairData: AddPairData) {
    const token = getCookie("token");

    return await postFetch(
        "/api/pair/add-pair",
        { token, pairData }
    )
}

export async function togglePairActivation(id: string, active: boolean) {
    const token = getCookie("token");

    return await postFetch(
        "/api/pair/toggle-pair-activation",
        { token, id, active }
    )
}

export async function deletePair(id: string) {
    const token = getCookie("token");

    return await postFetch(
        "/api/pair/delete-pair",
        { token, id }
    )
}