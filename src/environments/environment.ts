import { messages } from './messages';

export const environment = {
    production: false,
    storageKeyPrefix: 'bk',
    authServiceURL: 'https://next.beatkhor.com/api/auth',
    contentServiceURL: 'https://next.beatkhor.com/api/content',
    storageServiceURL: 'https://next.beatkhor.com/api/storage',
    messages,
    seo: {
        siteName: 'Beatkhor',
        siteTitle: 'Discover and download beats!',
    }
};
