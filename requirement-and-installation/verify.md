---
description: Verify the integrity and authenticity of rotki binaries using SHA512 checksums and GitHub Artifact Attestations.
---

# Verify Your Download

Verifying your download confirms that the binary you downloaded is the exact file that was built and published by the rotki team. This is optional, but recommended if you want to protect yourself from supply chain attacks or tampered mirrors.

There are two independent ways to verify a rotki binary:

1. **SHA512 checksum** — quick integrity check against a published hash
2. **GitHub Artifact Attestations** — cryptographic proof that the binary was built from the official rotki source on GitHub

You only need to do one of these to trust a binary; doing both gives you the strongest guarantee.

## SHA512 Checksums

Starting with v1.6.2, every rotki binary on the [releases page](https://github.com/rotki/rotki/releases) ships with a matching `.sha512` file. Download both and run the platform-specific command below.

### Linux

```sh
cd ~/Downloads
sha512sum -c rotki-linux_x86_64-vx.x.x.AppImage.sha512
# rotki-linux_x86_64-vx.x.x.AppImage: OK
```

### macOS

```sh
cd ~/Downloads
shasum -a 512 -c rotki-darwin-vx.x.x.dmg.sha512
# rotki-darwin-vx.x.x.dmg: OK
```

### Windows

Open Command Prompt in the download folder and compute the hash:

```sh
cd Downloads
certutil -hashfile rotki-win32-vx.x.x.exe SHA512
```

The output will look like:

```sh
SHA512 hash of rotki-win32-v1.6.2.exe:
a3e0d79724460f642245774ba1af4c7116dfde56503d134c688f406afff5339f70a84a0bdb2556bc0785931b11e2447e3ffcd116cdec9e8a50382ec0165788b4
CertUtil: -hashfile command completed successfully.
```

Open the `.sha512` file with Notepad and confirm the hash matches the one above.

### If the checksum doesn't match

If the hashes don't match, you should see an error similar to:

```sh
rotki-linux_x86_64-vx.x.x.AppImage: FAILED
sha512sum: WARNING: 1 computed checksum did NOT match
```

**Do not run the binary.** Re-download it from the official [releases page](https://github.com/rotki/rotki/releases) and try again.

## Publisher Signature

You can also confirm the publisher by inspecting the binary's digital signature:

- **Windows** — right-click the installer and open **Properties → Digital Signatures**. The signer should be `Rotki Solutions GmbH`.
- **macOS** — right-click the app and choose **Get Info**. The copyright should read `Rotki Solutions GmbH`.

## GitHub Artifact Attestations

rotki uses **GitHub Artifact Attestations** to cryptographically link each released binary back to the commit and workflow that produced it. This provides protection against supply chain attacks by confirming that the binary was genuinely built from the expected repository, commit, and build environment.

You can verify attestations with the [GitHub CLI](https://cli.github.com/manual/gh_attestation_verify):

```sh
gh attestation verify ~/Downloads/rotki134.dmg --repo rotki/rotki
```

Expected output:

```
Loaded digest sha256:12bb7aa1cf8d5b568f925e7c772b946a29efaf66ae030026a1f113da528c8e39 for file:///Users/you/Downloads/rotki134.dmg
Loaded 1 attestation from GitHub API
✓ Verification succeeded!

sha256:12bb7aa1cf8d5b568f925e7c772b946a29efaf66ae030026a1f113da528c8e39 was attested by:
REPO         PREDICATE_TYPE                  WORKFLOW
rotki/rotki  https://slsa.dev/provenance/v1  .github/workflows/rotki_release.yaml@refs/tags/v1.34.0
```

> [!WARNING]
> GitHub artifact attestations will fail for Windows binaries (`rotki-win32_x64-*.exe`) published after August 2025. These binaries are re-signed locally using a hardware key (Yubikey) with an OV Certificate, which causes the binary hash to change after attestation. For Windows binaries after that date, verify that the binary is signed by **Rotki Solutions GmbH** instead.
