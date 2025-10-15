# Nexus Platform Observability Configuration

## Overview

This directory contains monitoring, logging, and alerting configurations for the Nexus Platform. The observability stack includes:

- **Application Monitoring**: Sentry for error tracking and performance monitoring
- **Infrastructure Monitoring**: Prometheus for metrics collection
- **Alerting**: AlertManager for notification routing
- **Visualization**: Grafana for dashboards and alerting

## Directory Structure

```
devops/observability/
├── sentry/
│   ├── config.yml          # Sentry configuration
│   └── releases/           # Release tracking
├── prometheus/
│   ├── prometheus.yml      # Prometheus configuration
│   ├── rules.yml          # Alerting rules
│   └── targets/           # Service discovery
├── grafana/
│   ├── dashboards/        # Grafana dashboard JSON files
│   └── provisioning/      # Data source configurations
└── alerts/
    ├── templates/         # Alert notification templates
    └── channels.yml       # Alert routing configuration
```

## Quick Start

### 1. Sentry Setup

```bash
# Install Sentry CLI
npm install -g @sentry/cli

# Configure Sentry project
sentry-cli login
sentry-cli projects create nexus-platform
```

### 2. Prometheus Setup

```bash
# Start Prometheus
docker run -d \
  -p 9090:9090 \
  -v $(pwd)/devops/observability/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus
```

### 3. Grafana Setup

```bash
# Start Grafana
docker run -d \
  -p 3000:3000 \
  grafana/grafana
```

## Application Integration

### Backend (Node.js/TypeScript)

```typescript
// backend/src/lib/observability.ts
import * as Sentry from '@sentry/node'
import { collectDefaultMetrics, register } from 'prom-client'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
})

// Prometheus metrics
collectDefaultMetrics()

export { Sentry, register }
```

### Frontend (Next.js)

```typescript
// frontend/lib/sentry.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
})
```

## Key Metrics to Monitor

### Application Metrics

- Response time (p50, p95, p99)
- Error rate by endpoint
- Database query performance
- Cache hit/miss ratios
- User session duration

### Business Metrics

- Daily active users
- Language view counts
- Bookmark conversion rate
- Testimonial submission rate
- Admin action frequency

### Infrastructure Metrics

- CPU usage
- Memory usage
- Disk I/O
- Network traffic
- Database connections

## Alerting Rules

### Critical Alerts

- Application down (5xx errors > 5%)
- Database connection failures
- High memory usage (> 90%)
- Disk space low (< 10% free)

### Warning Alerts

- Response time degradation (> 2s p95)
- Error rate increase (> 1%)
- High CPU usage (> 80%)

## Dashboards

### Application Dashboard

- Request rate and latency
- Error rates by service
- Database performance
- Cache effectiveness

### Business Dashboard

- User engagement metrics
- Feature usage statistics
- Conversion funnels
- Geographic distribution

### Infrastructure Dashboard

- System resource usage
- Network performance
- Service health status
- Alert summary

## Log Aggregation

### Structured Logging

```typescript
// Use consistent log format
logger.info('User action', {
  userId: '123',
  action: 'bookmark_language',
  languageId: 'kotlin',
  timestamp: new Date().toISOString(),
  userAgent: req.get('User-Agent'),
  ip: req.ip,
})
```

### Log Levels

- ERROR: Application errors, failed requests
- WARN: Deprecated features, performance issues
- INFO: User actions, important state changes
- DEBUG: Detailed debugging information

## Incident Response

### Alert Response Process

1. **Alert Received**: Check dashboard for symptoms
2. **Triage**: Determine severity and impact
3. **Investigate**: Review logs and metrics
4. **Mitigate**: Apply temporary fixes if needed
5. **Resolve**: Deploy permanent fix
6. **Post-mortem**: Document root cause and prevention

### Escalation Matrix

- **Level 1**: On-call engineer (15 minutes)
- **Level 2**: Engineering lead (30 minutes)
- **Level 3**: CTO/Engineering manager (1 hour)

## Maintenance

### Regular Tasks

- Review and update alerting thresholds quarterly
- Archive old logs and metrics monthly
- Update monitoring configurations with deployments
- Conduct chaos engineering exercises quarterly

### Security Considerations

- Encrypt sensitive log data
- Implement log retention policies
- Monitor for security-related events
- Regular security audits of monitoring infrastructure
