import axios from 'axios';

export interface MastodonMedia {
    id: string;
    type: string; // "image", "video", etc.
    url: string; // URL of the media file
    preview_url: string; // Thumbnail or preview of the media
    description: string | null; // Alt text for the media
}

export interface MastodonStatus {
    id: string;
    content: string; // The post content, can contain HTML
    created_at: string; // Timestamp of the post
    media_attachments: MastodonMedia[]; // Array of attached media
    visibility: string; // e.g., "public", "unlisted", "private"
    account: {
        id: string;
        username: string;
        display_name: string;
    };
    tags: Array<{
        name: string;
    }>;
}
const MASTODON_API_URL = 'https://mastodon.social/api/v1/accounts/113319639694627318/statuses';
const ACCESS_TOKEN = '6H12kUKfdVfYfW0AryrFuSa3oyBXGLaOCL4N2sMFhtY';

export async function fetchMastodonComics(): Promise<MastodonStatus[]> {
    try {
        const response = await axios.get<MastodonStatus[]>(MASTODON_API_URL, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            params: {
                limit: 100,
            },
        });

        return response.data.filter((status) =>
            status.tags.some((tag) => tag.name === 'comic')
        );

    } catch (error) {
        console.error('Error fetching comics from Mastodon:', error);
        return [];
    }
}
