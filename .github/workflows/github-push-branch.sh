#!/bin/bash
set -euxo pipefail

cd `git rev-parse --show-toplevel`/b_source
make theme
make build
make git-add
