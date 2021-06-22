// const imageDefaultBaseUrl = process.env.IMAGE_BACKEND_URL || process.env.BACKEND_URL || "https://api.geoworksmsk.ru"
export function calculateImageUrl(img, imageBaseUrl = 'https://api.geoworksmsk.ru') {
    if (!img) {
        return '/no-camera.svg';
    }
    if (img.formats && img.formats.small && img.formats.small.url) {
        return imageBaseUrl + img.formats.small.url;
    }
    return imageBaseUrl + img.url;
}
