import { ServerWallet } from "zano_web3/server";

const daemonUrl = process.env.DAEMON_URL || "http://127.0.0.1:11211/json_rpc";

if (!daemonUrl) {
    throw new Error("DAEMON_URL is not provided at .env file");
}

const walletInstance = new ServerWallet({
    daemonUrl: daemonUrl,
    walletUrl: "http://127.0.0.1:11211/json_rpc"
});

export default walletInstance;