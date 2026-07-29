# Keep Render Free Backend Alive with Supabase Cron

## Overview

Render Free Web Services can spin down after a period of inactivity. This causes a cold start when the next request arrives.

A simple solution is to use **Supabase Free + `pg_cron` + `pg_net`** to periodically send an HTTP request to a lightweight health endpoint on the Render backend.

This keeps regular inbound traffic going to the Render service and helps reduce cold starts caused by inactivity.

> **Note:** This is a keep-alive workaround, not a guarantee that a Render Free service will never restart or sleep. Render may still restart services for other reasons.

---

## Architecture

```text
┌──────────────────────────────┐
│        Supabase Free         │
│                              │
│          pg_cron             │
│       every 10 minutes       │
└──────────────┬───────────────┘
               │
               │ HTTP GET
               │
               ▼
┌──────────────────────────────┐
│         Render Free          │
│                              │
│       GET /health            │
│                              │
│        Backend API           │
└──────────────────────────────┘
```

The flow is:

```text
Supabase Cron
     │
     │ every 10 minutes
     ▼
GET https://your-backend.onrender.com/health
     │
     ▼
Render Backend
     │
     ▼
HTTP 200 OK
```

---

# 1. Requirements

You need:

- A Supabase project
- A Render Web Service
- A backend deployed on Render
- A public `/health` endpoint
- Supabase `pg_cron`
- Supabase `pg_net`

No additional server is required.

You do **not** need:

- AWS Lambda
- GitHub Actions
- UptimeRobot
- Supabase Edge Functions

---

# 2. Create a Health Endpoint

Create a lightweight endpoint in your backend.

## Express

```js
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});
```

The endpoint should return:

```json
{
  "status": "ok",
  "timestamp": "2026-07-29T00:00:00.000Z"
}
```

For a simple keep-alive endpoint, keep the implementation lightweight.

---

# 3. Important: Do Not Require Authentication

The Supabase Cron request must be able to access `/health`.

If your application uses authentication middleware, register `/health` before it.

Correct:

```js
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use(authMiddleware);
```

Avoid:

```js
app.use(authMiddleware);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
```

Otherwise, the cron request may receive:

```text
401 Unauthorized
```

---

# 4. Deploy the Backend to Render

Assume your Render backend URL is:

```text
https://your-backend.onrender.com
```

Then your health endpoint is:

```text
https://your-backend.onrender.com/health
```

Test it before configuring Supabase.

## Browser

Open:

```text
https://your-backend.onrender.com/health
```

## cURL

```bash
curl https://your-backend.onrender.com/health
```

Expected response:

```json
{
  "status": "ok"
}
```

The endpoint must return HTTP status:

```text
200 OK
```

---

# 5. Enable Supabase Extensions

Open your Supabase project.

Go to:

```text
Supabase Dashboard
→ Project
→ Database
→ Extensions
```

Enable:

```text
pg_cron
pg_net
```

## Purpose

### `pg_cron`

Schedules jobs using cron expressions.

Example:

```text
*/10 * * * *
```

### `pg_net`

Allows PostgreSQL/Supabase to make HTTP requests.

The combination is:

```text
pg_cron
   │
   │ schedule
   ▼
pg_net
   │
   │ HTTP request
   ▼
Render /health
```

---

# 6. Create the Cron Job

Open:

```text
Supabase Dashboard
→ SQL Editor
```

Run:

```sql
select cron.schedule(
  'ping-render-backend',
  '*/10 * * * *',
  $$
    select net.http_get(
      url := 'https://your-backend.onrender.com/health'
    );
  $$
);
```

Replace:

```text
https://your-backend.onrender.com/health
```

with your real Render health endpoint.

---

# 7. Cron Schedule Explanation

The schedule:

```text
*/10 * * * *
```

means:

```text
Every 10 minutes
```

Example:

```text
00:00
00:10
00:20
00:30
00:40
00:50
01:00
01:10
...
```

Cron format:

```text
┌──────── minute (0 - 59)
│ ┌────── hour (0 - 23)
│ │ ┌──── day of month (1 - 31)
│ │ │ ┌── month (1 - 12)
│ │ │ │ ┌ day of week (0 - 6)
│ │ │ │ │
* * * * *
```

For this solution:

```text
*/10 * * * *
```

means:

```text
Every 10 minutes
Every hour
Every day
Every month
Every day of week
```

---

# 8. Why Use 10 Minutes?

If the Render Free service can become idle after a period without inbound traffic, using a 10-minute interval gives some buffer.

Recommended:

```text
*/10 * * * *
```

Instead of:

```text
*/15 * * * *
```

The idea is:

```text
10 minutes
    ↓
Request reaches Render
    ↓
Service receives inbound traffic
    ↓
Idle timer is reset
```

Using 10 minutes instead of exactly the idle threshold also gives some tolerance for scheduling and network delays.

---

# 9. Verify the Cron Job

After creating the job, check the registered cron jobs:

```sql
select *
from cron.job;
```

You should see something similar to:

```text
jobname
----------------------
ping-render-backend
```

You can also inspect the schedule:

```sql
select
  jobid,
  jobname,
  schedule,
  active
from cron.job;
```

Expected:

```text
jobname              schedule          active
-------------------  ----------------  ------
ping-render-backend  */10 * * * *      true
```

---

# 10. Check Cron Execution History

Use:

```sql
select *
from cron.job_run_details
order by start_time desc
limit 20;
```

Check:

- `status`
- `start_time`
- `end_time`
- `return_message`

A successful run should show:

```text
status
---------
succeeded
```

If you see errors, inspect `return_message`.

---

# 11. Check Render Logs

Open:

```text
Render Dashboard
→ Your Web Service
→ Logs
```

You should see requests to:

```text
GET /health
```

Example:

```text
GET /health 200
GET /health 200
GET /health 200
```

This confirms that Supabase is reaching the Render backend.

---

# 12. Recommended Health Endpoint

For keep-alive purposes, the simplest endpoint is:

```js
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
```

Avoid doing expensive operations:

```js
app.get("/health", async (req, res) => {
  // Avoid unnecessary database queries
  // Avoid external API calls
  // Avoid expensive calculations

  res.status(200).json({
    status: "ok",
  });
});
```

The goal is only:

```text
Request
  ↓
Backend receives request
  ↓
HTTP 200
```

---

# 13. Health Check vs Readiness Check

It can be useful to separate two concepts.

## Liveness

```text
GET /health
```

Purpose:

```text
Is the backend process running?
```

Example:

```json
{
  "status": "ok"
}
```

## Readiness

```text
GET /health/ready
```

Purpose:

```text
Is the backend ready to use its dependencies?
```

Example:

```json
{
  "status": "ok",
  "database": "connected",
  "redis": "connected"
}
```

For the Render keep-alive cron, use:

```text
GET /health
```

because it should be lightweight.

---

# 14. Security

The `/health` endpoint should not expose sensitive information.

## Good

```json
{
  "status": "ok"
}
```

## Bad

```json
{
  "status": "ok",
  "database_url": "...",
  "jwt_secret": "...",
  "api_key": "...",
  "environment_variables": "..."
}
```

Never return:

- Database credentials
- JWT secrets
- API keys
- Environment variables
- User information
- Internal tokens
- Private configuration

---

# 15. Optional: Add a Custom Header

If you want to distinguish the cron request from normal traffic, you can use an HTTP header.

For example:

```text
X-Keep-Alive: true
```

The exact implementation depends on how you configure the Supabase HTTP request.

This is optional.

For a public `/health` endpoint, you generally do not need authentication just for the keep-alive request.

---

# 16. Troubleshooting

## 16.1 Cron Job Does Not Execute

Check:

```sql
select *
from cron.job;
```

Then:

```sql
select *
from cron.job_run_details
order by start_time desc
limit 20;
```

Make sure the job is active:

```text
active = true
```

---

## 16.2 Render Returns 404

Test:

```bash
curl https://your-backend.onrender.com/health
```

If you receive:

```text
404 Not Found
```

make sure the endpoint is registered correctly.

For Express:

```js
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
```

---

## 16.3 Render Returns 401

If you get:

```text
401 Unauthorized
```

your `/health` route is probably behind authentication.

Move it before your authentication middleware:

```js
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use(authMiddleware);
```

---

## 16.4 Render Returns 500

Check Render logs.

Make sure `/health` does not unnecessarily depend on:

- MongoDB
- PostgreSQL
- Redis
- External APIs
- Other services

Prefer:

```js
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
```

---

## 16.5 Supabase Cron Succeeds but Render Does Not Receive Requests

Check:

1. Render URL
2. `/health` path
3. HTTPS
4. Render logs
5. `cron.job_run_details`
6. `return_message`

Test manually:

```bash
curl -i https://your-backend.onrender.com/health
```

Expected:

```text
HTTP/2 200
```

---

# 17. Delete the Cron Job

If you no longer need the keep-alive job:

```sql
select cron.unschedule('ping-render-backend');
```

Then verify:

```sql
select *
from cron.job;
```

The job should no longer appear.

---

# 18. Complete Backend Example

Example Express application:

```js
import express from "express";

const app = express();

app.use(express.json());

// Health endpoint
// Keep this before authentication middleware.
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

// Authentication middleware
app.use(authMiddleware);

// Application routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

# 19. Complete Supabase SQL

Replace the URL with your Render backend URL.

```sql
-- Create Render keep-alive cron job
select cron.schedule(
  'ping-render-backend',
  '*/10 * * * *',
  $$
    select net.http_get(
      url := 'https://your-backend.onrender.com/health'
    );
  $$
);
```

Check job:

```sql
select
  jobid,
  jobname,
  schedule,
  active
from cron.job;
```

Check execution:

```sql
select
  jobid,
  job_pid,
  database,
  username,
  command,
  status,
  return_message,
  start_time,
  end_time
from cron.job_run_details
order by start_time desc
limit 20;
```

Delete job:

```sql
select cron.unschedule('ping-render-backend');
```

---

# 20. Final Architecture

```text
                         SUPABASE FREE
                    ┌─────────────────────┐
                    │                     │
                    │       pg_cron       │
                    │                     │
                    │   */10 * * * *      │
                    │                     │
                    └──────────┬──────────┘
                               │
                               │ pg_net
                               │
                               │ HTTP GET
                               ▼
                    ┌─────────────────────┐
                    │                     │
                    │    Render Free       │
                    │                     │
                    │  GET /health        │
                    │                     │
                    │    Backend API      │
                    │                     │
                    └──────────┬──────────┘
                               │
                               ▼
                           HTTP 200
```

---

# 21. Final Setup

Project structure:

```text
my-project/
├── docs/
│   ├── setup-docker.md
│   ├── redis-guide.md
│   ├── keycloak-integration.md
│   └── keep-render-alive.md
```

The complete solution is:

```text
Supabase Free
    │
    ├── pg_cron
    │
    ├── */10 * * * *
    │
    └── pg_net
            │
            │ GET /health
            ▼
Render Free
    │
    └── Backend
            │
            └── HTTP 200
```

---

# 22. Checklist

Use this checklist when setting up the solution:

- [ ] Backend deployed to Render
- [ ] `/health` endpoint created
- [ ] `/health` returns HTTP 200
- [ ] `/health` does not require authentication
- [ ] `pg_cron` enabled in Supabase
- [ ] `pg_net` enabled in Supabase
- [ ] Cron job created
- [ ] Schedule set to `*/10 * * * *`
- [ ] Render URL configured correctly
- [ ] `cron.job` checked
- [ ] `cron.job_run_details` checked
- [ ] Render logs show `GET /health`
- [ ] No sensitive data exposed by `/health`

---

# 23. Important Notes

This setup is intended for development, hobby projects, and low-traffic applications.

It should not be treated as a replacement for production infrastructure.

The keep-alive request can reduce idle-related cold starts, but it does not guarantee that a Render Free service will never restart, sleep, or become unavailable.

For production workloads, use an appropriate paid hosting plan or infrastructure designed for continuous availability.

---

## References

- Supabase Cron: https://supabase.com/docs/guides/cron
- Supabase `pg_net`: https://supabase.com/docs/guides/database/extensions/pg_net
- Render Free Web Services: https://render.com/docs/free
