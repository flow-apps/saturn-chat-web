module.exports = {
  reactStrictMode: true,
  // images: {
  //   domains: ["192.168.0.108", "storage.googleapis.com/saturn-chat-618e5.appspot.com"]
  // }

  images: {
    remotePatterns: [
      new URL("http://192.168.0.108"),
      new URL("https://storage.googleapis.com/saturn-chat-618e5.appspot.com"),
      new URL("https://saturnchat.azurewebsites.net/")
    ],
  },
};
