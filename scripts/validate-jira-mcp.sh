#!/usr/bin/env bash
set -euo pipefail

required_vars=(ATLASSIAN_URL ATLASSIAN_USERNAME ATLASSIAN_API_TOKEN ATLASSIAN_EMAIL)
missing=()
for var in "${required_vars[@]}"; do
  if [[ -z "${!var:-}" ]]; then
    missing+=("$var")
  fi
done

if [[ ${#missing[@]} -gt 0 ]]; then
  echo "Missing environment variables: ${missing[*]}"
  echo "Set them before using the Jira MCP server."
  exit 1
fi

echo "Jira MCP environment variables are present."
echo "ATLASSIAN_URL=${ATLASSIAN_URL}"
echo "ATLASSIAN_USERNAME=${ATLASSIAN_USERNAME}"
echo "ATLASSIAN_EMAIL=${ATLASSIAN_EMAIL}"
echo "ATLASSIAN_API_TOKEN=<set>"
