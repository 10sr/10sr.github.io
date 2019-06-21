title: SSHd Configurations
slug: sshd-configurations
date: 2019-06-22 00:56:18+09:00
type: text

`/etc/ssh/sshd_config`
----------------------

Disable `PasswordAuthentication` and `ChallengeResponseAuthentication` to
disable password authentication.


    Protocol 2
    PermitRootLogin no
    PasswordAuthentication no
    PermitEmptyPasswords no
    ChallengeResponseAuthentication no
    UsePAM no
    RSAAuthentication no
    # do not look up the remote host name: this will improve performance
    UseDNS no


References
----------

* <http://www.kishiro.com/FreeBSD/ssh.html>
* <http://tm.root-n.com/server:sshd:sshd_config>
* https://github.com/10sr/junks/commit/4c2af25e2fee6a9e56ced053fa054ab6c7f69ee9
