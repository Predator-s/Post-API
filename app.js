const express = require('express');
const app = express();
const Inventory = require('./inventorySchema');

app.use(express.json());

// API route to modify product database based on payload
app.post('/api/products', async (req, res) => {
  try {
    const payload = req.body;
    for (const item of payload) {
      const product = await Inventory.findOne({ productId: item.productid });
      if (product) {
        if (item.operation === 'add') {
          product.quantity += item.quantity;
        } else if (item.operation === 'subtract') {
          product.quantity -= item.quantity;
        }
        await product.save();
      }
    }
    res.status(200).send('Product database updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));