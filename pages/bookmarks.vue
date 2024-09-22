<template>
  <div class="container mx-auto space-y-4 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{{ t('bookmarks.title') }}</h1>
    
    <div class="flex flex-wrap gap-2 mb-6">
      <UButton
        color="gray"
        variant="ghost"
        :class="buttonClass(0)"
        @click="selectCollection(0)"
      >
        {{ t('bookmarks.allBookmarks') }}
      </UButton>
      <UButton
        v-for="collection in collections"
        :key="collection._id"
        color="gray"
        variant="ghost"
        :class="buttonClass(collection._id)"
        @click="selectCollection(collection._id)"
      >
        {{ collection.title }} ({{ collection.count }})
      </UButton>
    </div>

    <div class="masonry-grid">
      <TransitionGroup 
        name="bookmark-list" 
        tag="div" 
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div
          v-for="(bookmark, index) in filteredBookmarks" 
          :key="bookmark._id" 
          :data-index="index"
          class="bookmark-card bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer mb-4"
          @click="openBookmark(bookmark)"
        >
          <template v-if="isBookmarkCollectionXPost(bookmark.collection.$id)">
            <div class="tweet-container">
              <div v-if="!loadedTweets[bookmark._id]" class="tweet-loading">
                <div class="x-logo"></div>
                <div class="loading-spinner"></div>
              </div>
              <Tweet 
                :tweet-id="getTweetId(bookmark.link)" 
                theme="dark"
                conversation="none"
                @tweet-load-success="onTweetLoaded(bookmark._id)"
              />
              <div class="tweet-overlay"></div>
            </div>
          </template>
          <template v-else>
            <img v-if="bookmark.cover" :src="bookmark.cover" :alt="bookmark.title" class="w-full h-48 object-cover">
            <div class="p-4 flex-grow flex flex-col">
              <div class="flex items-center mb-2 text-xs text-gray-400">
                <UIcon name="i-heroicons-globe-alt" class="mr-1 flex-shrink-0" />
                <span>{{ getDomain(bookmark.link) }}</span>
              </div>
              <h2 class="text-xl font-semibold mb-2 text-gray-100">{{ bookmark.title }}</h2>
              <p class="text-sm text-gray-400">{{ bookmark.excerpt }}</p>
            </div>
          </template>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useRaindropApi from '~/api/raindrop';
import gsap from 'gsap';
import Tweet from 'vue-tweet';

const { t } = useI18n();
const { fetchCollections, fetchBookmarks } = useRaindropApi();

const collections = ref([]);
const allBookmarks = ref([]);
const selectedCollection = ref(0);

const selectCollection = (collectionId) => {
  selectedCollection.value = collectionId;
};

const buttonClass = computed(() => (collectionId) => {
  return [
    'transition-colors duration-200 px-3 py-2 rounded-md',
    {
      'text-gray-200 bg-gray-800': selectedCollection.value === collectionId,
      'text-gray-400 hover:text-gray-200': selectedCollection.value !== collectionId
    }
  ];
});

const filteredBookmarks = computed(() => {
  if (selectedCollection.value === 0) {
    return allBookmarks.value;
  }
  return allBookmarks.value.filter(bookmark => bookmark.collection.$id === selectedCollection.value);
});

const getDomain = (url) => {
  try {
    const domain = new URL(url).hostname;
    return domain.replace(/^www\./, '');
  } catch {
    return '';
  }
};

const isBookmarkCollectionXPost = (collectionId) => {
  return collections.value.some(collection => collection._id === collectionId && collection.title === 'X Posts (Tweets)');
};

const getTweetId = (url) => {
  const match = url.match(/\/status\/(\d+)/);
  return match ? match[1] : null;
};

const loadedTweets = ref({});

const onTweetLoaded = (bookmarkId) => {
  loadedTweets.value[bookmarkId] = true;
};

const tweetLoaded = ref(false);

const openBookmark = (bookmark) => {
  window.open(bookmark.link, '_blank');
};

onMounted(async () => {
  collections.value = await fetchCollections();
  allBookmarks.value = await fetchBookmarks();
});

const beforeEnter = (el) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(50px)';
};

const enter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    delay: el.dataset.index * 0.1,
    onComplete: done
  });
};

const leave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    y: 50,
    duration: 0.3,
    onComplete: done
  });
};
</script>

<style scoped>
.masonry-grid {
  column-count: 1;
  column-gap: 1rem;
}

@media (min-width: 640px) {
  .masonry-grid {
    column-count: 2;
  }
}

.bookmark-card {
  position: relative;
  transition: all 0.3s ease;
  display: inline-block;
  width: 100%;
  break-inside: avoid;
  cursor: pointer;
}

.bookmark-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.05);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.bookmark-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.bookmark-card:hover::after {
  opacity: 1;
}

.tweet-container {
  position: relative;
  background-color: #15202b; /* Updated to match Twitter's dark mode background */
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 1px; /* Minimal padding to allow overlay to cover edges */

  min-height: 250px; /* Add a minimum height */
}

.tweet-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10; /* Ensure this is above the tweet content */
  border: 12px solid #15202b; /* Updated to match the new background color */
  border-radius: 0.5rem;
}

/* Ensure the Tweet component and its iframe are clickable */
:deep(.tweet),
:deep(.tweet iframe) {
  position: relative; /* Ensure it's above the overlay */
  z-index: 11; /* Higher than the overlay */
}

/* Adjust the bookmark card background to match if needed */
.bookmark-card {
  background-color: #15202b; /* Updated to match the tweet background */
  /* ... other existing styles ... */
}

.tweet-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #15202b;
  z-index: 5;
}

.x-logo {
  width: 30px;
  height: 30px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-bottom: 15px;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #ffffff;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Ensure the Tweet component is hidden until loaded */
:deep(.tweet) {
  opacity: 0;
  transition: opacity 0.3s ease;
}

:deep(.tweet.loaded) {
  opacity: 1;
}
</style>