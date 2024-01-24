/**
 * @param url - URL to be converted to imagekit url
 * @param name - transformation name
 * @returns ImageKit Url
 */

// const IMAGEKIT_URL = 'https://ik.imagekit.io' + process.env.NEXT_PUBLIC_IMAGEKIT_ID + '/'

const imagekitURL = (url: string, name?: string, blur?: string): string => {
    const IMAGEKIT_URL = 'https://ik.imagekit.io' + process.env.NEXT_PUBLIC_IMAGEKIT_ID + '/'
    
    return blur
    ? `${IMAGEKIT_URL}/tr:di-placheholder.webp, w-30, h-30,bl-6/${url}`
    : name
    ? `${IMAGEKIT_URL}/tr:n-${name}, tr:di-placeholder.webp/${url}`
    : `${IMAGEKIT_URL}/tr:di-placeholder.webp/${url}`;
}

export default imagekitURL