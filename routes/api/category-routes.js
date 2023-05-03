const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const allCats = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCats);
  } catch (err) {
    throw err;
  }
});

router.get("/:id", async (req, res) => {
  try {
    const oneCat = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }],
    });
    res.status(200).json(oneCat);
  } catch (err) {
    res.status(500).json("Not sure what broke");
    throw err;
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCat = Category.create(req.body);
    res.status(200).json("Success");
  } catch (err) {
    throw err;
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Success");
  } catch (err) {
    throw err;
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try{
    const deleteCat = await Category.destroy({ where: {id: req.params.id}})
    res.status(200).json('Successfully Deleted');
  } catch (err) {
    throw err;
  }
});

module.exports = router;
