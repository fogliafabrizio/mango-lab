export const environment = {
  production: true,
  apiUrls: {
    backend: 'http://localhost:8080/actuator/health',
    database: 'http://localhost:8080/test/status/db',
    storage: 'http://localhost:8080/test/status/storage',
    insert: 'http://localhost:8080/test/db/insert',
    upload: 'http://localhost:8080/test/storage/upload',
    list: 'http://localhost:8080/test/storage/list',
  },
};
