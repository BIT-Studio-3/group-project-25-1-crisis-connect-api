import express from "express";

import {
        recordDamage ,
        getDamages,
        getDamage ,
        updateDamage,
        deleteDamage,
} from "../../controllers/v1/damage.js";

const router = express.Router();

router.post("/", recordDamage);
router.get("/", getDamages);
router.get("/:id", getDamage);
router.put("/:id", updateDamage);
router.delete("/:id", deleteDamage);


export default router;