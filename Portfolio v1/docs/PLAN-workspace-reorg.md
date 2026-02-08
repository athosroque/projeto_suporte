# PLAN: Workspace Reorganization (v1, v2, etc.)

## Overview
Organize the current root-level project into a subfolder named `v1` and prepare a standardized structure for subsequent projects (`v2`, `v3`, etc.) within the `Projetos` root directory.

## Success Criteria
- [ ] Current project moved to `v1/` without losing history or functionality.
- [ ] GitHub Actions updated to deploy from the new `v1` location.
- [ ] Root directory cleaned up, keeping only shared configs (original files) or documentation.
- [ ] Standardized template ready for `v2/`.

## Tech Stack
- **Git:** Version control (Root or Subfolder per project?)
- **Azure Static Web Apps:** CI/CD for deployments.
- **Node.js/Python:** (Inherited from SupportSync AI).

## Proposed File Structure
```plaintext
Projetos/
├── .github/          # Shared CI/CD or Root repo config
├── docs/             # Planning and technical documentation
│   └── PLAN-workspace-reorg.md
├── v1/               # Current Project (SupportSync AI)
│   ├── .agent/
│   ├── api/
│   ├── client/
│   └── staticwebapp.config.json
└── v2/               # Future Project (Placeholder/Skeleton)
```

## Socratic Gate (Clarifications needed)
1. **Repository Structure:** Should `Projetos/` remain a single Git repository for all versions, or should `v1` and `v2` be independent Git repos?
2. **Deployment Scope:** Should the current Azure Static Web App site only serve `v1`, or do you want a landing page at the root to navigate between `v1` and `v2`?
3. **Common Configs:** Do you want to share the `.agent` configuration across all projects (v1, v2) or should each have its own kit?

## Phase Breakdown
### Phase 1: Migration
- Move `api`, `client`, `.agent` to `v1/`.
- Adjust workflow paths in `.github/workflows/`.

### Phase 2: Orchestration for v2
- Create skeleton for `v2/`.
- Define how agents will detect which project they are currently working on.

## Verification Checklist
- [ ] `v1` opens correctly in local browser via subdirectory path.
- [ ] GitHub push triggers build using new paths.
- [ ] `v2` folder is accessible and ready for `/create`.
