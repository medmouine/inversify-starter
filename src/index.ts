import { logger } from '@/logger';
import * as config from 'config';
import 'reflect-metadata';
import { Server } from './app';
import './routes/helloWorldRoute';

// create http server
export const app = Server.bootstrap().app;
export const server = app.listen(config.get('port'));
logger.info(`listening on port ${config.get('port')}`);
