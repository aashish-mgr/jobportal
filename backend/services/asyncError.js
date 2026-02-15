 const asyncError = (fn) => {
  // Higher-order function to handle async errors
return (req,res) => {
    fn(req,res).catch((err) => {
        res.status(500).json({message: "Server Error", error: err.message});
    });
}
};

module.exports = asyncError;