export default (req, res, next) => {
    const api_key = req.header("api_key");
    if (!api_key) return res.status(403).send("unauthorized");
    if (api_key!="=sqfusqhfhkjdshfjsf65464dsfd8sq8+") {
        res.status(401).send("unauthorized");  
    }
      next();
    
  };