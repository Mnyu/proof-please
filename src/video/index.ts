import { config } from '@/config/config';
import { log } from '@/observability/logger';
import { VideoDetails } from '@/types/types';
import { ApifyClient } from 'apify-client';

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
    log.error(`unable to get video details for ${url}, process failed with status: ${actorRun.status}`);
    throw new Error('Unable to get video details');
  }
  const { items } = await client.dataset(actorRun.defaultDatasetId).listItems();
  if (items && items.length === 0) {
    log.error(`get videos details returned empty list`);
    throw new Error('Unable to get video details');
  }
  const item = items[0];
  try {
    const videoDuration = item.videoDuration as number;
    if (videoDuration > config.video.maxDuration) {
      const msg = `system does not support videos greater than ${config.video.maxDuration} seconds`;
      log.error(msg);
      throw new Error(msg);
    }
    return {
      url: item.url as string,
      caption: item.caption as string,
      transcript: item.transcript as string,
    };
  } catch (error) {
    log.error(error);
    throw new Error(`unable to get video details: ${error}`);
  }
};

export { getVideoDetails };
