# Contributing to Xpander SDK

🚀 **Thanks for your interest in contributing to the Xpander SDK!**  
This project powers the development of intelligent AI Agents and we're excited to have your help making it even better.

---

## ⚙️ Project Setup

### Prerequisites

- **Node.js v22+** (use `nvm` or `asdf` if needed)
- **Yarn** (via `corepack enable` or install manually)
- **Projen** (`npm install -g projen`)
- GitHub account + fork/clone access

---

### Getting Started

```bash
git clone https://github.com/xpanderai/xpander-sdk.git
cd xpander-sdk
yarn install
````

To configure the project:

```bash
projen  # generates configs and tooling
```

---

## 🔁 Development Workflow

### Building the Project

```bash
projen build
```

This command transpiles the TypeScript source and ensures the output is up-to-date.

### Running Tests

```bash
projen test
```

All contributions **must** include tests and pass existing ones.

To run tests manually:

```bash
jest
```

---

## 🧼 Code Style & Linting

Run:

```bash
projen lint
```

This uses `eslint`, `prettier`, and other checks configured via Projen.

Fix issues automatically:

```bash
yarn eslint src/ --fix
yarn prettier --write .
```

---

## ✅ Branch and Commit Conventions

To ensure consistency and clarity across all contributions, please follow this naming convention.

### Branch Naming Convention

Start new branches from `develop` (or `main` if no `develop` exists). Format:

```
{fix|feature|chore}/develop/{ticket-number}
```

Examples:

* `feature/develop/RDT-101`: Adds new functionality
* `fix/develop/RDT-102`: Fixes a bug
* `chore/develop/RDT-103`: Code cleanup or dependencies

---

### Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/) with ticket references.

```
{fix|feat|chore}({ticket-number}): clear explanation
```

Examples:

* `fix(RDT-102): resolve agent desync on state replay`
* `feat(RDT-105): add Gemini tool schema support`
* `chore(RDT-103): update dependencies and refactor imports`

---

## 🔄 Continuous Integration

CI is handled automatically via **GitHub Actions**:

* Linting
* Tests
* Build verification

Simply push your branch or open a PR—checks will run automatically.

---

## 🚀 Submitting a Pull Request

1. Fork the repo
2. Create a feature branch from `develop` (or `main`)
3. Make your changes
4. Run `projen build` and `projen test`
5. Follow branch + commit naming conventions
6. Push and open a pull request

Please include in your PR:

* A summary of what you changed and why
* Any related issue or ticket IDs
* Screenshots/logs (if relevant)
* Optional: test plan or verification steps

---

## 🤝 Code of Conduct

We adhere to the [Contributor Covenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/).
Please treat others with respect and help maintain an inclusive community.

---

## 📫 Questions?

Feel free to reach out:

📧 **[opensource@xpander.ai](mailto:opensource@xpander.ai)**
📘 [Official Docs](https://docs.xpander.ai)

---

💜 Thank you for helping shape the future of AI Agent development!