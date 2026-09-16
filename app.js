const questionPools = {
  single: [
    { topic: 'WSL 2', text: 'What core feature distinguishes WSL 2 from WSL 1?', options: ['System call translation', 'A real Linux kernel in a utility VM', 'Direct Windows NT API calls', 'Complete absence of a filesystem'], answer: [1], fact: 'WSL 2 runs a genuine Linux kernel inside a lightweight utility VM.' },
    { topic: 'WSL 2', text: 'Which command is used to manually update the WSL 2 custom Linux kernel?', options: ['wsl --update', 'apt update kernel', 'wsl --patch', 'dism /update-wsl'], answer: [0], fact: 'wsl --update updates the Microsoft-built WSL 2 kernel.' },
    { topic: 'WSL 2', text: 'Before installing a Linux distribution, which Windows feature must be enabled alongside WSL?', options: ['Hyper-V Replica', 'Virtual Machine Platform', 'IIS Management Console', 'Active Directory Lightweight Directory Services'], answer: [1], fact: 'Virtual Machine Platform and WSL features are prerequisites.' },
    { topic: 'WSL 2', text: 'Which flag is used with the wsl command to list online available distributions?', options: ['--show-all', '--list --online', '-l -v', '--available'], answer: [1], fact: 'wsl --list --online displays valid installable distributions.' },
    { topic: 'WSL 2', text: 'What command terminates all running WSL instances immediately to free RAM?', options: ['wsl --kill-all', 'wsl --stop', 'wsl --shutdown', 'wsl --clear'], answer: [2], fact: 'wsl --shutdown terminates all active instances.' },
    { topic: 'WSL 2', text: 'How do you back up an entire WSL 2 distribution to a tarball file?', options: ['wsl --export', 'wsl --backup', 'wsl --tar', 'wsl --save'], answer: [0], fact: 'wsl --export creates a tarball backup of the distribution filesystem.' },
    { topic: 'WSL 2', text: 'What command removes a registered WSL distribution instance completely?', options: ['wsl --remove', 'wsl --unregister', 'wsl --delete', 'wsl --purge'], answer: [1], fact: 'wsl --unregister uninstalls the specified distribution.' },
    { topic: 'WSL 2', text: 'Where must the `.wslconfig` file be placed to set resource limits like memory caps?', options: ['C:\\Windows\\System32', 'C:\\Users\\YourName\\.wslconfig', '/etc/wsl.conf', 'C:\\Program Files\\WSL'], answer: [1], fact: '.wslconfig resides in the Windows user profile directory.' },
    { topic: 'WSL 2', text: 'Under what directory path is the Windows C: drive automatically mounted inside WSL 2?', options: ['/c', '/mnt/c', '/windows/c', '/media/c'], answer: [1], fact: 'WSL 2 automatically mounts Windows drives under /mnt/.' },
    { topic: 'WSL 2', text: 'What command launches VS Code directly from the current WSL directory?', options: ['code .', 'vscode-server', 'code-wsl .', 'open-vs .'], answer: [0], fact: 'The `code .` command invokes the VS Code server for WSL.' },
    { topic: 'WSL 2', text: 'Which feature allows running Linux GUI apps seamlessly on a Windows desktop without a third-party X server?', options: ['Xming', 'WSLg', 'Cygwin', 'WinX11'], answer: [1], fact: 'WSLg (WSL GUI) provides built-in X11 and Wayland support.' },
    { topic: 'VIRTUALBOX', text: 'What is the minimum recommended RAM size for a Windows Server 2022 VirtualBox VM in our labs?', options: ['1024 MB', '2048 MB', '4096 MB', '8192 MB'], answer: [2], fact: 'Windows Server 2022 requires at least 4GB (4096 MB) of RAM.' },
    { topic: 'VIRTUALBOX', text: 'What virtual disk file type is standard for VirtualBox?', options: ['VHD', 'VDI', 'VMDK', 'QCOW2'], answer: [1], fact: 'VDI stands for VirtualBox Disk Image.' },
    { topic: 'VIRTUALBOX', text: 'Why should you install VirtualBox Guest Additions on a VM?', options: ['To enable clipboard sharing and dynamic screen resizing', 'To increase the physical CPU clock speed', 'To bypass Windows activation', 'To convert the VM into a Type-1 hypervisor'], answer: [0], fact: 'Guest Additions provide essential drivers for integration features.' },
    { topic: 'VIRTUALBOX', text: 'Which VirtualBox menu option lets you save a point-in-time state of your VM?', options: ['Machine -> Take Snapshot', 'File -> Export Appliance', 'Devices -> Insert State', 'Help -> Backup'], answer: [0], fact: 'Snapshots are managed via the Machine menu.' },
    { topic: 'VIRTUALBOX', text: 'Which VirtualBox networking mode hides the VM behind the host using translation, preventing direct inbound host access?', options: ['Bridged Adapter', 'Internal Network', 'NAT', 'Host-Only'], answer: [2], fact: 'NAT maps outbound traffic but hides the VM from inbound access.' },
    { topic: 'VIRTUALBOX', text: 'Which networking mode creates a private LAN strictly between VMs with no internet or host connection?', options: ['NAT', 'Internal Network', 'Bridged Adapter', 'Generic Driver'], answer: [1], fact: 'Internal Network isolates communication strictly between participating VMs.' },
    { topic: 'VIRTUALBOX', text: 'Which networking mode makes a VM act like a physical machine directly on your physical router LAN?', options: ['NAT', 'Bridged Adapter', 'Internal Network', 'NAT Network'], answer: [1], fact: 'Bridged Adapter bridges the virtual NIC to the physical network card.' },
    { topic: 'WINDOWS SERVER', text: 'Which Windows Server 2022 installation option includes the standard graphical user interface?', options: ['Server Core', 'Desktop Experience', 'Nano Server', 'CLI Mode'], answer: [1], fact: 'Desktop Experience provides the full graphical shell.' },
    { topic: 'WINDOWS SERVER', text: 'What is the name of the legacy text-based menu utility used for quick configuration on Windows Server?', options: ['netsh', 'sconfig', 'winmsd', 'sysdm.cpl'], answer: [1], fact: 'sconfig provides a text menu for hostname, IP, and updates.' },
    { topic: 'WINDOWS SERVER', text: 'What PowerShell cmdlet is used to rename a computer?', options: ['Set-ComputerName', 'Rename-Computer', 'Update-HostName', 'Change-Name'], answer: [1], fact: 'Rename-Computer alters the host name.' },
    { topic: 'WINDOWS SERVER', text: 'Which PowerShell cmdlet assigns a static IPv4 address to an interface?', options: ['New-NetIPAddress', 'Set-IPAddress', 'Add-IPv4Config', 'netsh interface ip'], answer: [0], fact: 'New-NetIPAddress configures static IP settings.' },
    { topic: 'WINDOWS SERVER', text: 'Why must you set the correct timezone (e.g., Asia/Manila) on a Windows Server?', options: ['To prevent Kerberos authentication failures due to time skew', 'To speed up file copying across SMB', 'To enable Remote Desktop connections', 'To activate Windows Server licenses'], answer: [0], fact: 'Kerberos tickets have a strict 5-minute time tolerance.' },
    { topic: 'WINDOWS SERVER', text: 'What command opens the Network Connections control panel GUI directly?', options: ['sysdm.cpl', 'ncpa.cpl', 'appwiz.cpl', 'compmgmt.msc'], answer: [1], fact: 'ncpa.cpl opens Network Connections.' },
    { topic: 'WINDOWS SERVER', text: 'What feature group must be installed to manage Active Directory and DNS via graphical tools on Windows?', options: ['RSAT', 'WDS', 'IIS', 'WMI'], answer: [0], fact: 'RSAT provides Remote Server Administration Tools.' },
    { topic: 'UBUNTU INSTALL', text: 'What tool does Ubuntu Server use for automated and guided installations?', options: ['Anaconda', 'Subiquity', 'Kickstart', 'Preseed'], answer: [1], fact: 'Subiquity is the modern text-based Ubuntu installer.' },
    { topic: 'UBUNTU INSTALL', text: 'What storage partitioning setup is recommended during Ubuntu installation to allow future resizing?', options: ['FAT32', 'LVM (Logical Volume Manager)', 'Raw partitions', 'NTFS'], answer: [1], fact: 'LVM allows flexible volume resizing.' },
    { topic: 'UBUNTU INSTALL', text: 'Which server package must you explicitly select during the Ubuntu installation menu?', options: ['Apache2', 'OpenSSH server', 'Docker Engine', 'Nginx web server'], answer: [1], fact: 'OpenSSH server must be selected with the spacebar during setup.' },
    { topic: 'UBUNTU CONFIG', text: 'What command changes the hostname on Ubuntu permanently?', options: ['hostnamectl set-hostname', 'hostname --change', 'echo name > /etc/hostname', 'sysctl hostname'], answer: [0], fact: 'hostnamectl manages system hostname settings cleanly.' },
    { topic: 'UBUNTU CONFIG', text: 'What service keeps the Ubuntu server clock synchronized with internet time servers?', options: ['ntp-sync', 'chrony / systemd-timesyncd', 'timeserver daemon', 'windows time service'], answer: [1], fact: 'systemd-timesyncd or chrony manages NTP synchronization.' },
    { topic: 'NETPLAN', text: 'What configuration file format does Netplan use?', options: ['XML', 'JSON', 'YAML', 'INI'], answer: [2], fact: 'Netplan uses strict YAML syntax.' },
    { topic: 'NETPLAN', text: 'Which command applies Netplan configuration changes?', options: ['netplan reload', 'netplan apply', 'systemctl restart network', 'netplan commit'], answer: [1], fact: 'netplan apply compiles and applies the configuration.' },
    { topic: 'NETPLAN', text: 'What command applies Netplan settings temporarily with an automatic rollback timeout?', options: ['netplan test', 'netplan try', 'netplan check', 'netplan temporary'], answer: [1], fact: 'netplan try reverts changes if connection is lost.' },
    { topic: 'SECURITY', text: 'What firewall utility is standard on Ubuntu Server?', options: ['firewalld', 'UFW (Uncomplicated Firewall)', 'iptables-gui', 'Windows Defender'], answer: [1], fact: 'UFW simplifies iptables management on Ubuntu.' },
    { topic: 'SECURITY', text: 'Which configuration file controls SSH daemon parameters like password authentication?', options: ['/etc/ssh/ssh_config', '/etc/ssh/sshd_config', '/etc/ssh/daemon.conf', '/etc/sshd.conf'], answer: [1], fact: 'sshd_config is the server-side configuration file.' },
    { topic: 'SECURITY', text: 'What cryptographic key algorithm is recommended for modern SSH key pairs?', options: ['RSA 512', 'DSA 1024', 'ed25519', 'MD5-Key'], answer: [2], fact: 'ed25519 provides strong security and compact keys.' },
    { topic: 'CONNECTIVITY', text: 'What utility uses SSH to securely transfer files between Windows and Linux?', options: ['ftp', 'scp', 'tftp', 'samba'], answer: [1], fact: 'scp (Secure Copy Protocol) runs over SSH.' },
    { topic: 'CONNECTIVITY', text: 'Where is the local DNS override hosts file located on Windows systems?', options: ['C:\\Windows\\System32\\drivers\\etc\\hosts', 'C:\\Windows\\hosts.txt', 'C:\\System\\etc\\hosts', 'C:\\Drivers\\hosts'], answer: [0], fact: 'The Windows hosts file is in drivers\\etc\\hosts.' },
    { topic: 'SYSADMIN TOOLS', text: 'Which command displays system uptime and load averages on Linux?', options: ['top', 'uptime', 'free', 'df'], answer: [1], fact: 'uptime reports running duration and load metrics.' },
    { topic: 'SYSADMIN TOOLS', text: 'What command views system logs in real-time on Ubuntu?', options: ['tail -f /var/log/syslog', 'cat logfile', 'view-syslog', 'journal-watch'], answer: [0], fact: 'tail -f streams log updates live.' }
  ],
  double: [
    { topic: 'WSL 2', text: 'Which TWO features are characteristic of WSL 2 architecture?', options: ['Runs a real Linux kernel', 'Uses a lightweight utility VM', 'Requires a full Type-1 hypervisor installation', 'Translates POSIX syscalls to Windows NT APIs directly'], answer: [0, 1], fact: 'WSL 2 runs a real Linux kernel in a utility VM.' },
    { topic: 'WSL 2', text: 'Which TWO commands are used in WSL management?', options: ['wsl -l -v', 'wsl --shutdown', 'wsl --format', 'wsl --reboot-host'], answer: [0, 1], fact: 'wsl -l -v lists versions and wsl --shutdown stops instances.' },
    { topic: 'WSL 2', text: 'Which TWO steps are involved in backing up and restoring WSL distributions?', options: ['wsl --export', 'wsl --import', 'wsl --clone', 'wsl --snapshot-save'], answer: [0, 1], fact: 'Export and import manage tarball backups.' },
    { topic: 'VIRTUALBOX', text: 'Which TWO network adapter modes allow a VirtualBox guest to communicate with external networks or hosts?', options: ['Bridged Adapter', 'NAT', 'Internal Network', 'Null Driver'], answer: [0, 1], fact: 'Bridged and NAT both provide external network connectivity.' },
    { topic: 'VIRTUALBOX', text: 'Which TWO options are configured when creating a virtual hard disk in VirtualBox?', options: ['Dynamically allocated or Fixed size', 'VDI file type', 'NTFS formatting', 'EXT4 journaling'], answer: [0, 1], fact: 'VirtualBox prompts for storage allocation type and disk image format (VDI).' },
    { topic: 'WINDOWS SERVER', text: 'Which TWO PowerShell cmdlets are used for post-configuring Windows Server network and time settings?', options: ['New-NetIPAddress', 'Set-TimeZone', 'Set-LinuxClock', 'Update-NetAdapter'], answer: [0, 1], fact: 'New-NetIPAddress sets IPs and Set-TimeZone sets timezones.' },
    { topic: 'WINDOWS SERVER', text: 'Which TWO options represent valid Windows Server 2022 installation editions?', options: ['Standard (Desktop Experience)', 'Datacenter', 'Enterprise Core Pro', 'Ultimate Server Edition'], answer: [0, 1], fact: 'Standard and Datacenter (with or without Desktop Experience) are standard editions.' },
    { topic: 'WINDOWS SERVER', text: 'Which TWO commands or tools open Windows configuration utilities via GUI shortcuts?', options: ['ncpa.cpl', 'sysdm.cpl', 'netconfig.exe', 'server-gui.msc'], answer: [0, 1], fact: 'ncpa.cpl opens network connections and sysdm.cpl opens system properties.' },
    { topic: 'UBUNTU', text: 'Which TWO post-installation steps are performed on Ubuntu Server?', options: ['Setting the hostname with hostnamectl', 'Configuring timezone with timedatectl', 'Enabling IIS web roles', 'Installing Active Directory DS binaries'], answer: [0, 1], fact: 'Hostname and timezone configuration are standard Ubuntu post-install tasks.' },
    { topic: 'NETPLAN', text: 'Which TWO rules are critical when editing a Netplan YAML file?', options: ['Use spaces instead of tabs for indentation', 'Ensure correct colon spacing', 'Terminate every line with a semicolon', 'Use Windows CRLF line endings exclusively'], answer: [0, 1], fact: 'Netplan YAML strictly requires spaces and proper colon syntax.' },
    { topic: 'SECURITY', text: 'Which TWO commands are used to configure UFW firewall on Ubuntu?', options: ['sudo ufw allow ssh', 'sudo ufw enable', 'sudo ufw open port 22', 'sudo ufw start-firewall'], answer: [0, 1], fact: 'ufw allow and ufw enable are standard commands.' },
    { topic: 'SECURITY', text: 'Which TWO settings in `/etc/ssh/sshd_config` harden SSH against attacks?', options: ['PasswordAuthentication no', 'PermitRootLogin no', 'AllowTcpForwarding yes', 'UsePrivilegeSeparation weak'], answer: [0, 1], fact: 'Disabling password auth and root login greatly improves security.' },
    { topic: 'CONNECTIVITY', text: 'Which TWO files serve as local static DNS override hosts files across operating systems?', options: ['C:\\Windows\\System32\\drivers\\etc\\hosts', '/etc/hosts', '/etc/dns/records.conf', 'C:\\Windows\\system32\\dns.ini'], answer: [0, 1], fact: 'Windows and Linux both rely on hosts files for local resolution.' },
    { topic: 'SYSADMIN TOOLS', text: 'Which TWO commands inspect resource utilization or health on Ubuntu Server?', options: ['free -h', 'df -h', 'sys-check', 'ram-usage'], answer: [0, 1], fact: 'free checks memory and df checks disk space.' },
    { topic: 'FILE TRANSFER', text: 'Which TWO methods can transfer files between a Windows host and a VirtualBox Ubuntu VM?', options: ['Using `scp` over SSH', 'Configuring VirtualBox Shared Folders', 'Using Windows Registry Editor', 'Mapping a physical USB floppy drive'], answer: [0, 1], fact: 'SCP and VirtualBox Shared Folders are standard transfer mechanisms.' }
  ],
  tf: [
    { topic: 'WSL 2', text: 'WSL 2 runs a real Linux kernel inside a lightweight utility VM.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'True; WSL 2 utilizes a genuine Linux kernel architecture.' },
    { topic: 'WSL 2', text: 'WSL 1 offers better system call compatibility than WSL 2 because it uses a real kernel.', options: ['TRUE', 'FALSE'], answer: [1], fact: 'False; WSL 2 has 100% syscall compatibility due to its real kernel.' },
    { topic: 'WSL 2', text: 'You can limit WSL 2 memory consumption by creating a `.wslconfig` file in your Windows user profile.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'True; .wslconfig allows resource caps.' },
    { topic: 'VIRTUALBOX', text: 'A NAT network adapter allows the host machine to directly RDP into a VirtualBox VM without port forwarding.', options: ['TRUE', 'FALSE'], answer: [1], fact: 'False; NAT blocks direct inbound connections from the host.' },
    { topic: 'VIRTUALBOX', text: 'VirtualBox Snapshots allow you to save a VM state and revert back if an installation fails.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'True; snapshots provide instant rollback states.' },
    { topic: 'WINDOWS SERVER', text: 'Windows Server 2022 requires static IP configuration because servers must not rely on dynamic DHCP changes.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'True; server roles require stable static IPs.' },
    { topic: 'WINDOWS SERVER', text: 'Kerberos authentication in Active Directory will succeed even if client and server clocks differ by several hours.', options: ['TRUE', 'FALSE'], answer: [1], fact: 'False; Kerberos has a strict 5-minute time skew tolerance.' },
    { topic: 'WINDOWS SERVER', text: 'Server Core installations of Windows Server 2022 include a full graphical Start Menu.', options: ['TRUE', 'FALSE'], answer: [1], fact: 'False; Server Core is CLI/PowerShell only.' },
    { topic: 'UBUNTU INSTALL', text: 'During Ubuntu Server installation, you must manually press the spacebar to select the OpenSSH server package.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'True; OpenSSH is an optional installer feature.' },
    { topic: 'NETPLAN', text: 'Using tab characters instead of spaces in a Netplan YAML file will cause a syntax and application failure.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'True; YAML strictly prohibits tabs.' },
    { topic: 'NETPLAN', text: 'The `netplan try` command automatically reverts network changes if the user loses connection and cannot confirm.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'True; it protects against permanent lockouts.' },
    { topic: 'SECURITY', text: 'Enabling UFW on Ubuntu without allowing SSH first can lock you out of your remote session.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'True; UFW denies all incoming traffic by default once enabled.' },
    { topic: 'SECURITY', text: 'Disabling password authentication in SSH makes brute-force attacks ineffective against valid user accounts.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'True; keys are cryptographically secure against password guessing.' },
    { topic: 'CONNECTIVITY', text: 'Bridged networking is required for two VirtualBox VMs to appear as direct peers on the same physical LAN subnet.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'True; bridging puts both VMs onto the physical network.' },
    { topic: 'FILE TRANSFER', text: 'The `scp` command requires an active SSH service running on the destination machine.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'True; SCP transfers files securely over the SSH protocol.' },
    { topic: 'SYSADMIN TOOLS', text: 'The `uptime` command on Linux shows how long the system has been running and its load average.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'True; uptime displays run duration and load metrics.' }
  ],
  identification: [
    { topic: 'WSL 2', text: 'What command-line tool checks installed WSL distributions and their active versions?', answer: ['WSL -L -V', 'WSL --LIST --VERBOSE'], fact: 'wsl -l -v lists installed distros and versions.' },
    { topic: 'WSL 2', text: 'What filename must be created in the Windows user profile folder to configure WSL resource limits?', answer: ['.WSLCONFIG'], fact: '.wslconfig sets global WSL settings.' },
    { topic: 'WSL 2', text: 'What absolute path mounts the Windows C: drive inside WSL 2?', answer: ['/MNT/C'], fact: '/mnt/c maps the Windows C: drive.' },
    { topic: 'VIRTUALBOX', text: 'Name the VirtualBox network mode that bridges guest virtual adapters directly to the physical network card.', answer: ['BRIDGED ADAPTER', 'BRIDGED MODE', 'BRIDGED'], fact: 'Bridged Adapter places VMs directly on the physical LAN.' },
    { topic: 'VIRTUALBOX', text: 'What VirtualBox feature saves a point-in-time machine state for easy recovery?', answer: ['SNAPSHOT', 'SNAPSHOTS'], fact: 'Snapshots record disk and memory states.' },
    { topic: 'WINDOWS SERVER', text: 'What PowerShell cmdlet is used to rename a Windows computer?', answer: ['RENAME-COMPUTER'], fact: 'Rename-Computer changes computer names.' },
    { topic: 'WINDOWS SERVER', text: 'Name the text-based configuration menu utility available in Windows Server for quick setup.', answer: ['SCONFIG'], fact: 'sconfig provides quick server setup options.' },
    { topic: 'WINDOWS SERVER', text: 'What tool acronym represents Remote Server Administration Tools for managing roles like AD and DNS?', answer: ['RSAT'], fact: 'RSAT supplies GUI administrative tools.' },
    { topic: 'UBUNTU', text: 'What utility command sets or displays the hostname on modern Ubuntu systems?', answer: ['HOSTNAMECTL'], fact: 'hostnamectl manages hostnames.' },
    { topic: 'NETPLAN', text: 'Name the YAML-based network configuration utility used in modern Ubuntu Server releases.', answer: ['NETPLAN'], fact: 'Netplan manages network interfaces via YAML.' },
    { topic: 'NETPLAN', text: 'What Netplan command applies configuration changes with an automatic rollback timeout safeguard?', answer: ['NETPLAN TRY'], fact: 'netplan try prevents remote lockouts.' },
    { topic: 'SECURITY', text: 'What acronym stands for Ubuntu’s default uncomplicated firewall utility?', answer: ['UFW'], fact: 'UFW manages firewall rules easily.' },
    { topic: 'SECURITY', text: 'Name the configuration file path used to adjust SSH daemon settings like password login.', answer: ['/ETC/SSH/SSHD_CONFIG'], fact: 'sshd_config controls server SSH rules.' },
    { topic: 'CONNECTIVITY', text: 'What command-line protocol tool securely copies files over SSH?', answer: ['SCP'], fact: 'scp performs secure file copies.' },
    { topic: 'SYSADMIN TOOLS', text: 'What Linux command reports disk space usage in human-readable format?', answer: ['DF -H'], fact: 'df -h summarizes filesystem disk space.' },
    { topic: 'SYSADMIN TOOLS', text: 'What Linux command reports memory and swap utilization?', answer: ['FREE -H'], fact: 'free -h displays RAM and swap usage.' }
  ],
  sequence: [
    {
      topic: 'WSL 2',
      text: 'Arrange the steps to properly back up and restore a WSL 2 distribution.',
      steps: [
        'Run `wsl --export` to create a .tar backup file.',
        'Run `wsl --unregister` to remove the original instance.',
        'Run `wsl --import` to restore the backup to the new path.',
        'Run `wsl -l -v` to verify the new instance is running.'
      ],
      answer: [0, 1, 2, 3],
      fact: 'WSL backup workflow uses export, unregister, and import.'
    },
    {
      topic: 'UBUNTU',
      text: 'Order the steps required to configure and apply a static IP address on Ubuntu Server using Netplan.',
      steps: [
        'Use the `ip a` command to identify the network interface name.',
        'Edit the Netplan YAML configuration file with proper indentation.',
        'Run `sudo netplan apply` to enforce the network settings.',
        'Run `ip a show` to verify the static IP assignment.'
      ],
      answer: [0, 1, 2, 3],
      fact: 'Netplan configuration requires interface identification, YAML editing, apply, and verification.'
    },
    {
      topic: 'SECURITY',
      text: 'Arrange the steps to establish secure, key-based SSH authentication from a host to an Ubuntu VM.',
      steps: [
        'Run `ssh-keygen -t ed25519` on the host machine.',
        'Run `ssh-copy-id user@IP` to send the public key to the server.',
        'Edit `/etc/ssh/sshd_config` to set `PasswordAuthentication no`.',
        'Restart or reload the SSH service on the Ubuntu server.'
      ],
      answer: [0, 1, 2, 3],
      fact: 'Key-based auth requires key generation, key transfer, configuration hardening, and service restart.'
    },
    {
      topic: 'WINDOWS SERVER',
      text: 'Order the PowerShell steps required to configure a static network identity for Windows Server 2022.',
      steps: [
        'Open Windows PowerShell as an Administrator.',
        'Use `New-NetIPAddress` to assign the static IP and gateway.',
        'Use `Set-DnsClientServerAddress` to define the DNS server.',
        'Run `ipconfig /all` to visually verify the network settings.'
      ],
      answer: [0, 1, 2, 3],
      fact: 'Windows static IP setup requires admin shell, IP assignment, DNS configuration, and verification.'
    },
    {
      topic: 'UBUNTU',
      text: 'Arrange the standard post-installation verification and update steps for a fresh Ubuntu Server.',
      steps: [
        'Run `sudo apt update` to refresh the package repository lists.',
        'Run `sudo apt upgrade -y` to install available software patches.',
        'Use `timedatectl` to set the correct local timezone.',
        'Use `uptime`, `free -h`, and `df -h` to verify system health.'
      ],
      answer: [0, 1, 2, 3],
      fact: 'Standard post-install checklist covers package updates, upgrades, timezone, and resource health checks.'
    }
  ]
};

const roastLines = [
  'That answer was so wrong it needs its own incident ticket.',
  'You just rebooted the problem and called it troubleshooting.',
  'Your brain is currently running on dial-up. Please wait.',
  'Even the log file is embarrassed by that choice.',
  'That was not a configuration. That was a cry for help.',
  'Somewhere, a tiny server just lost faith in you.',
  'You have achieved maximum confidence with minimum accuracy.',
  'The answer fell over harder than a service with no dependencies.',
  'A packet was sent to your brain. It timed out.',
  'Bold choice. Incorrect, but bold. Like chmod 777 on production.',
  'Your knowledge base returned: 404 Not Found.',
  'Congratulations: you have invented a new kind of configuration drift.'
];

const STORAGE_KEY = 'itpQuizUsedQuestions';
const STATE_STORAGE_KEY = 'itpQuizActiveState';

const state = {
  questions: [],
  index: 0,
  score: 0,
  selections: [],
  answered: false,
  byMode: { single: 0, double: 0, tf: 0, identification: 0, sequence: 0 },
  review: [],
  boots: Number(localStorage.getItem('itpQuizBoots') || 7),
  currentScreen: 'start'
};

const $ = (selector) => document.querySelector(selector);
const screens = { start: $('#start-screen'), question: $('#question-screen'), results: $('#results-screen') };

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getUsedQuestions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveUsedQuestions(usedMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usedMap));
}

function saveActiveState() {
  localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
}

function shuffleQuestionLayout(question, mode) {
  const configuredQuestion = { ...question, mode };

  if (mode === 'double') {
    const indexedOptions = question.options.map((option, index) => ({ option, index }));
    const shuffledOptions = shuffle(indexedOptions);
    let mappedAnswers = question.answer.map((answerIndex) =>
      shuffledOptions.findIndex(({ index }) => index === answerIndex)
    );

    // Avoid preserving the original A+B answer-position pattern by chance.
    if (mappedAnswers.slice().sort((a, b) => a - b).join(',') === '0,1') {
      [shuffledOptions[1], shuffledOptions[2]] = [shuffledOptions[2], shuffledOptions[1]];
      mappedAnswers = question.answer.map((answerIndex) =>
        shuffledOptions.findIndex(({ index }) => index === answerIndex)
      );
    }

    configuredQuestion.options = shuffledOptions.map(({ option }) => option);
    configuredQuestion.answer = mappedAnswers;
  } else if (mode === 'sequence') {
    const indexedSteps = question.steps.map((step, index) => ({ step, index }));
    const shuffledSteps = shuffle(indexedSteps);

    // Avoid preserving the original A-B-C-D order by chance.
    if (shuffledSteps.every(({ index }, position) => index === position)) {
      [shuffledSteps[0], shuffledSteps[1]] = [shuffledSteps[1], shuffledSteps[0]];
    }

    configuredQuestion.steps = shuffledSteps.map(({ step }) => step);
    configuredQuestion.answer = question.answer.map((answerIndex) =>
      shuffledSteps.findIndex(({ index }) => index === answerIndex)
    );
  }

  return configuredQuestion;
}

function loadActiveState() {
  try {
    const saved = localStorage.getItem(STATE_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.questions && parsed.questions.length > 0) {
        Object.assign(state, parsed);
        return true;
      }
    }
  } catch (e) {
    console.error('Failed to load state', e);
  }
  return false;
}

function buildSession() {
  const usedMap = getUsedQuestions();

  function getQuestionsForMode(mode, count) {
    let pool = questionPools[mode];
    if (!usedMap[mode]) usedMap[mode] = [];

    let available = pool.filter((q) => !usedMap[mode].includes(q.text));

    if (available.length < count) {
      usedMap[mode] = [];
      available = pool;
    }

    const selected = shuffle(available).slice(0, count);
    
    selected.forEach((q) => {
      if (!usedMap[mode].includes(q.text)) {
        usedMap[mode].push(q.text);
      }
    });

    return selected.map((question) => shuffleQuestionLayout(question, mode));
  }

  state.questions = [
    ...getQuestionsForMode('single', 5),
    ...getQuestionsForMode('double', 5),
    ...getQuestionsForMode('tf', 5),
    ...getQuestionsForMode('identification', 3),
    ...getQuestionsForMode('sequence', 2)
  ];

  saveUsedQuestions(usedMap);

  state.questions = shuffle(state.questions);
  state.index = 0;
  state.score = 0;
  state.selections = [];
  state.answered = false;
  state.byMode = { single: 0, double: 0, tf: 0, identification: 0, sequence: 0 };
  state.review = [];
  state.boots += 1;
  localStorage.setItem('itpQuizBoots', String(state.boots));
  $('#boot-count').textContent = String(state.boots).padStart(4, '0');
  saveActiveState();
}

function showScreen(name) {
  state.currentScreen = name;
  Object.values(screens).forEach((screen) => screen.classList.add('hidden'));
  if (screens[name]) {
    screens[name].classList.remove('hidden');
  }
  saveActiveState();
}

function modeName(mode) {
  return { 
    single: 'SINGLE ANSWER', 
    double: 'DOUBLE ANSWER', 
    tf: 'TRUE / FALSE', 
    identification: 'IDENTIFICATION',
    sequence: 'SEQUENCE'
  }[mode];
}

function renderQuestion() {
  const question = state.questions[state.index];
  state.answered = false;
  if (!state.selections) state.selections = [];

  const questionNumber = String(state.index + 1).padStart(2, '0');
  $('#question-number').textContent = questionNumber;
  $('#question-count').textContent = `${questionNumber} / 20`;
  $('#mode-label').textContent = modeName(question.mode);
  $('#topic-label').textContent = question.topic;
  $('#question-text').textContent = question.text;
  
  if (question.mode === 'single') $('#question-hint').textContent = 'SELECT ONE';
  else if (question.mode === 'double') $('#question-hint').textContent = 'SELECT EXACTLY TWO';
  else if (question.mode === 'tf') $('#question-hint').textContent = 'SELECT TRUE OR FALSE';
  else if (question.mode === 'identification') $('#question-hint').textContent = 'TYPE THE TERM';
  else if (question.mode === 'sequence') $('#question-hint').textContent = 'ORDER THE STEPS (1 TO 4)';

  $('#progress-bar').style.width = `${((state.index + 1) / state.questions.length) * 100}%`;
  $('#live-score').textContent = String(state.score).padStart(2, '0');
  
  if (question.mode === 'double') $('#selection-note').textContent = 'Two answers. Not one. Not three. Two.';
  else if (question.mode === 'sequence') $('#selection-note').textContent = 'Click steps in the correct chronological order.';
  else $('#selection-note').textContent = 'Choose the answer that will keep the server alive.';

  $('#next-label').textContent = state.index === 19 ? 'END THE CHAOS' : 'LOCK IT IN';
  $('#next-btn').disabled = true;

  $('#answers').innerHTML = '';
  $('#answers').classList.toggle('hidden', question.mode === 'identification' || question.mode === 'sequence');
  $('#text-answer-wrap').classList.toggle('hidden', question.mode !== 'identification');
  
  let seqWrap = $('#sequence-wrap');
  if (!seqWrap) {
    seqWrap = document.createElement('div');
    seqWrap.id = 'sequence-wrap';
    seqWrap.className = 'sequence-wrap hidden';
    $('.question-card').insertBefore(seqWrap, $('#text-answer-wrap'));
  }
  seqWrap.classList.toggle('hidden', question.mode !== 'sequence');

  if (question.mode === 'identification') {
    $('#text-answer').value = typeof state.selections[0] === 'string' ? state.selections[0] : '';
    $('#text-answer').disabled = false;
    $('#next-btn').disabled = !$('#text-answer').value.trim();
  } else if (question.mode === 'sequence') {
    renderSequenceWidget(question);
  } else {
    question.options.forEach((option, optionIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer-btn';
      if (state.selections.includes(optionIndex)) button.classList.add('selected');
      button.dataset.index = String(optionIndex);
      button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + optionIndex)}</span><span class="answer-copy"></span>`;
      button.querySelector('.answer-copy').textContent = option;
      button.addEventListener('click', () => selectOption(optionIndex));
      $('#answers').appendChild(button);
    });
    if (question.mode === 'double') {
      $('#next-btn').disabled = state.selections.length !== 2;
    } else {
      $('#next-btn').disabled = state.selections.length !== 1;
    }
  }
  showScreen('question');
  saveActiveState();
}

function renderSequenceWidget(question) {
  const wrap = $('#sequence-wrap');
  wrap.innerHTML = `
    <div class="seq-container">
      <div class="seq-pool-col">
        <h4>Available Steps (Click to order)</h4>
        <div id="seq-pool" class="seq-list"></div>
      </div>
      <div class="seq-selected-col">
        <h4>Your Order</h4>
        <div id="seq-selected" class="seq-list"></div>
      </div>
    </div>
  `;

  if (!state.selections || !Array.isArray(state.selections)) {
    state.selections = [];
  }

  const poolContainer = wrap.querySelector('#seq-pool');
  const selectedContainer = wrap.querySelector('#seq-selected');

  // Steps remaining to pick
  const remainingIndices = question.steps.map((_, i) => i).filter(i => !state.selections.includes(i));

  remainingIndices.forEach(origIdx => {
    const item = document.createElement('div');
    item.className = 'seq-item';
    item.textContent = question.steps[origIdx];
    item.addEventListener('click', () => {
      state.selections.push(origIdx);
      renderSequenceWidget(question);
      $('#next-btn').disabled = state.selections.length !== question.steps.length;
      saveActiveState();
    });
    poolContainer.appendChild(item);
  });

  if (remainingIndices.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'seq-empty';
    emptyMsg.textContent = 'All steps ordered!';
    poolContainer.appendChild(emptyMsg);
  }

  state.selections.forEach((origIdx, pos) => {
    const item = document.createElement('div');
    item.className = 'seq-item selected-seq';
    item.innerHTML = `<span class="seq-badge">${pos + 1}</span> <span>${question.steps[origIdx]}</span>`;
    item.addEventListener('click', () => {
      state.selections.splice(pos, 1);
      renderSequenceWidget(question);
      $('#next-btn').disabled = true;
      saveActiveState();
    });
    selectedContainer.appendChild(item);
  });

  if (state.selections.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'seq-empty';
    emptyMsg.textContent = 'Click available steps on the left.';
    selectedContainer.appendChild(emptyMsg);
  }

  $('#next-btn').disabled = state.selections.length !== question.steps.length;
}

function selectOption(optionIndex) {
  if (state.answered) return;
  const question = state.questions[state.index];
  if (question.mode === 'double') {
    if (state.selections.includes(optionIndex)) {
      state.selections = state.selections.filter((index) => index !== optionIndex);
    } else if (state.selections.length < 2) {
      state.selections.push(optionIndex);
    }
  } else {
    state.selections = [optionIndex];
  }
  document.querySelectorAll('.answer-btn').forEach((button) => button.classList.toggle('selected', state.selections.includes(Number(button.dataset.index))));
  $('#next-btn').disabled = state.selections.length !== (question.mode === 'double' ? 2 : 1);
  saveActiveState();
}

function normalized(value) {
  return value.trim().replace(/\s+/g, ' ').toUpperCase();
}

function checkAnswer() {
  const question = state.questions[state.index];
  let correct = false;
  let submitted = '';
  if (question.mode === 'identification') {
    submitted = normalized($('#text-answer').value);
    correct = question.answer.map(normalized).includes(submitted);
  } else if (question.mode === 'sequence') {
    submitted = state.selections.map(i => question.steps[i]).join(' -> ');
    correct = JSON.stringify(state.selections) === JSON.stringify(question.answer);
  } else {
    submitted = state.selections.map((index) => question.options[index]).join(', ');
    correct = [...state.selections].sort().join(',') === [...question.answer].sort().join(',');
  }

  state.answered = true;
  if (correct) {
    state.score += 1;
    state.byMode[question.mode] += 1;
  }
  state.review.push({ question, correct, submitted });
  $('#live-score').textContent = String(state.score).padStart(2, '0');
  $('#selection-note').textContent = correct ? 'CORRECT. The server remains upright. For now.' : roastLines[Math.floor(Math.random() * roastLines.length)];
  $('#selection-note').style.color = correct ? '#2e8d4b' : 'var(--coral)';
  
  if (question.mode === 'sequence') {
    // Disable sequence clicks
    document.querySelectorAll('.seq-item').forEach(el => el.style.pointerEvents = 'none');
  } else if (question.mode !== 'identification') {
    document.querySelectorAll('.answer-btn').forEach((button) => {
      button.disabled = true;
      const optionIndex = Number(button.dataset.index);
      if (question.answer.includes(optionIndex)) button.style.borderColor = '#2e8d4b';
      if (state.selections.includes(optionIndex) && !question.answer.includes(optionIndex)) button.style.background = 'var(--pink)';
    });
  } else {
    $('#text-answer').disabled = true;
  }
  $('#next-btn').disabled = false;
  $('#next-label').textContent = state.index === 19 ? 'VIEW REPORT' : 'NEXT QUESTION';
  saveActiveState();
}

function renderResults() {
  showScreen('results');
  const percentage = state.score / 20;
  $('#final-score').textContent = String(state.score).padStart(2, '0');
  const titles = percentage >= .9 ? ['Disturbingly competent.', 'The server fears you now.'] : percentage >= .7 ? ['Mostly operational.', 'A few processes escaped.'] : percentage >= .5 ? ['Technically alive.', 'Please do not touch production.'] : ['Critical failure.', 'The logs have been notified.'];
  $('#result-title').textContent = titles[Math.floor(Math.random() * titles.length)];
  
  const resultModes = { single: 'single', double: 'double', tf: 'tf', identification: 'id', sequence: 'seq' };
  Object.entries(resultModes).forEach(([mode, id]) => {
    const value = state.byMode[mode] || 0;
    if ($(`#${id}-result`)) $(`#${id}-result`).textContent = `${value}/4`;
    if ($(`#${id}-meter`)) $(`#${id}-meter`).style.width = `${value * 25}%`;
  });
  
  $('#roast-text').textContent = state.score === 20 ? 'You got everything right. Suspicious. Check your keyboard for an answer key.' : state.score >= 15 ? 'Not bad. Your services may survive a weekend, provided nobody opens a terminal.' : state.score >= 10 ? roastLines[Math.floor(Math.random() * roastLines.length)] : 'Your quiz instance has entered a low-availability state. Study the module, then come back louder.';
  $('#review-list').classList.add('hidden');
  saveActiveState();
}

function renderReview() {
  const list = $('#review-list');
  list.innerHTML = state.review.map((item, index) => {
    let answer = '';
    if (item.question.mode === 'identification') {
      answer = item.question.answer[0];
    } else if (item.question.mode === 'sequence') {
      answer = item.question.answer.map(i => item.question.steps[i]).join(' → ');
    } else {
      answer = item.question.answer.map((answerIndex) => item.question.options[answerIndex]).join(', ');
    }
    return `<div class="review-item ${item.correct ? 'correct' : 'wrong'}"><strong>${String(index + 1).padStart(2, '0')}</strong><div><p>${item.question.text}</p><small>${item.correct ? 'CORRECT' : `YOU: ${item.submitted || 'NO ANSWER'} // CORRECT: ${answer}`}</small></div></div>`;
  }).join('');
  list.classList.toggle('hidden');
  $('#review-btn').innerHTML = list.classList.contains('hidden') ? 'VIEW ANSWERS <span>↓</span>' : 'HIDE ANSWERS <span>↑</span>';
}

const themeToggleBtn = $('#theme-toggle');
const savedTheme = localStorage.getItem('itpQuizTheme');

if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
}

function updateThemeIcon() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (themeToggleBtn) themeToggleBtn.textContent = isLight ? '🌙' : '☀️';
}
updateThemeIcon();

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('itpQuizTheme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('itpQuizTheme', 'light');
    }
    updateThemeIcon();
  });
}

$('#start-btn').addEventListener('click', () => { buildSession(); renderQuestion(); });
$('#retake-btn').addEventListener('click', () => { 
  localStorage.removeItem(STATE_STORAGE_KEY);
  buildSession(); 
  renderQuestion(); 
  window.scrollTo({ top: $('#quiz-app').offsetTop - 25, behavior: 'smooth' }); 
});
$('#next-btn').addEventListener('click', () => { 
  if (!state.answered) checkAnswer(); 
  else if (state.index < 19) { 
    state.index += 1; 
    state.selections = [];
    renderQuestion(); 
  } else {
    renderResults();
  }
});
$('#review-btn').addEventListener('click', renderReview);
$('#text-answer').addEventListener('input', (event) => { 
  event.target.value = event.target.value.toUpperCase(); 
  state.selections = [event.target.value];
  $('#next-btn').disabled = event.target.value.trim().length === 0 || state.answered; 
  saveActiveState();
});
$('#boot-count').textContent = String(state.boots).padStart(4, '0');

// Initialization on load with state restoration
window.addEventListener('DOMContentLoaded', () => {
  $('#boot-count').textContent = String(state.boots).padStart(4, '0');
  if (loadActiveState()) {
    if (state.currentScreen === 'question' && state.questions.length > 0) {
      renderQuestion();
      if (state.answered) {
        checkAnswer();
      }
    } else if (state.currentScreen === 'results') {
      renderResults();
    } else {
      showScreen('start');
    }
  } else {
    showScreen('start');
  }
});
