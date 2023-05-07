module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      book_type_name: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const BookType = mongoose.model("book_type", schema);
  return BookType;
};
