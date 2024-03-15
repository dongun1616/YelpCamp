const { campgroundSchema, reviewSchema } = require('./schemas')
const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campground')
const Review = require('./models/review')

//로그인 여부 물어보는 함수
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {  //로그인 여부 물어보는 메서드
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first')
        return res.redirect('/login');
    }
    next();
}

// 사용자가 요청을 보낸 페이지를 기억하는 함수
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

// 캠핑장 유효성 검사 함수
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// 리뷰 유효성 검사 함수
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// 로그인중인 사용자와 캠핑장 생성자가 같은지 확인하는 함수
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

// 로그인중인 사용자와 리뷰 생성자가 같은지 확인하는 함수
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}