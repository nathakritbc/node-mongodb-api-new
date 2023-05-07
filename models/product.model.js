module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      p_name: {
        type: String,
        required: true,
      },
      p_price: {
        type: Number,
        required: true,
      },
      p_amount: {
        type: Number,
        required: true,
      },
      p_image: {
        type: String,
        required: true,
        unique: true,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", schema);
  return Product;
};
