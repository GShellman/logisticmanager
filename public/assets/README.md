# Assets

Legacy raster assets are not committed as binary files because the review system does not support binary diffs. Run:

```sh
npm run assets
```

This decodes the immutable legacy reference into normal files under `public/assets/legacy/` and writes `public/assets/legacy/manifest.json` with hashes and source line metadata. The extraction is deterministic and validation checks the generated files.
