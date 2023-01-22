const { attributeSchema } = require("../../../models/adminModels/attributes")


const getAttributes = async (req,res)=>{
    try {
        const attributes = await attributeSchema.find()
        res.send(attributes)
    } catch (error) {   
        console.log(error)
    }
}


const addAttributes = async (req,res)=>{
    try {
        const findAttributes = await attributeSchema.find()
        if(findAttributes.length < 1){
            const createAttribute = new attributeSchema(req.body)
            createAttribute.save()
            .then(()=>{
                res.send("Attribute Created")
            })
        }else{
            const id = findAttributes[0]._id
            const updateAttribute = await attributeSchema.findByIdAndUpdate(id , req.body)
            .then(()=>{
                res.send("Attribute Updated")
            })
        }
    } catch (error) {
        
    }
}






module.exports = {
    getAttributes,
    addAttributes
}








