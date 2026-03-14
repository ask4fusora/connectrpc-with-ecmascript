# Pull Request Template

Thank you for contributing to Connect RPC with ECMAScript! Please follow this template to ensure your pull request can be reviewed efficiently.

## Description

<!-- 
Please provide a brief description of the changes in this PR.
Include the motivation for the changes and what problem they solve.
-->

### Type of Change

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] ⚠️ Breaking change (fix or feature that would cause existing functionality to change)
- [ ] 📝 Documentation update
- [ ] ♻️ Code refactoring
- [ ] 🔧 Configuration change
- [ ] ✅ Test update
- [ ] 🔒 Security update

## Checklist

### General

- [ ] I have read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines
- [ ] I have followed the code style guidelines enforced by the project
- [ ] My changes generate no new linting errors or warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules

### Documentation

- [ ] I have updated the README(s) affected by my changes
- [ ] I have added docstrings to my code changes where applicable
- [ ] I have updated the API documentation if my changes affect the public API
- [ ] I have added inline comments for complex logic where applicable

### Testing

- [ ] Unit tests have been added/updated for new functionality
- [ ] Integration tests have been added/updated if applicable
- [ ] E2E tests have been added/updated if applicable
- [ ] All tests pass in the CI pipeline

### Security

- [ ] I have ensured no sensitive data is exposed in my changes
- [ ] I have validated input validation is properly implemented
- [ ] I have followed secure coding best practices

## Related Issues

<!-- 
Link to any related issues using one of:
- Fixes #123
- Related to #123
- Closes #123
-->

Fixes #
Related to #

## Changes Summary

<!-- 
Please provide a concise summary of the changes made in this PR:
- What was changed?
- Why was it changed?
- How was it changed?
-->

### Files Changed

| File | Change Description |
|------|-------------------|
| | |

### Migration Notes

<!-- 
If this PR contains breaking changes, provide migration instructions:
-->

## Testing Instructions

<!-- 
Provide instructions on how to test the changes in this PR:
-->

### Prerequisites

```bash
# Install dependencies
bun install

# Generate proto code
buf generate
```

### Run Tests

```bash
# Backend tests
cd backend/nestjs-fastify-platform && bun run test
cd backend/vanilla && bun run test

# Frontend tests
cd frontend && bun run test

# Run all tests
task test
```

### Manual Testing

<!-- 
Provide steps for manual testing if applicable:
-->

1. 
2. 
3. 

## Additional Context

<!-- 
Add any other context about the PR here:
- Screenshots (if UI changes)
- Links to external documentation
- Performance considerations
- Backward compatibility concerns
-->

---

## Reviewer Notes

<!-- 
For reviewers: any specific areas to focus on or concerns to address:
-->

### Areas to Review

- 
- 

### Questions for Reviewer

- 
- 

---

*By submitting this pull request, I confirm that my contribution is made under the terms of the project's license.*
