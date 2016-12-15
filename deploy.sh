#!/bin/bash
cd `dirname $0`

rm -rf public

# Extract the package
tar -xzf package.tgz
rm package.tgz

