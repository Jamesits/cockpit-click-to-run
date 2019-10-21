A simple dashboard to click and run executables and scripts.

## Usage

### Installation

Install dependencies:

```shell
yum install cockpit
```

Then go to [releases](https://github.com/Jamesits/cockpit-click-to-run/releases/latest) to get the latest package and then `rpm -i *.rpm` it.

Start cockpit service:

```shell
systemctl enable --now cockpit
```

Allow cockpit through the firewall:

```shell
firewall-cmd --zone=public --add-service=cockpit --permanent
systemctl restart firewalld
```

### Usage

Launch the dashboard at `https://your-server-address:9090/click-to-run`. Login with your user credential.

The dashboard scans all executable files in `~/scripts`. To start with an example:

```shell
mkdir ~/scripts
cd ~/scripts
cat > test.sh <<EOF
#!/bin/bash
echo 123
sleep 2
echo 456
EOF
chmod +x test.sh
```

Refresh the dashboard, and you will see a button for `test.sh`. Click it to run.

## Development

Use CentOS 7 as a base OS.

### dev environment

```shell
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

```shell
make clean
npm ci
npm run eslint
npm run eslint:fix
make check
make rpm
```
