module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      u_email: {
        type: String,
        required: true,
        unique: true,
      },
      u_password: {
        type: String,
        required: true,
        unique: true,
      },
      u_role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
