---
layout: post
title: Rapid Disco Internal Methodology
---

Thorough network mapping and service discovery form the foundation of an effective internal penetration test. Before attempting any exploitation, we must gain situational awareness of the expansive attack surface sprawling across client subnets, devices, and services. This reconnaissance phase involves sweeping the internal IP ranges to identify live hosts, enumerate open ports, banner grab to fingerprint services, and detect known vulnerabilities. Rapid network discovery techniques help speed up the reconnaissance process allowing us to cover more ground. By methodically probing and cataloguing the various points of entry into the network, we gain the insight needed to surgically identify promising entry vectors for intrusion. Internal discovery provides the roadmap to guide more invasive penetration testing phases.

- nmap \-sn \-T4 \-\-max\-retries=1 \-\-max\-rtt\-timeout=200ms 10.0\-255.0\-255.1,254 172.16\-31.0\-255.1,254 192.168.0\-255.1,254 \-oA segment\-disco

This nmap command performs a fast ping sweep across the major private IP ranges to discover live hosts. The -sn flag tells nmap to only ping hosts, -T4 sets a faster timing template, and the max-retries and max-rtt-timeout options speed up the scanning by timing out faster on hosts that don't respond quickly. This creates a list of live hosts on the internal network.

- cat segment\-disco.gnmap \| grep Up \| sort \-uV \| cut \-d " " \-f 2 \| cut \-d "." \-f 1-3 \| sed 's/$/.0\/24/' \> livesegments

This command parses the nmap output to extract the first three octets of each live host IP address, appends .0/24 to create subnets, and saves the list of live internal subnets to the livesegments file.

- nmap \-T4 \-\-max\-rtt\-timeout=200ms \-\-host\-timeout=5m \-\-open \-p 22,80,139,443,445,1099,1433,2001,2010,2049,2901,3306,3389,4447,4848,5432,
5433,5555,5900,5901,6101,7001,7002,8002,8004,8008,8080,8089,8300,8443,8500,8501,8980,9001,9043,9060,9200,9990,9999,10000 \-\-stats\-every=10s

This scans each live subnet to check for common open ports and saves lists of hosts with each port open for further scanning.

- for i in $(cat scanports); do cat profile.gnmap \| grep $i/open \| cut \-d " " \-f 2 > $i-hosts; done
- msfconsole \-q \-n \-x "use auxiliary/scanner/smb/smb_ms17_010; set ConnectTimeout 1; set DCERPC::ReadTimeout 1; set threads 24; set RHOSTS file:/root/client/445-hosts ; run; exit;" \-o /root/client/ms17-010

This runs the MS17-010 Metasploit module against the hosts with SMB port 445 open to check for EternalBlue vulnerability.

- for i in {80,443,8080,8443}; do msfconsole \-q \-n \-x "use auxiliary/scanner/http/title; set ConnectTimeout 1; set rhosts file:/root/q4-2018/$i-hosts ; set rport $i; set store_notes false; set threads 64; run; exit;" \-o /root/q4-2018/http-title-$i; done

These commands enumerate the web service banners on common HTTP ports to fingerprint web servers.

- grep \-i tomcat http\-title\-8080 \| cut \-d : \-f 1 \| cut \-d "[" \-f 3 \| sort \-Vu > /root/client/tomcat\-8080
- grep \-i tomcat http\-title\-8443 \| cut \-d : \-f 1 \| cut \-d "[" \-f 3 \| sort \-u > /root/client/tomcat\-8443

- grep \-i jenkins http\-title\-8080 \| cut \-d : \-f 1 \| cut \-d "[" \-f 3 \| sort \-u > /root/client/jenkins\-8080
- grep \-i jenkins http\-title\-8443 \| cut \-d : \-f 1 \| cut \-d "[" \-f 3 \| sort \-Vu > /root/client/jenkins\-8443

These grep commands parse out IPs of servers with specific banners like Tomcat and Jenkins for further scanning.