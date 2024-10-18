import { fetchMastodonComics, MastodonStatus } from '@/app/mastodon';
import Comics from './comics';
import styles from "./page.module.css";

export const revalidate = 60; // Re-fetch data every 60 seconds

export default async function Home() {
  // Fetch the comics directly on the server
  const comics: MastodonStatus[] = await fetchMastodonComics();

  if (!comics || comics.length === 0) {
    return <p>No comics available</p>;
  }

  return (
      <div className={styles.page}>
        <Comics comics={comics} />
      </div>
  );
}