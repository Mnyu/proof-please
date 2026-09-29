import { config } from '@/config/config';
import { ApifyClient } from 'apify-client';

interface VideoDetails {
  url: string;
  caption: string;
  transcript: string;
}

const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

const getVideoDetails = async (url: string): Promise<VideoDetails> => {
  const actorRun = await client.actor(`apify/instagram-reel-scraper`).call({
    username: [url],
    includeTranscript: true,
    resultsLimit: 1,
  });

  if (actorRun.status != 'SUCCEEDED') {
    throw new Error(`unable to get video details for ${url}, process failed with status: ${actorRun.status}`);
  }
  const { items } = await client.dataset(actorRun.defaultDatasetId).listItems();
  if (items && items.length === 0) {
    throw new Error(`get videos details returned empty list`);
  }
  const item = items[0];
  try {
    const videoDuration = item.videoDuration as number;
    if (videoDuration > config.video.maxDuration) {
      throw new Error(`system does not support videos greater than ${config.video.maxDuration} seconds`);
    }
    return {
      url: item.url as string,
      caption: item.caption as string,
      transcript: item.transcript as string,
    };
  } catch (error) {
    throw new Error(`unable to get video details: ${error}`);
  }
};

export { getVideoDetails };
