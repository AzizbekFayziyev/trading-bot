import { Router } from "express";
import middleware from "../middleware/middleware";
import { tryCatch } from "../utils/utils";
import pairController from "../controllers/pair.controller";

const pairRouter = Router();

pairRouter.use("/pair/*", middleware.verifyToken);

pairRouter.post("/pair/get-user-pairs", tryCatch(pairController.getUserPairs));
pairRouter.post("/pair/add-pair", tryCatch(pairController.addPair));
pairRouter.post("/pair/edit-pair", tryCatch(pairController.editPair));
pairRouter.post("/pair/delete-pair", tryCatch(pairController.deletePair));
pairRouter.post("/pair/toggle-pair-activation", tryCatch(pairController.togglePairActivation));
pairRouter.post("/pair/get-pair-data", tryCatch(pairController.getPairData));

export default pairRouter;