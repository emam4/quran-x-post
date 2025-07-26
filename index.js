import 'dotenv/config'
import { TwitterApi } from 'twitter-api-v2';
import fs from 'fs';
import { covertToImages, getImagePathForPage, deleteImage } from './helpers.js';
import cron from 'node-cron';


// Twitter Client
const twitterClient = new TwitterApi({
  appKey: process.env.APP_K,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});


// Automatically pick next page (you can persist this page number in a file or DB)
let page = 10;

async function postQuranPage(page) {
  await covertToImages([page]);

  const imagePath = getImagePathForPage(page);
  const mediaData = fs.readFileSync(imagePath);

  const mediaId = await twitterClient.v1.uploadMedia(mediaData, { mimeType: 'image/jpeg' });

  const tweet = await twitterClient.v2.tweet({
    text: `صفحة رقم ${page} من القرآن الكريم`,
    media: { media_ids: [mediaId] },
  });

  console.log('Tweet posted:', tweet);
  await deleteImage(imagePath);
}


cron.schedule('0 18 * * *', () => {
  postQuranPage(page);
}, {
  timezone: 'Africa/Cairo',
});
