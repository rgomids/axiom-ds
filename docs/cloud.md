# Codex and Cloud

Both environments consume AGENTS.md as the only shared engineering-policy source.
No runtime-specific rule file is required. Use Node 22.16+, npm ci and
npm run validate on Windows, Linux or Cloud; CI runs those same commands.

Bootstrap validation needs no browser, production data or secrets. Network
access is required for npm installation. Only explicitly authorized remote
operations need GitHub credentials. Keep all machine-specific configuration
outside version control.
