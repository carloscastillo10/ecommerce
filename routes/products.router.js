const express = require("express");
const productsService = require("./../services/product.service");
const validatorHandler = require("./../middlewares/validator.handler");
const {
    createProductShema,
    updateProductShema,
    getProductShema,
} = require("./../schemas/product.schema");
const router = express.Router();
const service = new productsService();

router.get("/", async (req, res) => {
    const products = await service.find();
    res.json(products);
});

// Endpoints de forma especifica antes de los endopoints dinamicos
router.get("/filter", (req, res) => {
    res.send("Yo soy un filter");
});

router.get(
    "/:id",
    validatorHandler(getProductShema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    "/",
    validatorHandler(createProductShema, "body"),
    async (req, res) => {
        const body = req.body;
        console.log(body);
        const newProduct = await service.create(body);
        res.status(201).json(newProduct);
    }
);

// Update partial object
router.patch(
    "/:id",
    validatorHandler(getProductShema, "params"),
    validatorHandler(updateProductShema, "body"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
});

module.exports = router;
