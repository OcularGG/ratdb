export const triggerNetlifyBuild = async () => {
  try {
    await fetch('https://api.netlify.com/build_hooks/YOUR_UNIQUE_HOOK_ID', {
      method: 'POST',
    });
    console.log('Build triggered successfully');
  } catch (error) {
    console.error('Error triggering build:', error);
  }
};