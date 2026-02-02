import app from './app';
import { env } from './config/env';

const startServer = async () => {
  try {
    // await prisma.$connect();
    // console.log('✅ Database connected');

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`);
    });
  } catch (error: any) {
    console.error('❌ Server failed to start:', error.message);
    process.exit(1);
  }
};

startServer();
