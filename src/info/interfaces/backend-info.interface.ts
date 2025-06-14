export interface IBackendInfo {
  name: string;
  version: string;
  description: string;
  author: string;
  environment: 'development' | 'production' | 'test';
  lastUpdated: Date;
  startTime: Date;
  uptime: number;
  nodeVersion: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  apiDocsUrl: string;
  database: IDatabaseInfo;
}

export interface IDatabaseInfo {
  provider: string;
  status: 'connected' | 'disconnected' | 'error';
}

export interface IAppMetadata {
  name: string;
  version: string;
  description: string;
  author: string;
}

export interface ISystemInfo {
  environment: string;
  nodeVersion: string;
  uptime: number;
  startTime: Date;
  status: string;
}

export interface IHealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  database: IDatabaseInfo;
  timestamp: Date;
}
