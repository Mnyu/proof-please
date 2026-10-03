import { config } from '@/config';
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

const getTrialRun = () => {
  return {
    url: '',
    caption: '',
    transcript:
      'क्या आप इमाजिन कर सकते हो दोस्तों, देश का सबसे पॉपुलर हिंदी अख़बार अपने फ्रंट पेज की हेडलाइन में ही फेक न्यूस चाप दे। कल ऐसा ही कुछ हुआ 11 सेप्टेमबर को। देनिक जागरन ने अपना फ्रंट पेज का आर्टिकल लिखा नेपाल प्रोटेस्ट के पर और देखिए क्या लिखा है हेडलाइन में। जेन जी ने मांगा हिंदू राष्ट। ये सरासर जूटी खबर है। अनलाइन आपको एक भी आर्टिकल ऐसा नहीं मिलेगा जिसमें इस बारे में बात की जा रही हो कि नेपाल में जेन जी ने हिंदू राष्ट की मांग करी है। सिर्फ एक एंडी टीवी का आर्टिकल था और एंडी टीवी ने उस आर्टिकल की हेडलाइन बदल दिये। ट्वीटर पर आप सर्च करोगे कि नेपाल डिमांड्स हिंदू राष्ट सिर्फ बीजेपी आईटी सेल के एंडियन लोग मिलेंगे आपको ये बात करते हुए कि नेपाल डिमांड कर रहा है हिंदू राष्ट। लेकिन एक भी नेपाली का ट्वीट नहीं मिलेगा आपको कि हिंदू राष्ट की मांग करी गई है। सोच कर देखो मतलब इतनी सरासर जूट ही खबर और ये फ्रंड पेज़ पर हेडलाइन में डाली जा रहे हैं। अगर आपके आपकी किसी जानने वाले के घर में अखबार आता है उनके साथ जराएँ वीडियो शेयर करो ताकि उनको भी पता चले खबरों के नाम पर क्या बेचा जा रहे हैं उनको। और पता है हैरानी की बात क्या है दोस्तों ये पहली बार नहीं है जब ये इस अखबार ने ऐसी चीज़ करी हो। दो साल पहले इनकी फ्रंट पेज़ की हेडलाइन थी ये कि भारत ने फिर पाकिस्तान पर करी सरजिकल स्ट्राइक और ये भी पूरी तरीके से फेक निउस थी। हालत इतनी बुरी है कि इंडियन आर्मी को आना पड़ा था क्लैरिफाई करने के लिए कि भाई इस अखबार ने जो चापा है ये फरजी खबर है ऐसा कुछ नहीं हुआ है। सोच सकते हो मतलब। सिंपल सी बात कहुंगा अगर आपके घर में ये अखबार आ रहा है बंद करा दो कोई भी और अखबार चुलनो धेर सारे और अखबार हैं किसी भी और अखबार की इससे बेटर क्रेडबिलिटी है।',
  };
};

export { getVideoDetails, getTrialRun };
