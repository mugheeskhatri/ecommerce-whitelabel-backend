const {
  createSale,
  deleteSale,
  getSale,
  getSaleById,
} = require("../../../../controllers/common/sale/flashSale");
const router = require("express").Router();

router.post("/admin/flashSale/create", createSale);
router.get("/flashSale/get", getSale);
router.get("/flashSale/get/byId/:id", getSaleById);
router.delete("/admin/flashSale/delete/:id", deleteSale);

module.exports = router;
