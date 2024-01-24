/**
 * @param hash - IPFS hash
 * @returns IPFS link
 */

const getIPFSLink = (hash: string): string => {
    const gateway = 'https://w3s.link/ipfs/'
    return `${gateway}${hash}`;
};

export default getIPFSLink