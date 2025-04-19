module.exports = {
  apps: [{
    name: 'dev-app',
    script: './/src/app.ts',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
};