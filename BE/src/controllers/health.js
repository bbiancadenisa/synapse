exports.getHealth = (req, res) => {
  res.json({
    status: "OK",
    message: "Synapse API is running",
  });
};
