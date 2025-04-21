const mongoose = require('mongoose')

const garbageLocationSchema = new mongoose.Schema({
    latitude:Number,
    longitude:Number,
    status:{
        type:String,
        enum:['uncollected' , 'collected'],
        default:'uncollected',
    },
    reportedBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
    },
    reported_at:{
        type:Date,
        default:Date.now,
    },
    photo_url:String,
    description:String,
})

module.exports = mongoose.model('GarbageLocation', garbageLocationSchema)