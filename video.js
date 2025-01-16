document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('portfolio-video');
  
  // Optimize video playback
  video.addEventListener('loadedmetadata', () => {
    // Set video quality
    if (video.canPlayType('video/mp4')) {
      try {
        // Request 60fps playback if supported
        video.playbackRate = 1.0;
        video.mozPreservesPitch = false;
        video.preservesPitch = false;
      } catch (e) {
        console.log('Advanced playback features not supported');
      }
    }
  });

  // Preload video when it's close to viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.preload = 'auto';
        video.load();
        observer.unobserve(video);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.1
  });

  observer.observe(video);

  // Handle video playback
  let playPromise;
  
  video.addEventListener('play', () => {
    playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Auto-play was prevented:', error);
      });
    }
  });

  // Optimize performance when video is not visible
  const playbackObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        video.pause();
      }
    });
  }, {
    threshold: 0
  });

  playbackObserver.observe(video);
});