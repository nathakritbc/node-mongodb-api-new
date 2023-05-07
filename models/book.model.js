module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      book_name: {
        type: String,
        required: true,
      },
      book_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book_type",
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Book = mongoose.model("book", schema);
  return Book;
};
