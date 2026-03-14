## Description

<!-- Describe the motivation and context for these changes. What problem does it solve? -->

## Related Issues

<!-- Link any related issues here (e.g., "Fixes #123", "Resolves #456") -->

## Type of Change

- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] ♻️ Refactoring / Tech debt
- [ ] 📝 Documentation
- [ ] ⚠️ Breaking change (modifies `.proto` schemas or existing RPC contracts)

## Verification / Testing

<!-- How did you test these changes? Provide steps so the reviewer can verify. -->
<!-- e.g., "Ran the Next.js frontend against the NestJS backend and verified the counter increments." -->

## Checklist

- [ ] I have run `buf generate` if any `.proto` schemas were modified.
- [ ] I have verified my changes against both the **NestJS** and **Vanilla** backends (if
      applicable).
- [ ] I have ensured the frontend correctly fetches data via `@connectrpc/connect-web` or RSCs.
- [ ] My code follows the existing formatting and linting rules (e.g., via Biome).
