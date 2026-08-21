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

## Docker Images

Starting with **v1.44.0**, every published `rotki/rotki` image carries two pieces of supply chain metadata: a **provenance attestation** linking the image back to the commit and workflow that built it, and an **SBOM** listing what went into it.

> [!WARNING]
> Images published before v1.44.0 have neither, and verification against them fails with "no attestation found". That means the image predates the feature, not that it has been tampered with. The `nightly` and `edge` tags carry an SBOM but are deliberately not attested.

### Verify provenance with the GitHub CLI

```sh
gh attestation verify oci://docker.io/rotki/rotki:v1.44.0 --repo rotki/rotki
```

Expected output:

```
Loaded digest sha256:... for oci://docker.io/rotki/rotki:v1.44.0
Loaded 1 attestation from GitHub API
✓ Verification succeeded!

sha256:... was attested by:
REPO         PREDICATE_TYPE                  WORKFLOW
rotki/rotki  https://slsa.dev/provenance/v1  .github/workflows/rotki_release.yaml@refs/tags/v1.44.0
```

### Verify provenance with cosign

The attestation is also stored next to the image in the registry, so you can verify it without the GitHub CLI:

```sh
cosign verify-attestation --type slsaprovenance1 \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  --certificate-identity-regexp '^https://github.com/rotki/rotki/' \
  docker.io/rotki/rotki:v1.44.0
```

Both commands check the same signature. You do not need to run both.

The signing is keyless: the attestation is signed with a short-lived certificate minted from the build job's identity, so there is no long-lived public key to distribute or rotate.

### Inspect the SBOM

```sh
docker buildx imagetools inspect docker.io/rotki/rotki:v1.44.0 --format '{{json .SBOM}}'
```

> [!NOTE]
> The SBOM is a partial inventory, not a complete dependency list. It records roughly 41 packages per platform, mostly Python packages plus the base image's own. rotki's full dependency set is far larger, and none of the Rust crates appear at all, because those are linked statically and the Python bundler only preserves metadata for some packages. For the authoritative dependency list, read `uv.lock` and `Cargo.lock` at the matching tag.
