const withImages = require('next-images')
module.exports = {
    reactStrictMode: false,
    images: {
        domains: ['via.placeholder.com', 'avatars.dicebear.com', 'eventos-imagens.s3.sa-east-1.amazonaws.com']
    },
    withImages: withImages()
}
