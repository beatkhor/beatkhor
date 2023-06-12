import { messages } from './messages';

export const environment = {
    production: true,
    storageKeyPrefix: 'bk',
    siteURL: 'https://www.beatkhor.com',
    authServiceURL: 'https://www.beatkhor.com/api/auth',
    contentServiceURL: 'https://www.beatkhor.com/api/content',
    storageServiceURL: 'https://www.beatkhor.com/api/storage',
    messages,
    seo: {
        siteName: 'Beatkhor',
        siteTitle: 'Discover and publish beats!',
        siteDescription: 'Beatkhor is a community based platform to discover, publish and download beats. Start browsing or upload your beat right now!',
        keywords: ['beat', 'download', 'free beat', 'publish beat'],
        openGraph: {
            image: {
                image: '/assets/seo/logo-1200x1200.png',
                width: 1200,
                height: 1200,
                type: 'image/png'
            },
        }
    }
};
