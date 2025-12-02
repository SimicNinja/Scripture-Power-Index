export default
{
  server: {
    proxy: {
      '/api': {
        target: 'https://api.nephi.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
};
