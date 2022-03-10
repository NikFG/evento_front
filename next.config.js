const withImages = require('next-images')
module.exports = {
    reactStrictMode: false,
    images: {
        domains: ['via.placeholder.com', 'avatars.dicebear.com','firebasestorage.googleapis.com']
    },
    withImages: withImages()
}
