import app from './app';

const startServer = async () => {
  try {
    app.listen(Number(5000), () => {
      console.log(`🚀 Server running on port 5000`);
    });
  } catch (error: any) {
    console.error('❌ Server failed to start:', error.message);
  }
};

startServer();
