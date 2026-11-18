import { Router } from "express";
import { gry } from "../dane.js";

const router = Router();

/** GET /gry - pełna lista gier */
router.get("/", (req, res) => {
    res.json(gry);
});

/** GET /gry:id - jedna gra o danym id; 404 gdy brak gry o takim id */
router.get("/:id", (req, res) => {
    const gra = gry.find(g => g.id === Number(req.params.id));
    if(!gra){
        res.status(404).json({blad: "Nie ma takiej gry"});
        return;
    }
    res.json(gra);
});

export default router;