import { messages } from './messages';

export const environment = {
    production: true,
    storageKeyPrefix: 'bk',
    authServiceURL: 'https://prod.beatkhor.com/api/auth',
    contentServiceURL: 'https://prod.beatkhor.com/api/content',
    storageServiceURL: 'https://prod.beatkhor.com/api/storage',
    messages,
    seo: {
        siteName: 'Beatkhor',
        siteTitle: 'Discover and publish beats!',
    }
};
