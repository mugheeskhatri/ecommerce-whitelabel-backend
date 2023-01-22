const { reviewSchema } = require('../../../models/commonModels/reviews')
const { productSchema } = require('../../../models/commonModels/product')




const createReview = (req, res) => {
    try {
        const date = new Date()
        req.body.createdDate = date;
        const review = new reviewSchema(req.body)
        review.save()
            .then(async (review) => {
                const product = await productSchema.findOne({ _id: review.productId })
                const productId = product._id
                const productReviews = product.reviews
                productReviews.unshift(review._id)
                product.reviews = productReviews
                const updateProduct = await productSchema.findByIdAndUpdate(productId, product)
                res.send("Review Done")
            })
    }
    catch (e) {
        console.log(e)
    }
}


const getReview = async (req, res) => {
    try {
        const getReveiw = await reviewSchema.find()
        res.send(getReveiw)
    } catch (error) {
        console.log(error)
    }
}



const getReviewByStars = async (req, res) => {
    try {
        const getReview = await reviewSchema.find({ stars: req.params.id })
        res.send(getReview)
    }
    catch (e) {
        console.log(e)
    }
}

const getReviewByProduct = async (req, res) => {
    try {
        const getReview = await reviewSchema.find({ productId: req.params.id })
        res.send(getReview)
    }
    catch (e) {
        console.log(e)
    }
}

const deleteReview = async (req, res) => {
    try {
        const deleteReview = await reviewSchema.findByIdAndDelete(req.params.id)
        res.send("Review Deleted")
    }
    catch (e) {
        console.log(e)
    }
}




module.exports = {
    createReview,
    getReview,
    getReviewByStars,
    getReviewByProduct,
    deleteReview
}