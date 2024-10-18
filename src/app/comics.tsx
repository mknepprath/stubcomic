'use client'; // Mark this component as a client component

import { useSearchParams } from 'next/navigation';
import { MastodonStatus } from '@/app/mastodon';
import Link from 'next/link';
import styles from "./page.module.css";

interface ComicsDisplayProps {
    comics: MastodonStatus[];
}

export default function Comics({ comics }: ComicsDisplayProps) {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || comics.length;

    // Calculate index for pagination, showing the newest comic first
    const totalComics = comics.length;
    const index = totalComics - currentPage;

    // Ensure valid page index
    if (index < 0 || index >= totalComics) {
        return <p>Invalid page number</p>;
    }

    const comic = comics[index];

    return (
        <div className={styles.main}>
            <img
                src="/logo/stub.jpeg"
                alt="Stub logo"
                style={{ maxWidth: 600, width: "100%" }}
            />

            {/* Pagination */}
            <div className={styles.pagination}>
                {currentPage > 1 && (
                    <Link href={`/?page=${currentPage - 1}`}>
                        <button>Previous</button>
                    </Link>
                )}
                {index > 0 && (
                    <Link href={`/?page=${currentPage + 1}`}>
                        <button>Next</button>
                    </Link>
                )}
                {currentPage > 1 && (
                    <Link href={`/?page=1`}>
                        <button>First</button>
                    </Link>
                )}
            </div>

            {/* Display the comic for the current page */}
            <img
                src={comic.media_attachments[0].url}
                alt="Comic"
                style={{ maxWidth: 600, width: "100%" }}
            />

            {/* Pagination */}
            <div className={styles.pagination}>
                {currentPage > 1 && (
                    <Link href={`/?page=${currentPage - 1}`}>
                        <button>Previous</button>
                    </Link>
                )}
                {index > 0 && (
                    <Link href={`/?page=${currentPage + 1}`}>
                        <button>Next</button>
                    </Link>
                )}
                {currentPage > 1 && (
                    <Link href={`/?page=1`}>
                        <button>First</button>
                    </Link>
                )}
            </div>
        </div>
    );
}