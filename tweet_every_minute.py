import os
import time
import tweepy
from dotenv import load_dotenv

# تحميل متغيرات البيئة من ملف .env
load_dotenv()

# بيانات تويتر
API_KEY = os.getenv('APP_K')
API_SECRET = os.getenv('APP_SECRET')
ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
ACCESS_SECRET = os.getenv('ACCESS_SECRET')

# التحقق من وجود البيانات
if not all([API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_SECRET]):
    raise Exception("Missing Twitter API credentials!")

# إعداد الاتصال بتويتر
auth = tweepy.OAuth1UserHandler(API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_SECRET)
api = tweepy.API(auth)

# مسار الصورة
image_path = "your_image.png"  # غير ده بالمسار الصحيح للصورة

# رسالة التغريدة
tweet_text = "تجربة بوست تلقائي كل دقيقة 🔁"

# التكرار
while True:
    try:
        # رفع الصورة والتغريد
        media = api.media_upload(image_path)
        api.update_status(status=tweet_text, media_ids=[media.media_id])
        print("✅ تم النشر بنجاح!")

    except Exception as e:
        print("❌ حصل خطأ:", e)

    # انتظر دقيقة واحدة
    time.sleep(60)
