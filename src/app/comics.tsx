'use client'; // Mark this component as a client component

import {useSearchParams} from 'next/navigation';
import {MastodonStatus} from '@/app/mastodon';
import Link from 'next/link';
import styles from "./page.module.css";

interface ComicsDisplayProps {
    comics: MastodonStatus[];
}

export default function Comics({comics}: ComicsDisplayProps) {
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
            <div style={{display: "flex", justifyContent: "center"}}>
                <img
                    src="/logo/stub-halloween.jpg"
                    alt="Stub logo"
                    style={{maxWidth: 320, width: "100%"}}
                />
            </div>

            <Pagination currentPage={currentPage} totalComics={totalComics}/>

            <img
                src={comic.media_attachments[0].url}
                alt="Comic"
                style={{maxWidth: 600, width: "100%"}}
            />

            <Pagination currentPage={currentPage} totalComics={totalComics}/>
        </div>
    );
}

const Pagination = ({currentPage, totalComics}: { currentPage: number, totalComics: number }) => {
    return (
        <div className={styles.pagination}>
            <div>
                {currentPage > 1 && (
                    <Link href={`/?page=1`}>
                        <button className={styles.button} style={{marginRight: "8px"}}>First</button>
                    </Link>
                )}
                {currentPage > 1 && (
                    <Link href={`/?page=${currentPage - 1}`}>
                        <button className={styles.button}>Previous
                        </button>
                    </Link>
                )}
            </div>
            <div>
                {currentPage < totalComics && (
                    <Link href={`/?page=${currentPage + 1}`}>
                        <button className={styles.button} style={{marginRight: "8px"}}>Next</button>
                    </Link>
                )}
                {currentPage < totalComics && (
                    <Link href={`/?page=${totalComics}`}>
                        <button className={styles.button}>Latest</button>
                    </Link>
                )}
            </div>
        </div>
    );
}