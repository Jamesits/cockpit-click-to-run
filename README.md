
### dev environment

```
# install node
yum install -y gcc-c++ make rpm-build
curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -

# clone
git clone https://github.com/Jamesits/cockpit-click-to-run.git
cd cockpit-click-to-run
npm install
make
mkdir -p ~/.local/share/cockpit
ln -s `pwd`/dist ~/.local/share/cockpit/starter-kit
make watch
```

### release

```
make clean
npm ci
npm run eslint
npm run eslint:fix
make check
make rpm
```
