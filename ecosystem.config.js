module.exports = {
  apps: [
    {
      name: "frontend",
      cwd: "./app",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
      },
      watch: false,
      error_file: "../logs/frontend-err.log",
      out_file: "../logs/frontend-out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
