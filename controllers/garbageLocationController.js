const garbageLocation = require('../models/garbageLocationModel')

exports.createGarbageLocation = async (req , res) =>{
    try {
    const {latitude , longitude , reportedBy , description , photo_url} = req.body;

    const location = new garbageLocation({
      latitude,
      longitude,
      reported_by,
      description,
      photo_url,
    });

    await location.save();
    res.status(201).json({message : 'Location Created Successfully' , location})
    } catch (error) {
    res.status(500).json({error:error.message})
    }
}