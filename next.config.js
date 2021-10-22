const withImages = require('next-images')
module.exports = {
    reactStrictMode: false,
    images: {
        domains: ['via.placeholder.com', 'avatars.dicebear.com']
    },
    withImages: withImages()
}
