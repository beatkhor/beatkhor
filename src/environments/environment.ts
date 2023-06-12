import { messages } from './messages';

export const environment = {
    production: false,
    storageKeyPrefix: 'bk',
    siteURL: 'https://next.beatkhor.com',
    authServiceURL: 'https://next.beatkhor.com/api/auth',
    contentServiceURL: 'https://next.beatkhor.com/api/content',
    storageServiceURL: 'https://next.beatkhor.com/api/storage',
    messages,
    seo: {
        siteName: 'Beatkhor',
        siteTitle: 'Discover and publish beats!',
        siteDescription: 'Beatkhor is a community based platform to discover, publish and download beats. Start browsing or upload your beat right now!',
        keywords: ['beat', 'download', 'free beat', 'publish beat', 'discover beat'],
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
