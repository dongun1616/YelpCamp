const mongoose = require('mongoose');
const Campground = require('../models/campground')
const { places, descriptors } = require('./seedHelpers')
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Mongo connection open!")
    })
    .catch(err => {
        console.log("oh no mongo connection error!!")
        console.log(err);
    })

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});  // 모든 캠핑장 삭제후 for루프 실행
    for (let i = 0; i < 50; i++) {   //50개의 랜덤한 캠핑장 생성
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '65dda68c40c10978d8623f3d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus deleniti dolorem provident neque a magnam numquam non, maiores facilis enim hic quae veritatis qui, consequuntur quo laborum unde omnis!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dp8tgre1c/image/upload/v1710151301/YelpCamp/eh9jtwdnwdyohcsvuvtb.jpg',
                    filename: 'YelpCamp/eh9jtwdnwdyohcsvuvtb',
                },
                {
                    url: 'https://res.cloudinary.com/dp8tgre1c/image/upload/v1710151301/YelpCamp/klcvegd0viv2fqwp31f5.jpg',
                    filename: 'YelpCamp/klcvegd0viv2fqwp31f5',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();  //실행후 mongo연결 끊기
})